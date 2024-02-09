import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export class Orders{
  today = dayjs();
  static OrdersInstance = [];
  constructor(OrderId, TotalCents, OrderItemsId) {
    this.OrderId = OrderId;
    this.OrderDate = today.format("dddd, MMMM D");
    this.OrderTotalCents = TotalCents;
    this.OrderItemsId = OrderItemsId;
    this.AddOrders(this.OrderId, this.OrderDate, this.OrderTotalCents, this.OrderItemsId);
    
  }
  AddOrders(OrderId, OrderDate, OrderTotalCents, OrderItemsId){
    Orders.OrdersInstance.push({OrderId, OrderDate, OrderTotalCents, OrderItemsId});
    saveOrdersToStorage();
  }
}

function saveOrdersToStorage() {
  localStorage.setItem("Orders", JSON.stringify(Orders.OrdersInstance));
}