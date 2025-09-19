import { SplashScreen, Stack } from "expo-router";
import "./global.css";

import useAuthStore from "@/store/auth.store";
import * as Sentry from "@sentry/react-native";
import { useFonts } from "expo-font";
import { useEffect } from "react";

Sentry.init({
  dsn: "https://f1b1e995dd42595e0f0ec786f9eb65ad@o4510047640485893.ingest.de.sentry.io/4510047642255440",

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [
    Sentry.mobileReplayIntegration(),
    Sentry.feedbackIntegration(),
  ],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});
export default Sentry.wrap(function RootLayout() {
  const { isLaoding, fetchAuthenticatedUser } = useAuthStore();
  
  const [fontsLoaded, error] = useFonts({
    "Quicksand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "Quicksand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
    "Quicksand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "Quicksand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
    "Quicksand-Light": require("../assets/fonts/Quicksand-Light.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  useEffect(() => {
    fetchAuthenticatedUser();
  }, []);

  if (!fontsLoaded || isLaoding) {
    return null;
  }

  // return <Stack screenOptions={{headerShown:false}}/>;
  return (
    <Stack initialRouteName="(tabs)" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(auth)" />
    </Stack>
  );
});
