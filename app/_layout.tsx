import { Stack } from "expo-router";

export default function RootLayout() {
  return (
  <Stack>
    <Stack.Screen name="index" options={{
      headerTitle: "HandyCart",  headerShown: false,
    }} />
    <Stack.Screen name="about" options={{
      headerTitle: "About",  headerShown: false,
    }}/>
  </Stack>);
}
