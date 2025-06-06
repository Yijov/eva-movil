import { Employee } from "@/models/Employee";
import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { ThemedText } from "../../../components/ThemedText";

interface EmployeeModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (employee: Employee, isEditing: boolean) => void;
  employeeToEdit?: Employee | null;
}

export default function EmployeeModal({
  visible,
  onClose,
  onSubmit,
  employeeToEdit,
}: EmployeeModalProps) {
  const [position, setPosition] = useState("");
  const [headCount, setHeadCount] = useState("");
  const [monthlySalary, setMonthlySalary] = useState("");

  useEffect(() => {
    if (employeeToEdit) {
      setPosition(employeeToEdit.position);
      setHeadCount(String(employeeToEdit.headCount));
      setMonthlySalary(employeeToEdit.positionMonthlySalary.toString());
    } else {
      setPosition("");
      setHeadCount("");
      setMonthlySalary("");
    }
  }, [employeeToEdit]);

  const handleSubmit = () => {
    if (!position || !headCount || isNaN(Number(monthlySalary))) return;

    const employee = new Employee(
      employeeToEdit?.id, // Keep ID if editing
      position,
      Number(headCount),
      parseFloat(monthlySalary)
    );

    onSubmit(employee, !!employeeToEdit);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <ThemedText type="subtitle">{employeeToEdit ? "Editar Empleado" : "Nuevo Empleado"}</ThemedText>

        <TextInput
          placeholder="Nombre de la posicion"
          value={position}
          onChangeText={setPosition}
          style={styles.input}
        />
        <TextInput
          placeholder="Cantidad de posiciones"
          value={headCount}
          keyboardType="numeric"
          onChangeText={setHeadCount}
          style={styles.input}
        />
        <TextInput
          placeholder="Salario mensual"
          value={monthlySalary}
          onChangeText={setMonthlySalary}
          keyboardType="numeric"
          style={styles.input}
        />

        <Button title={employeeToEdit ? "Actualizar Empleado" : "Agregar Empleado"} onPress={handleSubmit} />
        <Button title="Cancelar" onPress={onClose} color="gray" />
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
