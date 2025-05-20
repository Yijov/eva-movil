import { CashFlow } from "./CashFlow";
import { Product } from "./Product";
export class ProductMetric {
  public productName: string;
  public price: number;
  public equilibriumUnits: number;
  public equilibriumAmount: number;
  public participation: number;
  public grossMarginPercent: number;
  public grossMargin: number;
  public cost: number;
  constructor(
    prod: Product,
    monthlyCashflow: CashFlow,
    totalPondarateMargin: number,
    participation: number
  ) {
    this.productName = prod.name;
    this.price = prod.unitNetPrice;
    this.equilibriumUnits =
      ((monthlyCashflow.expenses / totalPondarateMargin) * participation) / 100;
    this.equilibriumAmount =
      (monthlyCashflow.expenses / totalPondarateMargin) *
      (participation / 100) *
      prod.unitNetPrice;
    this.participation = participation;
    this.grossMarginPercent = prod.unitGrossMarginPercent;
    this.grossMargin = prod.unitGrossMargin;
    this.cost = prod.cost;
  }
}
