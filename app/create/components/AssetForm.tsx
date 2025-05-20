// components/AssetModal.tsx
import { Asset } from "@/models/Asset";
import React, { useState } from "react";
import {
    Button,
    Modal,
    StyleSheet,
    TextInput,
    View
} from "react-native";
import { ThemedText } from "../../../components/ThemedText";

interface AssetModalProps {
  visible: boolean;
  onSubmit: (asset: Asset) => void;
  onCancel: () => void;
}

export default function AssetModal({
  visible,
  onSubmit,
  onCancel,
}: AssetModalProps) {
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [quantity, setQuantity] = useState("");
  const [type, setType] = useState<"fixed" | "current" | "finantial" | "intangible">("fixed");
  const [description, setDescription] = useState("");

  const handleAdd = () => {
    if (!name || !cost || !quantity || isNaN(Number(cost)) || isNaN(Number(quantity))) {
      // Optional: Add validation or show an alert
      return;
    }

    const asset = new Asset(
      undefined,
      name,
      parseFloat(cost),
      parseInt(quantity),
      type,
      description
    );

    onSubmit(asset);
    // Reset form
    setName("");
    setCost("");
    setQuantity("");
    setType("fixed");
    setDescription("");
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modal}>
        <ThemedText type="subtitle">Nuevo Activo</ThemedText>
        <TextInput
          placeholder="Name"
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
          placeholder="Quantity"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
          style={styles.input}
        />
      
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
          style={[styles.input, { height: 80 }]}
        />
        <Button title="Add Asset" onPress={handleAdd} />
        <Button title="Cancel" onPress={onCancel}  color="gray"  />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
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

  label: {
    fontWeight: "bold",
    marginTop: 10,
  },
});
