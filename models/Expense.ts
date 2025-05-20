import { generateUniqueString } from "../utils";

export class Expense {
  constructor(
    public id: string = generateUniqueString(),
    public name: string,
    public amount: number,
    public type: "service" | "good" = "good"
  ) {}

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      amount: this.amount,
      type: this.type
    };
  }

  static fromJSON(json: any): Expense {
    return new Expense(json.id, json.name, json.amount, json.type);
  }
}


