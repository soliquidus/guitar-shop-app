import {Customer} from "./customer";
import {Address} from "./address";
import {Order} from "./order";
import {OrderItem} from "./orderItem";

export class Purchase {
  customer: Customer;
  shippingAddress: Address;
  billingAddress: Address;
  order: Order;
  orderItems: OrderItem[];


  constructor(customer: Customer, shippingAddress: Address, billingAddress: Address, order: Order, orderItems: OrderItem[]) {
    this.customer = customer;
    this.shippingAddress = shippingAddress;
    this.billingAddress = billingAddress;
    this.order = order;
    this.orderItems = orderItems;
  }
}
