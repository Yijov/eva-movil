import { Asset } from "@/models/Asset";
import { Project } from "@/models/Project";
import { ProjectRepository } from "@/services/persistence";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, ScrollView, StyleSheet, TextInput, View } from "react-native";
import { ThemedText } from "../../components/ThemedText";
import { Employee } from "../../models/Employee";
import { Expense } from "../../models/Expense";
import { Product } from "../../models/Product";
import AssetModal from "./components/AssetForm";
import AssetList from "./components/AssetList";
import EmployeeModal from "./components/EmployeeForm";
import EmployeeTable from "./components/EmployeeTable";
import ExpenseModal from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import ProductModal from "./components/ProductForm";
import ProductList from "./components/ProductList";

export default function NewProjectScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [assets, setAssets] = useState<Asset[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isAssetModalVisible, setAssetModalVisible] = useState(false);
  const [isProductModalVisible, setProductModalVisible] = useState(false);
  const [isEmployeeModalVisible, setEmployeeModalVisible] = useState(false);
  const [isExpenseModalVisible, setExpenseModalVisible] = useState(false);

  const handleAddAsset = (asset: Asset) => {
    setAssets((prev) => [...prev, asset]);
    setAssetModalVisible(false);
  };

  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
    setProductModalVisible(false);
  };

  const addEmployee = (employee: Employee) => {
    setEmployees((prev) => [...prev, employee]);
    setEmployeeModalVisible(false);
  };

  const addExpense = (expense: Expense) => {
    setExpenses((prev) => [...prev, expense]);
    setExpenseModalVisible(false);
  };

  const repository = new ProjectRepository();

  const saveProject = async () => {
    const project = new Project(
      undefined,
      name,
      assets,
      products,
      expenses,
      employees
    );
    await repository.save(project);
     router.push(`./overview/${project.id}`);
  };
  return (
    <ScrollView>
      <View style={styles.innerContainer}>
        <ThemedText type="title">Nuevo Proyecto</ThemedText>

        <TextInput
          placeholder="Project Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <Button
          title="Add Product"
          onPress={() => setProductModalVisible(true)}
        />

        <ProductList products={products} />

        <Button title="Add Asset" onPress={() => setAssetModalVisible(true)} />
        <AssetList assets={assets} />

        <Button
          title="Add Expense"
          onPress={() => setExpenseModalVisible(true)}
        />
        <ExpenseTable expenses={expenses} />

        <Button
          title="Add Employee"
          onPress={() => setEmployeeModalVisible(true)}
        />
        <EmployeeTable employees={employees} />

        <Button
          title="Save Project"
          disabled={
            !name ||
            !assets.length ||
            !products.length ||
            !expenses.length ||
            !employees.length
          }
          onPress={saveProject}
        />
      </View>

      {/* ---------- MODALS ---------- */}
      <ProductModal
        visible={isProductModalVisible}
        onClose={() => setProductModalVisible(false)}
        onAdd={addProduct}
      />
      <AssetModal
        visible={isAssetModalVisible}
        onSubmit={handleAddAsset}
        onCancel={() => setAssetModalVisible(false)}
      />
      <EmployeeModal
        visible={isEmployeeModalVisible}
        onClose={() => setEmployeeModalVisible(false)}
        onAdd={addEmployee}
      />
      <ExpenseModal
        visible={isExpenseModalVisible}
        onClose={() => setExpenseModalVisible(false)}
        onAdd={addExpense}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 40,
  },
  innerContainer: {
    padding: 20,
    gap: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    padding: 10,
    borderRadius: 5,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  buttonWrapper: {
    marginBottom: 8,
  },
});
