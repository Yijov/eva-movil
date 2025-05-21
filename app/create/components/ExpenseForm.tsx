import { Expense } from "@/models/Expense";
import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { ThemedText } from "../../../components/ThemedText";

interface ExpenseModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (expense: Expense, isEditing: boolean) => void;
  expenseToEdit?: Expense | null;
}

export default function ExpenseModal({
  visible,
  onClose,
  onSubmit,
  expenseToEdit,
}: ExpenseModalProps) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (expenseToEdit) {
      setName(expenseToEdit.name);
      setAmount(expenseToEdit.amount.toString());
   
    } else {
      setName("");
      setAmount("");
    }
  }, [expenseToEdit]);

  const handleSubmit = () => {
    if (!name || isNaN(Number(amount))) return;

    const expense = new Expense(
      expenseToEdit?.id,
      name,
      parseFloat(amount)
    );

    onSubmit(expense, !!expenseToEdit);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <ThemedText type="subtitle">
          {expenseToEdit ? "Edit Expense" : "New Expense"}
        </ThemedText>

        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          style={styles.input}
        />
     

        <Button title={expenseToEdit ? "Update Expense" : "Add Expense"} onPress={handleSubmit} />
        <Button title="Cancel" onPress={onClose} color="gray" />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    gap: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    padding: 10,
    borderRadius: 5,
  },
});