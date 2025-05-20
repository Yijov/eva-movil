import { generateUniqueString } from "../utils";

export class Asset {
    constructor(
      public id: string = generateUniqueString(),
      public name: string,
      public cost: number,
      public quantity: number,
      public type: "fixed" | "current" | "finantial" | "intangible",
      public description: string
    ) {}
  
    get totalCost(): number {
      return this.cost * this.quantity;
    }

    toJSON() {
      return {
        id: this.id,
        name: this.name,
        cost: this.cost,
        quantity: this.quantity,
        type: this.type,
        description: this.description
      };
    }
  
    static fromJSON(json: any): Asset {
      return new Asset(
        json.id,
        json.name,
        json.cost,
        json.quantity,
        json.type,
        json.description
      );
    }
  }