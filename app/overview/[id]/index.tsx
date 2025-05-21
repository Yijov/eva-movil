import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import { useProject } from "../../../hooks/useProject";

export default function ProjectOverviewPage() {
  
  const project = useProject();
  
  const [cashFlowMonths, setCashFlowMonths] = useState("12");
  const [budgetMonths, setBudgetMonths] = useState("3");

  if (!project)  {console.log(project) ;
return null  };

   const cashFlow = project.getCashFlow(Number(cashFlowMonths));
   const budget = project.getBudget(Number(budgetMonths));
   const roi = project.getROI();
  
   const equilibriumUnits = project.getEquilibriumMetrics().monthlyEquilibriumUnits*Number(cashFlowMonths);
   const equilibriumAmount = project.getEquilibriumMetrics().monthlyEquilibriumAmount* Number(cashFlowMonths);

  return (
    <ScrollView style={styles.container}>
      {/* Info del proyecto */}
      <ThemedText type="title">Proyecto {project.name.toUpperCase()}</ThemedText>

      {/* ROI */}
       <Section title="KPI">
        <Row label="Tiempo de retorno" value={roi.time} />
        <Row label="Inversión Inicial" value={`$${Number(roi.investment).toFixed(2)}`} />
        <Row label="Unidades equ. mensual" value={Math.round(equilibriumUnits)} />
        <Row label="Monto equ. mensual" value={`$${equilibriumAmount.toFixed(2)}`} />
      </Section> 

      {/* Cash Flow */}
     <Section title={`Flujo de efectivo (${cashFlowMonths} meses)`}>
        <InputRow label="Meses" value={cashFlowMonths} onChangeText={setCashFlowMonths} />
        <Row label="Ventas" value={`$${cashFlow.sales.toFixed(2)}`} />
        <Row label="Costo de ventas" value={`$${cashFlow.salesCost.toFixed(2)}`} />
        <Row label="Impuesto" value={`$${cashFlow.tax.toFixed(2)}`} />
        <Row label="Gastos Fijos" value={`$${cashFlow.expenses.toFixed(2)}`} />
        <Row label="Ingreso Neto" value={`$${cashFlow.netIncome.toFixed(2)}`} />
      </Section> 


      {/* Presupuesto */}
     <Section title={`Presupuesto (${budgetMonths} meses)`}>
        <InputRow label="Meses" value={budgetMonths} onChangeText={setBudgetMonths} />
        <Row label="Capital de producción" value={`$${budget.productionCapital.toFixed(2)}`} />
        <Row label="Sueldos" value={`$${budget.payroll.toFixed(2)}`} />
        <Row label="Gastos" value={`$${budget.expenses.toFixed(2)}`} />
        <Row label="Capital de activos" value={`$${budget.assetsCapital.toFixed(2)}`} />
        <Row
          label={`Contingencia (${project.contingencyPercent * 100}%)`}
          value={`$${budget.contingency.toFixed(2)}`}
        />
        <Row label="Total" value={`$${budget.totalBudget.toFixed(2)}`} />
      </Section> 
    </ScrollView>
  );
}

// Section Wrapper
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <ThemedText type="subtitle">{title}</ThemedText>
      <View style={styles.sectionContent}>{children}</View>
    </View>
  );
}

// Table-like Row
function Row({ label, value }: { label: string; value: string | number }) {
  return (
    <View style={styles.row}>
      <ThemedText style={styles.rowLabel}>{label}</ThemedText>
      <ThemedText style={styles.rowValue}>{value}</ThemedText>
    </View>
  );
}

// Input Row
function InputRow({
  label,
  value,
  onChangeText,
}: {
  label: string;
  value: string;
  onChangeText: (val: string) => void;
}) {
  return (
    <View style={styles.inputRow}>
      <ThemedText>{label}:</ThemedText>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionContent: {
    paddingLeft: 8,
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
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    minWidth: 60,
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 16,
  },
});