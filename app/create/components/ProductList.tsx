import { Product } from "@/models/Product";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.cell}>Name</Text>
        <Text style={styles.cell}>Cost</Text>
        <Text style={styles.cell}>Tax</Text>
        <Text style={styles.cell}>price</Text>
        <Text style={styles.cell}>projection</Text>
      </View>
      {products.map((item) => (
        <View key={item.id} style={styles.row}>
          <Text style={styles.cell}>{item.name}</Text>
          <Text style={styles.cell}>${item.cost.toFixed(2)}</Text>
          <Text style={styles.cell}>${item.unitTaxAmmount.toFixed(2)}</Text>
          <Text style={styles.cell}>${item.unitNetPrice.toFixed(2)}</Text>
          <Text style={styles.cell}>
            {item.estimateMonthlyUnitSales.toFixed(2)}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#red",

  },
  cell: {
    flex: 1,
    fontSize: 14,
  },
  
  header: {
    flexDirection: "row",
    backgroundColor: "#eee",
    padding: 10,
  },
});
