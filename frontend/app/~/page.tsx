import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function Swiftor() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/signin");
  }

  return (
    <div className="app">
      <h1>Hello {data.user.email}</h1>
    </div>
  );
}
