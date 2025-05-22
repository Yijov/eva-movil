import { Product } from "@/models/Product";
import React, { useEffect, useState } from "react";
import { Button, Modal, StyleSheet, TextInput, View } from "react-native";
import { ThemedText } from "../../../components/ThemedText";

interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (product: Product, isEditing: boolean) => void;
  productToEdit?: Product | null;
}

export default function ProductModal({ visible, onClose, onSubmit, productToEdit }: ProductModalProps) {
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [estimateMonthlyUnitSales, setEstimateMonthlyUnitSales] = useState("");
  const [taxPercent, setTaxPercent] = useState("18");
  const [pricingStrategy, setPricingStrategy] = useState<"percentage based" | "cost based">("cost based");
  const [targetRevenue, seTargetRevenue] = useState("");

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setCost(productToEdit.cost?.toString());
      setEstimateMonthlyUnitSales(productToEdit.estimateMonthlyUnitSales?.toString());
      setTaxPercent(productToEdit.taxPercent?.toString());
      setPricingStrategy(productToEdit.PricingStrategy);
      seTargetRevenue(productToEdit.targetRevenue?.toString());
    } else {
      resetForm();
    }
  }, [productToEdit]);

  const resetForm = () => {
    setName("");
    setCost("");
    setEstimateMonthlyUnitSales("");
    setTaxPercent("18");
    setPricingStrategy("cost based");
    seTargetRevenue("");
  };

  const handleSubmit = () => {
    const product = new Product(
      productToEdit?.id, // preserve ID for editing
      name,
      parseFloat(cost),
      parseInt(estimateMonthlyUnitSales),
      parseFloat(taxPercent),
      pricingStrategy,
      parseFloat(targetRevenue)
    );
    onSubmit(product, !!productToEdit);
    resetForm();
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <ThemedText type="subtitle">{productToEdit ? "Editar" : "Nuevo"} Producta</ThemedText>
        <TextInput placeholder="Nombre del producto" value={name} onChangeText={setName} style={styles.input} />
        <TextInput placeholder="Costo" value={cost} onChangeText={setCost} keyboardType="numeric" style={styles.input} />
        <TextInput placeholder="Estimado de venta mensual" value={estimateMonthlyUnitSales} onChangeText={setEstimateMonthlyUnitSales} keyboardType="numeric" style={styles.input} />
        <TextInput placeholder="% de impuesto" value={taxPercent} onChangeText={setTaxPercent} keyboardType="numeric" style={styles.input} />
        <TextInput placeholder={pricingStrategy === "percentage based" ? "Target Margin (%)" : "Target Margin ($)"} value={targetRevenue} onChangeText={seTargetRevenue} keyboardType="numeric" style={styles.input} />
        <View style={styles.toggleContainer}>
          <Button title="costo + ganacia" color={pricingStrategy === "cost based" ? "#007AFF" : "#ccc"} onPress={() => setPricingStrategy("cost based")} />
          <Button title="Percentage del precio" color={pricingStrategy === "percentage based" ? "#007AFF" : "#ccc"} onPress={() => setPricingStrategy("percentage based")} />
        </View>
        <Button title={productToEdit ? "Actualizar Product" : "Agregar Product"} onPress={handleSubmit} />
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