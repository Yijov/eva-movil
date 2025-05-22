import { Budget } from "./Budget";
import { CashFlow } from "./CashFlow";

export class Roi{
    public time:string|number
    public investment:string|number
    constructor(cashFlow:CashFlow, budget:Budget ){
    let spectedReturnTimeY = 0;
    let moneyFlow = cashFlow.netIncome;
    let investment = budget;
    let negativeInvestment = investment.totalBudget * -1;
    let lastRemainer = 0;
    let lastFlow = 0;
    if (moneyFlow <= 0) {
        this.time= "No rentable";
        this.investment= "n/a";
   
      }else{

         while (negativeInvestment < 0) {
        lastRemainer = negativeInvestment;
        lastFlow = moneyFlow;
        negativeInvestment += moneyFlow;
        if (negativeInvestment < 0) {
          moneyFlow = moneyFlow * 1.05;
          spectedReturnTimeY++;
        }
      }

      let lastMonths = Math.floor(((lastRemainer * -1) / lastFlow) * 12);
      this.time= `${spectedReturnTimeY} years and ${lastMonths} months`;
      this.investment= investment.totalBudget;
      }

     
    }
}