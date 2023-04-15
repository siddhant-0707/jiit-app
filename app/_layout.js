import { Stack, useRouter, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Alert, View } from "react-native";
import { StatusBar } from "expo-status-bar";

export default Layout = () => {
  const router = useRouter();

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#FFE030",
          },
          headerTintColor: "black",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Home",
            headerRight: () => (
              <Ionicons
                onPress={() => router.push("/modal")}
                name="information-circle"
                size={24}
                color="black"
              />
            ),
          }}
        />
        <Stack.Screen
          name="modal"
          options={{
            presentation: "modal",
            headerStyle: {
              backgroundColor: "white",
            },
            headerTintColor: "black",
          }}
        />
      </Stack>
    </>
  );
};

// export default Tabs;
