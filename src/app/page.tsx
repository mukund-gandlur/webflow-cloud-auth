import { redirect } from "next/navigation"

/**
 * Root page - redirects to dashboard
 * AuthGuard will handle authentication checks and redirects appropriately
 */
export default function Home() {
  redirect("/dashboard")
}
