import { Asset } from "@/models/Asset";
import React, { useEffect, useState } from "react";
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
  onSubmit: (asset: Asset, isEditing: boolean) => void;
  onClose: () => void;
  assetToEdit?: Asset | null;
}

export default function AssetModal({
  visible,
  onSubmit,
  onClose,
  assetToEdit,
}: AssetModalProps) {
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [quantity, setQuantity] = useState("");
  const [type, setType] = useState<"fixed" | "current" | "finantial" | "intangible">("fixed");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (assetToEdit) {
      setName(assetToEdit.name);
      setCost(assetToEdit.cost.toString());
      setQuantity(assetToEdit.quantity.toString());
      setType(assetToEdit.type);
      setDescription(assetToEdit.description || "");
    } else {
      setName("");
      setCost("");
      setQuantity("");
      setType("fixed");
      setDescription("");
    }
  }, [assetToEdit]);

  const handleSubmit = () => {
    if (!name || !cost || !quantity || isNaN(Number(cost)) || isNaN(Number(quantity))) {
      return;
    }

    const asset = new Asset(
      assetToEdit?.id, // Keep ID if editing
      name,
      parseFloat(cost),
      parseInt(quantity),
      type,
      description
    );

    onSubmit(asset, !!assetToEdit);
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modal}>
        <ThemedText type="subtitle">{assetToEdit ? "Edit Asset" : "New Asset"}</ThemedText>

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

        <Button title={assetToEdit ? "Update Asset" : "Add Asset"} onPress={handleSubmit} />
        <Button title="Cancel" onPress={onClose} color="gray" />
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
});