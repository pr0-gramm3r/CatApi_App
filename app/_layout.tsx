import { Stack } from "expo-router";

const RootLayout= ()=>{
  return(
    <Stack screenOptions={{headerShown : false }}>
      <Stack.Screen name="(tab)" />
      <Stack.Screen name="card/index"/>
    </Stack>
  );
}

export default RootLayout
