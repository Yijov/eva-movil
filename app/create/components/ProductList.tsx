import { Product } from "@/models/Product";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete?: (asset: Product) => void;
}

export default function ProductList({ products, onEdit, onDelete }: ProductListProps) {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.cell}>Nombre</Text>
        <Text style={styles.cell}>Costo</Text>
        <Text style={styles.cell}>impuesto</Text>
        <Text style={styles.cell}>Margen</Text>
        <Text style={styles.cell}>Precio</Text>
        <Text style={styles.cell}>Proyectado</Text>
      </View>
      {products.map((item) => (
        <TouchableOpacity key={item.id} onLongPress={()=> onDelete?.(item)} onPress={() => onEdit(item)}>
          <View style={styles.row}>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>${item.cost.toFixed(2)}</Text>
            <Text style={styles.cell}>${item.unitTaxAmmount.toFixed(2)}</Text>
            <Text style={styles.cell}>${item.unitGrossMargin.toFixed(2)}</Text>
            <Text style={styles.cell}>${item.unitNetPrice.toFixed(2)}</Text>
            <Text style={styles.cell}>{item.estimateMonthlyUnitSales}</Text>
          </View>
        </TouchableOpacity>
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
    fontSize: 10,
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#eee",
    padding: 10,
  },
});
