import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, Link } from "expo-router";
import { getLogin } from "./api_attendance";
import { AntDesign } from "@expo/vector-icons";

const Page = () => {
  const router = useRouter();

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [isLoading, setIsLoading] = useState(false);

  const [detailsLogin, setDetailsLogin] = useState(null);

  const handleLogin = async () => {
    setIsLoading(true); // set loading state to true before making API call
    const resultLogin = await getLogin(username, password);
    setDetailsLogin(resultLogin);
    setIsLoading(false); // set loading state to false after API call completes

    if (resultLogin) {
      // console.log("test1 " + resultLogin.name);
      // only redirect if login details have been received
      router.push({
        pathname: `/username`,
        params: { username: username, password: password },
      });
      await AsyncStorage.setItem("username", username);
      await AsyncStorage.setItem("password", password);
    }

    // router.push('/username', {detailsLogin, username});
    // router.push(`${username}`, { detailsLogin, username });
  };

  // check if the user's login credentials are already stored in AsyncStorage
  useEffect(() => {
    const checkLogin = async () => {
      const storedUsername = await AsyncStorage.getItem("username");
      const storedPassword = await AsyncStorage.getItem("password");
      if (storedUsername && storedPassword) {
        router.push({
          pathname: `/username`,
          params: { username: storedUsername, password: storedPassword },
        });
      }
    };

    checkLogin();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#6d706e"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#6d706e"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <AntDesign name="loading1" size={24} color="black" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    width: "80%",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007aff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Page;
