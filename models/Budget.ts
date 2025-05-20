import { Project } from "./Project";

export class Budget {
  constructor(private months: number, private project: Project) {}

  get productionCapital(): number {
    return this.project.monthlySalesCost;
  }
  get expenses(): number {
    return this.project.monthlyExpense * this.months;
  }
  get payroll(): number {
    return this.project.monthlyPayroll * this.months;
  }
  get assetsCapital(): number {
    return this.project.totalAssetsCost;
  }
  get contingency(): number {
    return (
      (this.productionCapital +
        this.expenses +
        this.payroll +
        this.assetsCapital) *
      this.project.contingencyPercent
    );
  }
  get totalBudget(): number {
    return (
      this.productionCapital +
      this.expenses +
      this.payroll +
      this.assetsCapital +
      this.contingency
    );
  }
}
