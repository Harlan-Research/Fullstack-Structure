import { headers } from "next/headers"

export async function getServerSession() {
  const headersList = await headers()
  const response = await fetch(
    `${process.env.NEXT_SERVER_URL}/api/auth/get-session`,
    {
      headers: {
        cookie: headersList.get("cookie") || "",
      },
    },
  )

  if (!response.ok) {
    return null
  }

  const session = await response.json()
  return session
}

export async function getServerCookieHeaders() {
  const headersList = await headers()
  return {
    cookie: headersList.get("cookie") || "",
  }
}
