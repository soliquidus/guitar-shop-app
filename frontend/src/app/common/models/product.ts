import {MainModel} from "./mainModel";

export class Product extends MainModel{
  public sku: string;
  public brand: string;
  public name: string;
  public description: string;
  public unitPrice: number;
  public imageUrl: string;
  public active: boolean;
  public unitsInStock: number;
  public dateCreated: Date;
  public lastUpdated: Date;


  constructor(sku: string, brand: string, name: string, description: string, unitPrice: number, imageUrl: string, active: boolean, unitsInStock: number, dateCreated: Date, lastUpdated: Date) {
    super();
    this.sku = sku;
    this.brand = brand;
    this.name = name;
    this.description = description;
    this.unitPrice = unitPrice;
    this.imageUrl = imageUrl;
    this.active = active;
    this.unitsInStock = unitsInStock;
    this.dateCreated = dateCreated;
    this.lastUpdated = lastUpdated;
  }
}
