import React from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import { Stack, useRouter, useSearchParams, Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

const profile = () => {
  const router = useRouter();
  const { username, password } = useSearchParams();
  console.log("[username]" + username + " " + password);

  const handleLogout = async () => {
    // Clear user data from AsyncStorage
    await AsyncStorage.clear();
    // Navigate back to the login page
    router.push("/");
  };

  return (
    <View>
      <Stack.Screen
        options={{
          title: username,
        }}
      />
      {/*       <Button onPress={() => handleAttendace()} title="View Attendance" />
      <Button title="View Registered Subjects" />
      <Button title="Logout" onPress={() => handleLogout()} /> */}
      <Link
        href={{
          pathname: "/pages/attendance",
          params: {
            username: username,
            password: password,
          },
        }}
      >
        View Attendance
      </Link>
      <Button title="View Registered Subjects" />
      <Button title="Logout" onPress={() => handleLogout()} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default profile;
