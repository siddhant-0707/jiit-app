import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Stack, useSearchParams } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import {
  getLogin,
  getRegistrationList,
  getTeacherName,
} from "../api_attendance";

const subjects = () => {
  const [detailsReg, setDetailsReg] = useState(null);
  const [detailsTeacher, setDetailsTeacher] = useState(null);
  const [selectedRegistrationId, setSelectedRegistrationId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const resultRegister = await getRegistrationList();
      setDetailsReg(resultRegister);

      const resultTeacher = await getTeacherName(
        resultRegister[0].registrationid
      );
      setDetailsTeacher(resultTeacher);
      setSelectedRegistrationId(resultRegister[0].registrationid);
    };

    fetchData();
  }, []);

  const handleRegistrationIdChange = async (registrationId) => {
    setSelectedRegistrationId(registrationId);
    const resultTeacher = await getTeacherName(registrationId);
    setDetailsTeacher(resultTeacher);
  };

  return (
    <View>
      <Stack.Screen
        options={{
          title: "SUBJECTS",
        }}
      />
      {/* <Text style={styles.title}>{username}'s Attendance</Text> */}
      <Picker
        selectedValue={selectedRegistrationId}
        onValueChange={(value) => handleRegistrationIdChange(value)}
      >
        {detailsReg &&
          detailsReg.map((reg, index) => (
            <Picker.Item
              key={index}
              label={reg.registrationcode}
              value={reg.registrationid}
            />
          ))}
      </Picker>
      <ScrollView horizontal={false}>
        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={styles.header}>Subject Name</Text>
            <Text style={styles.header}>Credit</Text>
          </View>
          {detailsTeacher &&
            detailsTeacher.map((data, index) => (
              <View style={styles.row} key={index}>
                <Text style={styles.cell}>{data.subjectdesc}</Text>
                <Text style={styles.cell}>{data.credits || "-"}</Text>
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

export default subjects;
