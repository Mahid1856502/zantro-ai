from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import stripe
import json
import os
from routes.auth import get_current_user, User
import logging
from supabase import create_client, Client
from datetime import datetime, timedelta


# Initialize Stripe with secret key
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
STRIPE_WEBHOOK_SECRET = os.getenv("STRIPE_WEBHOOK_SECRET")

# Initialize Supabase client
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)

router = APIRouter()

class CheckoutSessionRequest(BaseModel):
    priceId: str
    userId: str

class CancelSubscriptionRequest(BaseModel):
    subscriptionId: str



@router.post("/create-checkout-session")
async def create_checkout_session(
    request: CheckoutSessionRequest, current_user: User = Depends(get_current_user)
):
    try:
        # Map price IDs to roles/plans
        price_to_plan = {
            "price_1QQJ5WD9CcB23kLYsKGUvvEy": "hacker_monthly",  # Monthly plan
            "price_1QQJUbD9CcB23kLYNzBjCzDM": "pro_monthly",     # Annual plan
            "price_1QQJ5WD9CcB23kLYsKGUvvEy": "hacker_yearly",   # Yearly plan
            "price_1QQJ5WD9CcB23kLYsKGUvvEy": "pro_yearly",      # Yearly plan
        }

        logging.info("Received request to create checkout session for user: %s", current_user.username)

        if request.priceId not in price_to_plan:
            raise HTTPException(status_code=400, detail="Invalid price ID")
        selected_plan = price_to_plan[request.priceId]

        # Verify user subscription status in db.json
        with open("database/db.json", "r") as f:
            db = json.load(f)
            user_data = next(
                (user for user in db["X"] if user["username"] == current_user.username),
                None,
            )
            if not user_data:
                raise HTTPException(status_code=404, detail="User not found")

        # Check if the user already has a subscription in Supabase
        existing_subscription = supabase.table("subscriptions").select("*").eq("user_id", request.userId).execute()

        if existing_subscription.data:
            # Update existing subscription
            subscription_id = existing_subscription.data[0].get("subscription_id")
            update_data = {
                "pricing_tier": selected_plan,
                "status": "pending",  # Updated status
                "price_id": request.priceId,  # New price ID
            }
            response = supabase.table("subscriptions").update(update_data).eq("user_id", request.userId).execute()

            if not response.data:
                logging.error(f"Failed to update subscription for user {request.userId}: {response}")
                raise HTTPException(status_code=500, detail="Failed to update subscription record.")
            logging.info(f"Subscription for user {request.userId} updated successfully.")
        else:
            # Insert a new subscription record
            subscription_data = {
                "user_id": request.userId,
                "subscription_id": '',  # Will be updated via webhook
                "status": "pending",
                "pricing_tier": selected_plan,
                "price_id": request.priceId,
                "current_period_start": None,  # Will be updated via webhook
                "current_period_end": None,    # Will be updated via webhook
            }
            response = supabase.table("subscriptions").insert(subscription_data).execute()

            if not response.data:
                logging.error(f"Failed to insert subscription: {response}")
                raise HTTPException(status_code=500, detail="Failed to create subscription record.")
            logging.info(f"Subscription for user {request.userId} created successfully.")

        # Create Stripe checkout session
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[{"price": request.priceId, "quantity": 1}],
            mode="subscription",
            success_url="https://swiftor.io/pricing/success",
            cancel_url="https://swiftor.io/pricing",
            customer_email=current_user.email,
            metadata={"user_id": request.userId, "plan": selected_plan},
        )

        return JSONResponse(
            status_code=200,
            content={"url": checkout_session.url},
        )

    except stripe.error.StripeError as e:
        logging.error(f"Stripe error: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Stripe error: {str(e)}")
    except Exception as e:
        logging.error(f"Error creating checkout session: {str(e)}")
        raise HTTPException(
            status_code=500, detail=f"Failed to create checkout session: {str(e)}"
        )


# @router.post("/webhook")
# async def stripe_webhook(request: Request):
#     logging.error("webhook worked")
#     payload = await request.body()
#     sig_header = request.headers.get("stripe-signature")

#     logging.info("Received webhook with payload: %s", payload)
#     logging.info("Stripe signature header: %s", sig_header)

