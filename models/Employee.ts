import { generateUniqueString } from "../utils";

export class Employee {
    constructor(
      public id: string = generateUniqueString(),
      public position:string,
      public headCount:number,
      public positionMonthlySalary: number,
      public jobDescription:string = "-",
      public contractType:string = "fijo",
      public paymentFrecuency:string = "monthly",
      public department:string = "-",
    ) {}
    get totalSalaryExpense(){
        return this.positionMonthlySalary * this.headCount;
    }
    toJSON() {
      return {
        id: this.id,
        position: this.position,
        headCount: this.headCount,
        positionMonthlySalary: this.positionMonthlySalary,
        jobDescription: this.jobDescription,
        contractType: this.contractType,
        paymentFrecuency: this.paymentFrecuency,
        department: this.department
      };
    }
  
    static fromJSON(json: any): Employee {
      return new Employee(
        json.id,
        json.position,
        json.headCount,
        json.positionMonthlySalary,
        json.jobDescription,
        json.contractType,
        json.paymentFrecuency,
        json.department
      );
    }

    
  }