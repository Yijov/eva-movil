import { Employee } from "@/models/Employee";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface EmployeeTableProps {
  employees: Employee[];
}

export default function EmployeeTable({ employees }: EmployeeTableProps) {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.cell}>Position</Text>
        <Text style={styles.cell}>Head Count</Text>
        <Text style={styles.cell}>Monthly Salary</Text>
        <Text style={styles.cell}>Total Salary</Text>
      </View>
          {employees.map((item) => (
          <View  key={item.id} style={styles.row}>
            <Text style={styles.cell}>{item.position}</Text>
            <Text style={styles.cell}>{item.headCount}</Text>
            <Text style={styles.cell}>{item.positionMonthlySalary.toFixed(2)}</Text>
            <Text style={styles.cell}>{item.totalSalaryExpense.toFixed(2)}</Text>
          </View>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: "#eee",
    padding: 10,
  },
  row: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  cell: {
    flex: 1,
    fontSize: 14,
  },
});
