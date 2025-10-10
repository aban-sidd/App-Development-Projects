import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { Slot } from 'expo-router'

import SafeScreen from "@/components/SafeScreen"
import { StatusBar } from 'expo-status-bar';

const publishedKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishedKey){
  throw new Error("Missing Clerk Published Key")
}

export default function RootLayout() {
  return (
   <ClerkProvider tokenCache={tokenCache} publishableKey={publishedKey}>
    <SafeScreen>
      <Slot />
      </SafeScreen>
      <StatusBar style="dark" />
    </ClerkProvider>
  )
}
