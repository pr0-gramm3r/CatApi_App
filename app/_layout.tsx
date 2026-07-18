import { Stack } from "expo-router";

const RootLayout= ()=>{
  return(
    <Stack screenOptions={{headerShown : false }}>
      <Stack.Screen name="LogIn/index"/>
      <Stack.Screen name="(tab)" />
      <Stack.Screen name="card/index" />
      <Stack.Screen name="signUp/index"/>
    </Stack>
  );
}

export default RootLayout
