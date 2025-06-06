import { Employee } from "@/models/Employee";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface EmployeeListProps {
  employees: Employee[];
  onEdit?: (employee: Employee) => void;
   onDelete?: (asset: Employee) => void;
}

export default function EmployeeTable({ employees, onEdit, onDelete }: EmployeeListProps) {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.cell}>Posición</Text>
        <Text style={styles.cell}>Cantidad</Text>
        <Text style={styles.cell}>Salario</Text>
        <Text style={styles.cell}>Total</Text>
      </View>
      {employees.map((employee) => (
        <Pressable key={employee.id} onLongPress={()=> onDelete?.(employee)} onPress={() => onEdit?.(employee)}>
          <View style={styles.row}>
            <Text style={styles.cell}>{employee.position}</Text>
            <Text style={styles.cell}>{employee.headCount}</Text>
            <Text style={styles.cell}>${employee.positionMonthlySalary.toFixed(2)}</Text>
            <Text style={styles.cell}>${(employee.positionMonthlySalary *  employee.headCount).toFixed(2)}</Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cell: {
    flex: 1,
    fontSize: 12,
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#eee",
    padding: 10,
  },
});