#     try:
#         # Verify the webhook signature
#         event = stripe.Webhook.construct_event(
#             payload, sig_header, STRIPE_WEBHOOK_SECRET
#         )
#         logging.info("Webhook event constructed successfully: %s", event)

#     except ValueError as e:
#         # Invalid payload
#         logging.error("Invalid payload: %s", str(e))
#         raise HTTPException(status_code=400, detail="Invalid payload")

#     except stripe.error.SignatureVerificationError as e:
#         # Invalid signature
#         logging.error("Invalid signature: %s", str(e))
#         raise HTTPException(status_code=400, detail="Invalid signature")

#     # Handle the event
#     if event["type"] == "checkout.session.completed":
#         session = event["data"]["object"]
#         logging.info("Handling checkout.session.completed event with session: %s", session)

#         # Update the user's subscription plan in db.json and Supabase
#         await handle_checkout_session(session)

#     logging.info("Webhook handling completed successfully.")
#     return {"status": "success"}


@router.post("/webhook")
async def stripe_webhook(request: Request):
    logging.error("webhook worked")
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")

    logging.info("Received webhook with payload: %s", payload)
    logging.info("Stripe signature header: %s", sig_header)

    try:
        # Verify the webhook signature
        event = stripe.Webhook.construct_event(
            payload, sig_header, STRIPE_WEBHOOK_SECRET
        )
        logging.info("Webhook event constructed successfully: %s", event)

    except ValueError as e:
        # Invalid payload
        logging.error("Invalid payload: %s", str(e))
        raise HTTPException(status_code=400, detail="Invalid payload")

    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        logging.error("Invalid signature: %s", str(e))
        raise HTTPException(status_code=400, detail="Invalid signature")

    # Handle the event
    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        logging.info("Handling checkout.session.completed event with session: %s", session)

        # Update the user's subscription plan in db.json and Supabase
        await handle_checkout_session(session)

    elif event["type"] == "customer.subscription.deleted":
        subscription = event["data"]["object"]
        logging.info("Handling customer.subscription.deleted event with subscription: %s", subscription)

        # Extract subscription ID
        subscription_id = subscription.get("id")

        # Update the database to mark the subscription as canceled
        response = supabase.table("subscriptions").update(
            {"status": "canceled"}
        ).eq("subscription_id", subscription_id).execute()

        if response.data:
            logging.info(f"Subscription {subscription_id} marked as canceled in the database.")
        else:
            logging.error(f"Failed to update subscription status for {subscription_id}")

    logging.info("Webhook handling completed successfully.")
    return {"status": "success"}


async def handle_checkout_session(session):
    """
    Process a completed checkout session and update the user's subscription status
    in Supabase and update the local db.json.
    """
    # Access session details
    customer_email = session.get("customer_email")
    plan = session.get("metadata", {}).get("plan")  # Retrieve the plan from metadata
    user_id = session.get("metadata", {}).get("user_id")  # Retrieve the user_id from metadata
    subscription_id = session.get("subscription")

    if not plan or not customer_email or not user_id:
        logging.error("Session missing required metadata: plan, email, or user_id")
        return

    # Log the session details
    logging.info(f"Checkout session completed: {customer_email} subscribed to {plan}")

    # Update the user's plan in db.json
    try:
        with open("database/db.json", "r") as f:
            db = json.load(f)

        # Find the user in the database
        user = next((user for user in db["X"] if user["email"] == customer_email), None)
        if not user:
            logging.error(f"User {customer_email} not found in the database.")
            return

        # Update the user's plan
        user["plan"] = plan
        logging.info(f"Updated {customer_email}'s plan to {plan}")

        # Write the updated database back to file
        with open("database/db.json", "w") as f:
            json.dump(db, f, indent=4)

    except Exception as e:
        logging.error(f"Failed to update plan in database: {str(e)}")

    # Update the user's subscription status in Supabase
    try:
        # Update the existing subscription entry
        current_period_start = datetime.utcnow()
        current_period_end = current_period_start + timedelta(days=30)

        update_data = {
            "status": "active",  # Update the status to active,
            "subscription_id": subscription_id,
            "pricing_tier": plan,  # Update the pricing tier if needed
            "current_period_start": current_period_start.isoformat(),  # Format as ISO8601 string
            "current_period_end": current_period_end.isoformat(),  # Format as ISO8601 string
        }


        response = supabase.table("subscriptions").update(update_data).eq("user_id", user_id).execute()

        if response.data:
            logging.info(f"Updated subscription for user {user_id} in Supabase.")
        else:
            logging.error(f"Failed to update subscription for user {user_id}. Response: {response}")

    except Exception as e:
        logging.error(f"Failed to update Supabase: {str(e)}")



