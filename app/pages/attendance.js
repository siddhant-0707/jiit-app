import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Stack, useSearchParams } from "expo-router";
import {
  getLogin,
  getSemDetails,
  getAttendanceDetails,
} from "../api_attendance";

const attendance = () => {
  const { username, password } = useSearchParams();

  const [detailsLogin, setDetailsLogin] = useState(null);
  const [detailsRegister, setDetailsRegister] = useState(null);
  const [detailsAttendance, setDetailsAttendance] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log("attendance" + username + " " + password);
      const resultLogin = await getLogin(username, password);
      setDetailsLogin(resultLogin);

      const resultRegistration = await getSemDetails();
      setDetailsRegister(resultRegistration);

      const resultAttendace = await getAttendanceDetails();
      setDetailsAttendance(resultAttendace);
    };

    fetchData();
  }, []);

  return (
    <View>
      <Stack.Screen
        options={{
          title: detailsLogin?.name || "Attendance",
        }}
      />
      {/* <Text style={styles.title}>{username}'s Attendance</Text> */}
      <ScrollView horizontal={false}>
        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={styles.header}>Subject Code</Text>
            <Text style={styles.header}>LT percentage</Text>
            <Text style={styles.header}>L percentage</Text>
            <Text style={styles.header}>P percentage</Text>
            <Text style={styles.header}>T percentage</Text>
          </View>
          {detailsAttendance &&
            detailsAttendance.map((data, index) => (
              <View style={styles.row} key={index}>
                <Text style={styles.cell}>{data.subjectcode}</Text>
                <Text style={styles.cell}>{data.LTpercantage || "-"}</Text>
                <Text style={styles.cell}>{data.Lpercentage || "-"}</Text>
                <Text style={styles.cell}>{data.Ppercentage || "-"}</Text>
                <Text style={styles.cell}>{data.Tpercentage || "-"}</Text>
              </View>
            ))}
        </View>
      </ScrollView>
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

export default attendance;
