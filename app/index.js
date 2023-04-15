import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter, Link } from "expo-router";

const Page = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

/*   const handleLogin = () => {
    <Link
      href={{
        pathname: "/username",
        params: { username: username, password: password },
      }}
      style={styles.link}
    >
      Open Profile
    </Link>;
  }; */

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.button}>
        {/* <Text style={styles.buttonText}>Sign In</Text> */}
        <Link
          href={{
            pathname: "/username",
            params: { username: username, password: password },
          }}
          style={styles.buttonText}
        >
          Open Profile
        </Link>
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

/* import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Link, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Page() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.subtitle}>This is the first page of your app.</Text>

        <Link
          href={{
            pathname: "/rambo",
            params: { username: "21103140", password: "sarthak1995" },
          }}
          style={styles.link}
        >
          Open Siddhant's Profile
        </Link>
      </View>
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
  link: {
    fontSize: 20,
    marginVertical: 10,
    fontWeight: "bold",
    textDecorationStyle: "solid",
  },
});
 */
