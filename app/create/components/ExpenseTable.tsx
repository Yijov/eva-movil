import { Expense } from "@/models/Expense";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface ExpenseListProps {
  expenses: Expense[];
  onEdit?: (expense: Expense) => void;
  onDelete?: (asset: Expense) => void;
}

export default function ExpenseList({ expenses, onEdit , onDelete}: ExpenseListProps) {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.cell}>Nombre</Text>
        <Text style={styles.cell}>Costo</Text>
      </View>
      {expenses.map((expense) => (
        <Pressable key={expense.id} onLongPress={()=> onDelete?.(expense)} onPress={() => onEdit?.(expense)}>
          <View style={styles.row}>
            <Text style={styles.cell}>{expense.name}</Text>
            <Text style={styles.cell}>${expense.amount.toFixed(2)}</Text>
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