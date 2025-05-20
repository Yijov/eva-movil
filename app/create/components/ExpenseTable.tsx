import { Expense } from "@/models/Expense";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ExpenseTableProps {
  expenses: Expense[];
}

export default function ExpenseTable({ expenses }: ExpenseTableProps) {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.cell}>Name</Text>
        <Text style={styles.cell}>Amount</Text>
        <Text style={styles.cell}>Type</Text>
      </View>
      {expenses.map((item) =>  (
          <View key={item.id} style={styles.row}>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.amount.toFixed(2)}</Text>
            <Text style={styles.cell}>{item.type}</Text>
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