# Swiftor API

## Overview

Swiftor API is a FastAPI-based backend service that provides functionality for user management, virtual machine (VM) operations, and AI-related features. This API is designed to work with a JSON-based database and integrates with Docker for VM management.

## Features

- User initialization and management
- VM creation, listing, starting, stopping, and deletion
- Authentication using JWT
- AI chat and voice capabilities (placeholders)
- Report publishing and unpublishing (placeholders)

## Prerequisites

- Python 3.7+
- FastAPI
- Docker
- Docker Compose

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-repo/swiftor-api.git
   cd swiftor-api
   ```

2. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:
   ```
   JWT_SECRET=your_jwt_secret
   JWT_ALGORITHM=HS256
   ```

## Project Structure

```
swiftor-api/
├── main.py
├── routes/
│   ├── ai/
│   │   ├── __init__.py
│   │   ├── chat.py
│   │   └── voice.py
│   ├── reports/
│   │   ├── __init__.py
│   │   ├── create.py
│   │   └── delete.py
│   │   └── index.py
│   │   └── protected.py
│   │   └── publish.py
│   ├── vms/
│   │   ├── __init__.py
│   │   ├── index.py
│   │   ├── create.py
│   │   ├── start.py
│   │   ├── stop.py
│   │   └── delete.py
│   └── auth.py
├── database/
│   └── db.json
└── .env.local
```

## API Endpoints

### Root
- `GET /`: Welcome message

### User Management
- `POST /init`: Initialize a new user

### VM Management
- `GET /vms`: List user's VMs
- `POST /vms/create`: Create a new VM
- `GET /vms/start/{vmid}`: Start a VM
- `GET /vms/stop/{vmid}`: Stop a VM
- `GET /vms/delete/{vmid}`: Delete a VM
- `POST /vms/exec`: Execute a command on a VM

### AI (Placeholders)
- `/ai/chat`: Chat functionality
- `/ai/voice`: Voice functionality

### Reports (Placeholders)
- `GET /reports`: List user's reports
- `POST /reports/create`: Create a new report
- `DELETE /reports/{report_id}`: Delete a report
- `GET /reports/protected/{report_id}/{boolean}`: Set report visibility
- `PUT /reports/publish/{report_id}`: Publish a report

## Authentication

The API uses JWT for authentication. To access protected endpoints, include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Database

The API uses a JSON file (`database/db.json`) as its database. The structure includes:

- Users (X)
- Networks

## Docker Integration

The API interacts with Docker to manage VMs. It creates Docker networks, starts and stops containers, and manages Docker Compose files for each VM.

## Running the API

To run the API locally:

```
python main.py
```

The API will be available at `http://0.0.0.0:8000`.

## Development

When developing new features or modifying existing ones, please follow these guidelines:

1. Use FastAPI's dependency injection for authentication and user management.
2. Keep the code modular by organizing routes in separate files under the `routes/` directory.
3. Update the `database/db.json` file when making changes that affect user data or VM configurations.
4. Handle exceptions appropriately and return meaningful HTTP status codes and error messages.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

[Add your chosen license here]