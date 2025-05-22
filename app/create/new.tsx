import { Asset } from "@/models/Asset";
import { Employee } from "@/models/Employee";
import { Expense } from "@/models/Expense";
import { Product } from "@/models/Product";
import { Project } from "@/models/Project"; // Assuming you have a Project model
import React, { useState } from "react";
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { ProjectRepository } from "../../services/persistence";
import AssetModal from "./components/AssetForm";
import AssetList from "./components/AssetList";
import EmployeeModal from "./components/EmployeeForm";
import EmployeeTable from "./components/EmployeeTable";
import ExpenseModal from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseTable";
import ProductModal from "./components/ProductForm";
import ProductList from "./components/ProductList";

type Props = {
  initialProject?: Project;
  isEditing?: boolean;
};

export default function NewProjectScreen({
  initialProject,
  isEditing = false,
}: Props) {
  const [projectName, setProjectName] = useState(initialProject?.name ?? "");
  const [products, setProducts] = useState<Product[]>(
    initialProject?.products ?? []
  );
  const [assets, setAssets] = useState<Asset[]>(initialProject?.assets ?? []);
  const [expenses, setExpenses] = useState<Expense[]>(
    initialProject?.expenses ?? []
  );
  const [employees, setEmployees] = useState<Employee[]>(
    initialProject?.employees ?? []
  );

  const [isProductModalVisible, setProductModalVisible] = useState(false);
  const [isAssetModalVisible, setAssetModalVisible] = useState(false);
  const [isExpenseModalVisible, setExpenseModalVisible] = useState(false);
  const [isEmployeeModalVisible, setEmployeeModalVisible] = useState(false);

  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [assetToEdit, setAssetToEdit] = useState<Asset | null>(null);
  const [expenseToEdit, setExpenseToEdit] = useState<Expense | null>(null);
  const [employeeToEdit, setEmployeeToEdit] = useState<Employee | null>(null);

  const persistence = new ProjectRepository();

  const addOrUpdateProduct = (product: Product, isEditing: boolean) => {
    setProducts((prev) =>
      isEditing
        ? prev.map((p) => (p.id === product.id ? product : p))
        : [...prev, product]
    );
    setProductToEdit(null);
    setProductModalVisible(false);
  };

  const addOrUpdateAsset = (asset: Asset, isEditing: boolean) => {
    setAssets((prev) =>
      isEditing
        ? prev.map((a) => (a.id === asset.id ? asset : a))
        : [...prev, asset]
    );
    setAssetToEdit(null);
    setAssetModalVisible(false);
  };

  const addOrUpdateExpense = (expense: Expense, isEditing: boolean) => {
    setExpenses((prev) =>
      isEditing
        ? prev.map((e) => (e.id === expense.id ? expense : e))
        : [...prev, expense]
    );
    setExpenseToEdit(null);
    setExpenseModalVisible(false);
  };

  const addOrUpdateEmployee = (employee: Employee, isEditing: boolean) => {
    setEmployees((prev) =>
      isEditing
        ? prev.map((e) => (e.id === employee.id ? employee : e))
        : [...prev, employee]
    );
    setEmployeeToEdit(null);
    setEmployeeModalVisible(false);
  };

  const handleSubmit = async () => {
    if (!projectName.trim()) {
      Alert.alert("Validation", "Project name is required.");
      return;
    }

    const project = new Project(
      initialProject?.id || undefined,
      projectName,
      assets,
      products,
      expenses,
      employees
    );

    await persistence.save(project);
    Alert.alert(
      "Project Saved",
      isEditing ? "Changes saved successfully." : "New project created."
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        {isEditing ? "Edit Project" : "Create New Project"}
      </Text>

      <TextInput
        placeholder="Project Name"
        value={projectName}
        onChangeText={setProjectName}
        style={styles.input}
      />

      <Text style={styles.sectionTitle}>Products</Text>
      <Button
        title="Add Product"
        onPress={() => {
          setProductToEdit(null);
          setProductModalVisible(true);
        }}
      />
      <ProductList
        products={products}
        onEdit={(p: Product) => {
          setProductToEdit(p);
          setProductModalVisible(true);
        }}
      />

      <Text style={styles.sectionTitle}>Assets</Text>
      <Button
        title="Add Asset"
        onPress={() => {
          setAssetToEdit(null);
          setAssetModalVisible(true);
        }}
      />
      <AssetList
        assets={assets}
        onEdit={(a: Asset) => {
          setAssetToEdit(a);
          setAssetModalVisible(true);
        }}
      />

      <Text style={styles.sectionTitle}>Expenses</Text>
      <Button
        title="Add Expense"
        onPress={() => {
          setExpenseToEdit(null);
          setExpenseModalVisible(true);
        }}
      />
      <ExpenseList
        expenses={expenses}
        onEdit={(e: Expense) => {
          setExpenseToEdit(e);
          setExpenseModalVisible(true);
        }}
      />

      <Text style={styles.sectionTitle}>Employees</Text>
      <Button
        title="Add Employee"
        onPress={() => {
          setEmployeeToEdit(null);
          setEmployeeModalVisible(true);
        }}
      />
      <EmployeeTable
        employees={employees}
        onEdit={(e: Employee) => {
          setEmployeeToEdit(e);
          setEmployeeModalVisible(true);
        }}
      />

      <View style={styles.saveButton}>
        <Button
          title={isEditing ? "Save Changes" : "Save Project"}
          onPress={handleSubmit}
        />
      </View>

      {/* Modals */}
      <ProductModal
        visible={isProductModalVisible}
        onClose={() => {
          setProductToEdit(null);
          setProductModalVisible(false);
        }}
        onSubmit={addOrUpdateProduct}
        productToEdit={productToEdit}
      />
      <AssetModal
        visible={isAssetModalVisible}
        onClose={() => {
          setAssetToEdit(null);
          setAssetModalVisible(false);
        }}
        onSubmit={addOrUpdateAsset}
        assetToEdit={assetToEdit}
      />
      <ExpenseModal
        visible={isExpenseModalVisible}
        onClose={() => {
          setExpenseToEdit(null);
          setExpenseModalVisible(false);
        }}
        onSubmit={addOrUpdateExpense}
        expenseToEdit={expenseToEdit}
      />
      <EmployeeModal
        visible={isEmployeeModalVisible}
        onClose={() => {
          setEmployeeToEdit(null);
          setEmployeeModalVisible(false);
        }}
        onSubmit={addOrUpdateEmployee}
        employeeToEdit={employeeToEdit}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  sectionTitle: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "600",
  },
  saveButton: {
    marginVertical: 30,
  },
});
