export class OrderHistory {
  public id: number;
  public orderTrackingNumber: string;
  public totalPrice: number;

  public totalQuantity: number;
  public dateCreated: Date;


  constructor(id: number, orderTrackingNumber: string, totalPrice: number, totalQuantity: number, dateCreated: Date) {
    this.id = id;
    this.orderTrackingNumber = orderTrackingNumber;
    this.totalPrice = totalPrice;
    this.totalQuantity = totalQuantity;
    this.dateCreated = dateCreated;
  }
}