# @router.post("/webhook")
# async def stripe_webhook(request: Request):
#     payload = await request.body()
#     sig_header = request.headers.get("Stripe-Signature")

#     try:
#         event = stripe.Webhook.construct_event(
#             payload, sig_header, STRIPE_WEBHOOK_SECRET
#         )
#     except stripe.error.SignatureVerificationError:
#         raise HTTPException(status_code=400, detail="Invalid Stripe webhook signature")

#     if event["type"] == "checkout.session.completed":
#         session = event["data"]["object"]

#         # Get user and plan from metadata
#         username = session["metadata"]["username"]
#         new_plan = "hacker" if "hacker" in session["metadata"].get("plan", "") else "pro"

#         # Update user's plan and roles
#         with open("database/db.json", "r+") as f:
#             db = json.load(f)
#             user_data = next(
#                 (user for user in db["X"] if user["username"] == username), None
#             )
#             if user_data:
#                 user_data["plan"] = new_plan
#                 user_data["role"] = new_plan
#                 user_data.setdefault("notifications", {"unread": [], "read": []})
#                 notification = {
#                     "from": "system",
#                     "message": f"Your account has been successfully upgraded to {new_plan.title()} plan!",
#                     "time": int(time.time() * 1000),
#                     "id": str(len(user_data["notifications"]["unread"])),
#                 }
#                 user_data["notifications"]["unread"].append(notification)

#                 # Save changes
#                 f.seek(0)
#                 json.dump(db, f, indent=2)
#                 f.truncate()

#     return JSONResponse(status_code=200, content={"message": "Webhook processed"})


@router.post("/cancel-subscription")
async def cancel_subscription(request: CancelSubscriptionRequest):
    try:
        # Validate request data
        if not request.subscriptionId:
            raise HTTPException(status_code=400, detail="subscriptionId is required.")

        # Fetch subscription from Supabase
        response = supabase.table("subscriptions").select("*").eq("subscription_id", request.subscriptionId).single().execute()

        if not response.data:
            raise HTTPException(
                status_code=404, detail="No active subscription found for this user."
            )

        subscription_data = response.data
        subscription_id = subscription_data.get("subscription_id")

        # Check if subscription is already canceled
        if subscription_data.get("status") == "canceled":
            raise HTTPException(
                status_code=400, detail="Subscription is already canceled."
            )

        # Cancel the subscription in Stripe
        stripe.Subscription.delete(subscription_id)

        # Update subscription status in Supabase
        supabase.table("subscriptions").update(
            {"status": "inactive"}
        ).eq("subscription_id", subscription_id).execute()

        # Return success response
        return JSONResponse(
            status_code=200,
            content={"message": "Subscription canceled successfully."}
        )

    except stripe.error.StripeError as e:
        logging.info(f"Stripe error: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Stripe error: {str(e)}")
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to cancel subscription: {str(e)}"
        )


# @router.post("/cancel-subscription/webhook")
# async def stripe_webhook(request: Request):
#     payload = await request.body()
#     sig_header = request.headers.get("Stripe-Signature")

#     try:
#         event = stripe.Webhook.construct_event(
#             payload, sig_header, "your_webhook_secret"
#         )

#         if event["type"] == "customer.subscription.deleted":
#             subscription_id = event["data"]["object"]["id"]

#             # Update subscription status in the database
#             supabase.table("subscriptions").update(
#                 {"status": "canceled"}
#             ).eq("subscription_id", subscription_id).execute()

#     except stripe.error.SignatureVerificationError as e:
#         logging.error(f"Webhook signature verification failed: {str(e)}")
#         raise HTTPException(status_code=400, detail="Webhook signature verification failed.")
#     except Exception as e:
#         logging.error(f"Error handling webhook: {str(e)}")
#         raise HTTPException(status_code=500, detail="Webhook processing failed.")

#     return JSONResponse(status_code=200, content={"message": "Webhook received."})
