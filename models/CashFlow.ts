import { Project } from "./Project";

export class CashFlow {
  public sales: number;
  public expenses: number;
  public salesCost: number;
  public tax: number;
  public netIncome: number;
  constructor(private months: number, private project: Project) {
    this.sales = project.monthlyGrossSales * months;
    (this.expenses = project.monthlyPayroll + project.monthlyExpense * months),
      (this.salesCost = project.monthlySalesCost * months);
    (this.tax = project.monthlySalesTax * months),
      (this.netIncome =
        (project.monthlyGrossSales -
          (project.monthlyPayroll + project.monthlyExpense) -
          project.monthlySalesCost -
          project.monthlySalesTax) *
        months);
  }
}
