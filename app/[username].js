import { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import React from "react";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  getLogin,
  getSemDetails,
  getAttendanceDetails,
  getTeacherName,
} from "./api_attendance";

const profile = () => {
  const router = useRouter();

  const { username, password } = useSearchParams();

  const [detailsLogin, setDetailsLogin] = useState(null);
  const [detailsRegister, setDetailsRegister] = useState(null);
  const [detailsAttendance, setDetailsAttendance] = useState(null);
  const [detailsExam, setDetailsExam] = useState(null);

  const handleSubmit = async () => {
    const resultLogin = await getLogin(username, password);
    setDetailsLogin(resultLogin);
    console.log(resultLogin);

    const resultRegistration = await getSemDetails();
    // console.log(resultRegistration);
    setDetailsRegister(resultRegistration);

    const resultAttendace = await getAttendanceDetails();
    console.log(resultAttendace);
    setDetailsAttendance(resultAttendace);
  };

  const data = detailsAttendance;

  if (detailsAttendance === null) {
    return (
      <View>
        <Stack.Screen
          options={{
            title: username,
            /*           headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "#FFE030", */
          }}
        />
        <Button onPress={() => handleSubmit()} title="Get Attendance" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: detailsLogin.name,
          /*           headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "#FFE030", */
        }}
      />

      <View style={styles.row}>
        <Text style={styles.header}>Subject Code</Text>
        <Text style={styles.header}>L T percentage</Text>
        <Text style={styles.header}>L percentage</Text>
        <Text style={styles.header}>P percentage</Text>
        <Text style={styles.header}>T percentage</Text>
      </View>
      {data.map((data, index) => (
        <View style={styles.row} key={index}>
          <Text style={styles.cell}>{data.subjectcode}</Text>
          <Text style={styles.cell}>{data.LTpercantage || "-"}</Text>
          <Text style={styles.cell}>{data.Lpercentage || "-"}</Text>
          <Text style={styles.cell}>{data.Ppercentage || "-"}</Text>
          <Text style={styles.cell}>{data.Tpercentage || "-"}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 5,
  },
  header: {
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  cell: {
    flex: 1,
    textAlign: "center",
  },
});

export default profile;
