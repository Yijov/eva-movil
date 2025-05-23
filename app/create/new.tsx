import { Asset } from "@/models/Asset";
import { Employee } from "@/models/Employee";
import { Expense } from "@/models/Expense";
import { Product } from "@/models/Product";
import { Project } from "@/models/Project";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
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
  const router=useRouter();
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

    const handleRemove= (item:Asset|Product|Employee|Expense) => {
        Alert.alert(
          "Delete Project",
          `Are you sure you want to delete this item?`,
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Delete",
              style: "destructive",
              onPress: () => {
                if(item instanceof Asset){
                  const filtered= assets.filter(a=> a.id !== item.id)
                    setAssets(filtered)
                }

                 if(item instanceof Product){
                  const filtered= products.filter(a=> a.id !== item.id)
                  setProducts(filtered)
                }

                if(item instanceof Employee){
                  const filtered= employees.filter(a=> a.id !== item.id)
                  setEmployees(filtered)
                }

                if(item instanceof Expense){
                  const filtered= expenses.filter(a=> a.id !== item.id)
                  setExpenses(filtered)
                }
             
              },
            },
          ]
        );
      };

const handleSubmit = async () => {
  if (!projectName.trim()) {
    Alert.alert("Validation", "El nombre del proyecto es requerido.");
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
    "Proyecto Guardado",
    isEditing ? "Cambios guardados exitosamente." : "Nuevo proyecto creado.",
    [
      {
        text: "OK",
        onPress: () => {
          // ✅ Your follow-up function here
          router.push(`../overview/${project.id}`);
          // You can navigate, reset state, etc.
        },
      },
    ]
  );
};

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        {isEditing ? "Editar Proyecto" : "Crear nuevo proyecto"}
      </Text>

      <TextInput
        placeholder="Nombre del proyecto"
        value={projectName}
        onChangeText={setProjectName}
        style={styles.input}
      />

      {/* Productos */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Productos</Text>
        <TouchableOpacity
          onPress={() => {
            setProductToEdit(null);
            setProductModalVisible(true);
          }}
        >
          <Text style={styles.addIcon}>＋</Text>
        </TouchableOpacity>
      </View>
      <ProductList
        products={products}
        onDelete={handleRemove}
        onEdit={(p: Product) => {
          setProductToEdit(p);
          setProductModalVisible(true);
        }}
      />

      {/* Activos */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Activos</Text>
        <TouchableOpacity
          onPress={() => {
            setAssetToEdit(null);
            setAssetModalVisible(true);
          }}
        >
          <Text style={styles.addIcon}>＋</Text>
        </TouchableOpacity>
      </View>
      <AssetList
        assets={assets}
        onDelete={handleRemove}
        onEdit={(a: Asset) => {
          setAssetToEdit(a);
          setAssetModalVisible(true);
        }}
      />

      {/* Gastos */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Gastos</Text>
        <TouchableOpacity
          onPress={() => {
            setExpenseToEdit(null);
            setExpenseModalVisible(true);
          }}
        >
          <Text style={styles.addIcon}>＋</Text>
        </TouchableOpacity>
      </View>
      <ExpenseList
        expenses={expenses}
        onDelete={handleRemove}
        onEdit={(e: Expense) => {
          setExpenseToEdit(e);
          setExpenseModalVisible(true);
        }}
      />

      {/* Empleados */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Empleados</Text>
        <TouchableOpacity
          onPress={() => {
            setEmployeeToEdit(null);
            setEmployeeModalVisible(true);
          }}
        >
          <Text style={styles.addIcon}>＋</Text>
        </TouchableOpacity>
      </View>
      <EmployeeTable
        onDelete={handleRemove}
        employees={employees}
        onEdit={(e: Employee) => {
          setEmployeeToEdit(e);
          setEmployeeModalVisible(true);
        }}
      />

      {/* Botón Guardar */}
      <View style={styles.saveButton}>
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={
            !expenses.length ||
            !products.length ||
            !assets.length ||
            !employees.length ||
            !projectName
          }
          style={[
            styles.saveButtonWrapper,
            {
              backgroundColor:
                !expenses.length ||
                !products.length ||
                !assets.length ||
                !employees.length ||
                !projectName
                  ? "#ccc"
                  : "#007AFF",
            },
          ]}
        >
          <Text style={styles.saveButtonText}>
            {isEditing ? "Guardar Cambios" : "Guardar Proyecto"}
          </Text>
        </TouchableOpacity>
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
    fontSize: 18,
    fontWeight: "600",
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  addIcon: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF",
    paddingHorizontal: 10,
  },
  saveButton: {
    marginVertical: 30,
    alignItems: "center",
  },
  saveButtonWrapper: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
