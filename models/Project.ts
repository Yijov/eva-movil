import { generateUniqueString } from "../utils";
import { Asset } from "./Asset";
import { Budget } from "./Budget";
import { CashFlow } from "./CashFlow";
import { Employee } from "./Employee";
import { Expense } from "./Expense";
import { Product } from "./Product";
import { ProductMetric } from "./ProductMetric";
import { Roi } from "./Roi";

export class Project {
  constructor(
    public id: string = generateUniqueString(),
    public name: string,
    private assets: Asset[],
    private products: Product[],
    private expenses: Expense[],
    private employees: Employee[],
    public contingencyPercent: number = 0.08
  ) {}

  //products
  get monthlyGrossSales() {
    return this.products.reduce(
      (a, b) => a + b.estimateMonthlyGrossSalesAmmount,
      0
    );
  }

  get monthlyUnitSales() {
    return this.products.reduce((a, b) => a + b.estimateMonthlyUnitSales, 0);
  }

  get monthlySalesCost() {
    return this.products.reduce((a, b) => a + b.monthlySalesCost, 0);
  }

  get monthlySalesTax() {
    return this.products.reduce((a, b) => a + b.unitTaxAmmount, 0);
  }

  get totalPondarateMargin() {
    return this.products.reduce(
      (a, b) => a + b.getPonderateMargin(this.monthlyUnitSales),
      0
    );
  }

  //employees

  get monthlyPayroll() {
    return this.employees.reduce((a, b) => a + b.totalSalaryExpense, 0);
  }
  get yearlyPayroll() {
    return this.monthlyPayroll * 12;
  }
  //expenses
  get monthlyExpense() {
    return this.expenses.reduce((a, b) => a + b.amount, 0);
  }
  get yearlyExpense() {
    return this.monthlyExpense * 12;
  }

  get totalAssetsCost(): number {
    return this.assets.reduce((a, b) => a + b.totalCost, 0);
  }

  //Project metrics

  public getCashFlow(months: number = 1): CashFlow {
    const project = this;
    return new CashFlow(months, project);
  }

  public getBudget(months: number = 3) {
    const project = this;
    return new Budget(months, project);
  }

  public getEquilibriumMetrics() {
    const productmetrics = this.getProductsMetrics();
    return {
      productMetrics: productmetrics, //equilibrium metric for every product
      monthlyEquilibriumUnits: productmetrics.reduce(
        (a, b) => a + b.equilibriumUnits,
        0
      ), // minimo de productos a vender al mes
      monthlyEquilibriumAmount: productmetrics.reduce(
        (a, b) => a + b.equilibriumAmount,
        0
      ), // minimo de dinero a vender al mes
    };
  }

  public getROI(): Roi {
    return new Roi(this.getCashFlow(12), this.getBudget(3));
  }

  private getProductsMetrics = () => {
    const monthlyCashflow = this.getCashFlow(1);
    const metrics = this.products.map((prod) => {
      const participation = prod.getParticipation(this.monthlyUnitSales);
      return new ProductMetric(
        prod,
        monthlyCashflow,
        this.totalPondarateMargin,
        participation
      );
    });

    return metrics;
  };

  static fromJSON(json: any): Project {
    return new Project(
      json.id,
      json.name,
      json.assets.map((a: any) => Asset.fromJSON(a)),
      json.products.map((p: any) => Product.fromJSON(p)),
      json.expenses.map((e: any) => Expense.fromJSON(e)),
      json.employees.map((e: any) => Employee.fromJSON(e)),
      Number(json.contingencyPercent) 
    );
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      assets: this.assets.map((a) => a.toJSON()),
      products: this.products.map((p) => p.toJSON()),
      expenses: this.expenses.map((e) => e.toJSON()),
      employees: this.employees.map((e) => e.toJSON()),
      contingencyPercent: this.contingencyPercent,
    };
  }

  // ---------------------------
  // CRUD: Assets
  // ---------------------------

  public addAsset(asset: Asset) {
    this.assets.push(asset);
  }

  public updateAsset(updated: Asset) {
    const index = this.assets.findIndex((a) => a.id === updated.id);
    if (index !== -1) this.assets[index] = updated;
  }

  public removeAsset(id: string) {
    this.assets = this.assets.filter((a) => a.id !== id);
  }

  public getAssets(): Asset[] {
    return [...this.assets];
  }

  // ---------------------------
  // CRUD: Products
  // ---------------------------

  public addProduct(product: Product) {
    this.products.push(product);
  }

  public updateProduct(updated: Product) {
    const index = this.products.findIndex((p) => p.id === updated.id);
    if (index !== -1) this.products[index] = updated;
  }

  public removeProduct(id: string) {
    this.products = this.products.filter((p) => p.id !== id);
  }

  public getProducts(): Product[] {
    return [...this.products];
  }

  // ---------------------------
  // CRUD: Expenses
  // ---------------------------

  public addExpense(expense: Expense) {
    this.expenses.push(expense);
  }

  public updateExpense(updated: Expense) {
    const index = this.expenses.findIndex((e) => e.id === updated.id);
    if (index !== -1) this.expenses[index] = updated;
  }

  public removeExpense(id: string) {
    this.expenses = this.expenses.filter((e) => e.id !== id);
  }

  public getExpenses(): Expense[] {
    return [...this.expenses];
  }

  // ---------------------------
  // CRUD: Employees
  // ---------------------------

  public addEmployee(employee: Employee) {
    this.employees.push(employee);
  }

  public updateEmployee(updated: Employee) {
    const index = this.employees.findIndex((e) => e.id === updated.id);
    if (index !== -1) this.employees[index] = updated;
  }

  public removeEmployee(id: string) {
    this.employees = this.employees.filter((e) => e.id !== id);
  }

  public getEmployees(): Employee[] {
    return [...this.employees];
  }

  // ----------------------------------------
  // (Keep your metrics/calculations methods)
  // --
}
