import { generateUniqueString } from "../utils";


export class Product{
    private price:number=0;
    constructor(
       public id: string = generateUniqueString(),
       public name:string,
       public cost: number,
       public estimateMonthlyUnitSales: number,
       public taxPercent: number = 18,
       private pricing:"percentage based"|"cost based"="cost based",
       revenue:number,
      ){
        if(this.pricing==="percentage based"){
            this.setBasePriceByPercent(revenue)
        }else{
            this.setBasePriceByCost(revenue)
        }
      }

      get unitTaxAmmount(){
        return this.price * (this.taxPercent / 100);
      }
      get unitNetPrice() {
        return this.price + this.unitTaxAmmount;
      }

      
      get unitGrossMargin(){
        return  this.unitNetPrice - this.cost - this.unitTaxAmmount;
      }
      get unitGrossMarginPercent(){
        return (this.unitGrossMargin / this.unitNetPrice) * 100;
      }
      get estimateMonthlySalesAmmount(){
        return this.price * this.estimateMonthlyUnitSales
      }

      get estimateMonthlyGrossSalesAmmount(){
        return this.unitNetPrice * this.estimateMonthlyUnitSales;
      }

      get monthlySalesTax(){
        return this.unitTaxAmmount * this.estimateMonthlyUnitSales;
      }

      get monthlySalesCost(){
        return this.cost * this.estimateMonthlyUnitSales;
      }

      get estimateYearlyGrossSaleAmount(){
        return this.estimateMonthlyGrossSalesAmmount * 12;
      }
      setBasePriceByPercent(value:number){
        const percent= value < 1 ? value: value / 100
        this.price= this.cost/ (1-percent)
      }
      setBasePriceByCost(value:number){
        this.price=this.cost+ value
      }

      getParticipation (totalProjectionUnits:number){
        return (this.estimateMonthlyUnitSales / totalProjectionUnits) * 100;
      }

      getPonderateMargin (totalProjectionUnits:number){
        return  (this.estimateMonthlyUnitSales / totalProjectionUnits) *
        this.unitGrossMargin;
      }


      toJSON() {
        return {
          id: this.id,
          name: this.name,
          cost: this.cost,
          estimateMonthlyUnitSales: this.estimateMonthlyUnitSales,
          taxPercent: this.taxPercent,
          pricing: this.pricing,
          price: this.price // manually add private field for restoration
        };
      }
    
      static fromJSON(json: any): Product {
        const product = new Product(
          json.id,
          json.name,
          json.cost,
          json.estimateMonthlyUnitSales,
          json.taxPercent,
          json.pricing,
          0 // dummy revenue, we'll overwrite price manually
        );
        product.price = json.price; // manually restore private field
        return product;
      }


}
  