import { hc } from "hono/client"
import type { AppType } from "@api"
import { getServerCookieHeaders } from "./auth-server"

// Helper function to create authenticated client (server-side)
const createAuthenticatedClient = async () => {
  const headers = await getServerCookieHeaders()

  return hc<AppType>(process.env.NEXT_PUBLIC_SERVER_URL!, {
    init: {
      credentials: "include",
      headers: {
        cookie: headers.cookie,
        "Content-Type": "application/json",
      },
    },
  })
}

export const createOnboarding = async (
  businessType: string,
  platform: string,
  adBudget: string,
  productType: string,
  mainGoal: string,
  currentFollowers: string,
) => {
  const client = await createAuthenticatedClient()
  type OnboardingRequest = Parameters<
    typeof client.api.onboarding.$post
  >[0]["json"]
  const response = await client.api.onboarding.$post({
    json: {
      businessType,
      platform,
      adBudget,
      productType,
      mainGoal,
      currentFollowers,
    } as OnboardingRequest,
  })
  return response.json()
}

export const getOnboarding = async () => {
  const client = await createAuthenticatedClient()
  const response = await client.api.onboarding.$get()
  return response.json()
}

export const getOnboardingCount = async () => {
  const client = await createAuthenticatedClient()
  const response = await client.api.onboarding.count.$get()
  return response.json()
}
