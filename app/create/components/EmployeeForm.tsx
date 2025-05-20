import { Employee } from "@/models/Employee";
import React, { useState } from "react";
import {
    Button,
    Modal,
    StyleSheet,
    TextInput,
    View
} from "react-native";
import { ThemedText } from "../../../components/ThemedText";

interface EmployeeModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (employee: Employee) => void;
}

export default function EmployeeModal({
  visible,
  onClose,
  onAdd,
}: EmployeeModalProps) {
  const [position, setPosition] = useState("");
  const [headCount, setHeadCount] = useState("");
  const [positionMonthlySalary, setPositionMonthlySalary] = useState("");
  const [jobDescription, setJobDescription] = useState("-");
  const [contractType, setContractType] = useState("fijo");
  const [paymentFrecuency, setPaymentFrecuency] = useState("monthly");
  const [department, setDepartment] = useState("-");

  const resetForm = () => {
    setPosition("");
    setHeadCount("");
    setPositionMonthlySalary("");
    setJobDescription("-");
    setContractType("fijo");
    setPaymentFrecuency("monthly");
    setDepartment("-");
  };

  const handleAdd = () => {
    const employee = new Employee(
      undefined,
      position,
      parseInt(headCount),
      parseFloat(positionMonthlySalary),
      jobDescription,
      contractType,
      paymentFrecuency,
      department
    );
    onAdd(employee);
    resetForm();
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <ThemedText type="subtitle">Nuevo Empleadp</ThemedText>
        <TextInput
          placeholder="Position"
          value={position}
          onChangeText={setPosition}
          style={styles.input}
        />
        <TextInput
          placeholder="Head Count"
          value={headCount}
          onChangeText={setHeadCount}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          placeholder="Monthly Salary"
          value={positionMonthlySalary}
          onChangeText={setPositionMonthlySalary}
          keyboardType="numeric"
          style={styles.input}
        />
     
        <Button title="Add Employee" onPress={handleAdd} />
        <Button title="Cancel" color="#888" onPress={onClose} />
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
