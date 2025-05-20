import { Expense } from "@/models/Expense";
import React, { useState } from "react";
import { Button, Modal, StyleSheet, TextInput, View } from "react-native";
import { ThemedText } from "../../../components/ThemedText";

interface ExpenseModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (expense: Expense) => void;
}

export default function ExpenseModal({
  visible,
  onClose,
  onAdd,
}: ExpenseModalProps) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"service" | "good">("good");

  const handleAdd = () => {
    const expense = new Expense(undefined, name, parseFloat(amount), type);
    onAdd(expense);
    setName("");
    setAmount("");
    setType("good");
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modal}>
        <ThemedText type="subtitle">Nuevo Gasto</ThemedText>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Nombre"
          style={styles.input}
        />

        <TextInput
          value={amount}
          onChangeText={setAmount}
          placeholder="Costo"
          keyboardType="numeric"
          style={styles.input}
        />

        <Button title="Add Expense" onPress={handleAdd} />
        <Button title="Cancel" onPress={onClose} color="gray" />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    gap: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 10,
    borderRadius: 5,
  },
  label: {
    fontWeight: "bold",
  },
});
