import { ThemedText } from "@/components/ThemedText";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  BackHandler,
  Button,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { useProject } from "../../../hooks/useProject";
import { formatCurrency } from "../../../utils";

export default function ProjectOverviewPage() {
  const project = useProject();
  const router = useRouter();
  const [cashFlowMonths, setCashFlowMonths] = useState("12");
  const [budgetMonths, setBudgetMonths] = useState("3");

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        router.replace("/"); // Always navigate to home page
        return true; // Prevent default back behavior
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => subscription.remove();
    }, [router])
  );

  if (!project) return null;

  const cashFlow = project.getCashFlow(Number(cashFlowMonths));
  const budget = project.getBudget(Number(budgetMonths));
  const roi = project.getROI(Number(budgetMonths));
  const IsProjectProfitable = String(roi.time).toLowerCase()!=="no rentable";
  const equilibriumUnits =
    project.getEquilibriumMetrics().monthlyEquilibriumUnits;
  const equilibriumAmount =
    project.getEquilibriumMetrics().monthlyEquilibriumAmount;

  return (
    <ScrollView style={styles.container}>
      {/* Project title */}
      <ThemedText type="title">{project.name.toUpperCase()}</ThemedText>

      {/* KPI Section */}
      <Section title="KPI">
        <Row label="Tiempo de retorno" value={roi.time} />
        <Row
          label="Inversión Inicial"
          value={
            IsProjectProfitable
              ? `$${formatCurrency(roi.investment)}`
              : roi.investment
          }
        />
        <Row
          label="Unidades equ. mensual"
          value={IsProjectProfitable ? Math.round(equilibriumUnits) : "n/a"}
        />
        <Row
          label="Monto equ. mensual"
          value={
            IsProjectProfitable
              ? `$${formatCurrency(equilibriumAmount)}`
              : "n/a"
          }
        />
      </Section>

      {/* Cash Flow Section */}
      <Section
        title={"Flujo de efectivo " + " (" + cashFlowMonths + " meses)"}
        inputValue={cashFlowMonths}
        onInputChange={setCashFlowMonths}
      >
        <Row label="Ventas" value={`$${formatCurrency(cashFlow.sales)}`} />
        <Row
          label="Costo de ventas"
          value={`$${formatCurrency(cashFlow.salesCost)}`}
        />
        <Row label="Impuesto" value={`$${formatCurrency(cashFlow.tax)}`} />
        <Row label="Gastos" value={`$${formatCurrency(cashFlow.expenses)}`} />
        <Row
          label="Ingreso Neto"
          value={`$${formatCurrency(cashFlow.netIncome)}`}
        />
      </Section>

      {/* Budget Section */}
      <Section
        title={"Presupuesto" + " (" + budgetMonths + " meses)"}
        inputValue={budgetMonths}
        onInputChange={setBudgetMonths}
      >
        <Row
          label="Capital de producción"
          value={`$${formatCurrency(budget.productionCapital)}`}
        />
        <Row label="Sueldos" value={`$${formatCurrency(budget.payroll)}`} />
        <Row
          label="Gastos Fijos"
          value={`$${formatCurrency(budget.expenses)}`}
        />
        <Row
          label="Capital de activos"
          value={`$${formatCurrency(budget.assetsCapital)}`}
        />
        <Row
          label={`Contingencia (${project.contingencyPercent * 100}%)`}
          value={`$${formatCurrency(budget.contingency)}`}
        />
        <Row label="Total" value={`$${formatCurrency(budget.totalBudget)}`} />
      </Section>

      <Button
        title="Editar"
        onPress={() => {
          router.push(`../edit/${project.id}`);
        }}
      />
    </ScrollView>
  );
}

// Section Component
function Section({
  title,
  inputValue,
  onInputChange,
  children,
}: {
  title: string;
  inputValue?: string;
  onInputChange?: (val: string) => void;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeaderRow}>
        <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
        {inputValue !== undefined && onInputChange && (
          <TextInput
            style={styles.inlineInput}
            keyboardType="numeric"
            value={inputValue}
            onChangeText={onInputChange}
          />
        )}
      </View>
      <View style={styles.sectionContent}>{children}</View>
    </View>
  );
}

// Row Display
function Row({ label, value }: { label: string; value: string | number }) {
  return (
    <View style={styles.row}>
      <ThemedText style={styles.rowLabel}>{label}</ThemedText>
      <ThemedText style={styles.rowValue}>{value}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "lightgray",
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  sectionTitle: {
    fontWeight: "600",
    fontSize: 16,
  },
  sectionContent: {
    paddingTop: 8,
    paddingHorizontal: 8,
    gap: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowLabel: {
    flex: 1,
    fontWeight: "500",
  },
  rowValue: {
    flex: 1,
    textAlign: "right",
  },
  inlineInput: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    minWidth: 60,
    paddingVertical: 2,
    paddingHorizontal: 8,
    fontSize: 16,
    textAlign: "right",
    backgroundColor: "white",
    borderRadius: 4,
  },
});
