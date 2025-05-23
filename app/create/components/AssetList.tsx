import { Asset } from "@/models/Asset";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface AssetListProps {
  assets: Asset[];
  onEdit?: (asset: Asset) => void;
  onDelete?: (asset: Asset) => void;
}

export default function AssetList({ assets, onEdit, onDelete }: AssetListProps) {

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.cell}>Nombre</Text>
        <Text style={styles.cell}>Costo</Text>
        <Text style={styles.cell}>Cantidad</Text>
        <Text style={styles.cell}>Total</Text>
      </View>
      {assets.map((asset) => (
        <Pressable key={asset.id} onLongPress={()=> onDelete?.(asset)} onPress={() => onEdit?.(asset)}>
          <View style={styles.row}>
            <Text style={styles.cell}>{asset.name}</Text>
            <Text style={styles.cell}>${asset.cost.toFixed(2)}</Text>
            <Text style={styles.cell}>{asset.quantity}</Text>
            <Text style={styles.cell}>${asset.totalCost.toFixed(2)}</Text>
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
