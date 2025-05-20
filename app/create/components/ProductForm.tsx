import { Product } from "@/models/Product";
import React, { useState } from "react";
import {
    Button,
    Modal,
    StyleSheet,
    TextInput,
    View
} from "react-native";
import { ThemedText } from "../../../components/ThemedText";

interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (product: Product) => void;
}

export default function ProductModal({ visible, onClose, onAdd }: ProductModalProps) {
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [estimateMonthlyUnitSales, setEstimateMonthlyUnitSales] = useState("");
  const [taxPercent, setTaxPercent] = useState("18");
  const [pricing, setPricing] = useState<"percentage based" | "cost based">("cost based");
  const [revenue, setRevenue] = useState("");

  const resetForm = () => {
    setName("");
    setCost("");
    setEstimateMonthlyUnitSales("");
    setTaxPercent("18");
    setPricing("cost based");
    setRevenue("");
  };

  const handleAdd = () => {
    const product = new Product(
      undefined,
      name,
      parseFloat(cost),
      parseInt(estimateMonthlyUnitSales),
      parseFloat(taxPercent),
      pricing,
      parseFloat(revenue)
    );
    onAdd(product);
    resetForm();
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
    
      <View style={styles.container}>
        <ThemedText type="subtitle">Nuevo Producto</ThemedText>
        <TextInput
          placeholder="Product Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Cost"
          value={cost}
          onChangeText={setCost}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          placeholder="Monthly Unit Sales"
          value={estimateMonthlyUnitSales}
          onChangeText={setEstimateMonthlyUnitSales}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          placeholder="Tax Percent"
          value={taxPercent}
          onChangeText={setTaxPercent}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          placeholder={pricing === "percentage based" ? "Target Margin (%)" : "Target Margin ($)"}
          value={revenue}
          onChangeText={setRevenue}
          keyboardType="numeric"
          style={styles.input}
        />
        <View style={styles.toggleContainer}>
          <Button
            title="Cost Based"
            color={pricing === "cost based" ? "#007AFF" : "#ccc"}
            onPress={() => setPricing("cost based")}
          />
          <Button
            title="Percentage Based"
            color={pricing === "percentage based" ? "#007AFF" : "#ccc"}
            onPress={() => setPricing("percentage based")}
          />
        </View>
        <Button title="Add Product" onPress={handleAdd} />
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
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
});
