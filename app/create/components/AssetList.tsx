import { Asset } from "@/models/Asset";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props { assets: Asset[] }

export default function AssetList({ assets }: Props) {
  return (
    <View>
      <View style={[styles.row, styles.header]}>
        <Text style={styles.cell}>Name</Text>
        <Text style={styles.cell}>Qty</Text>
        <Text style={styles.cell}>Cost</Text>
        <Text style={styles.cell}>Total</Text>
      </View>

      {assets.map((a) => (
        <View key={a.id} style={styles.row}>
          <Text style={styles.cell}>{a.name}</Text>
          <Text style={styles.cell}>{a.quantity}</Text>
          <Text style={styles.cell}>{a.cost.toFixed(2)}</Text>
          <Text style={styles.cell}>{a.totalCost.toFixed(2)}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cell: { flex: 1, textAlign: "center" },
  header: { backgroundColor: "#eee", fontWeight: "bold" },
});