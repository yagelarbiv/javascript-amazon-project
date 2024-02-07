import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export let Orders = JSON.parse(localStorage.getItem("Orders"))

if(!Orders){
  let today = dayjs();
  Orders = [
    {
      OrderId: 1,
      OrderDate: today.format("dddd, MMMM D"),
      OrderTotalCents: 5591,
      OrderItemsId: 
      [
        {
          ItemId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          DeliveryOptionsId: 1
        }
      ]
    },
    {
      OrderId: 2,
      OrderDate: today.format("dddd, MMMM D"),
      OrderTotalCents: 19724,
      OrderItemsId: 
      [
        {
          ItemId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          DeliveryOptionsId: 2
        }
      ]
    }
  ];
}

export function addToOrder(Order) {
  Orders.push(Order); 
  saveOrdersToStorage();
}

function saveOrdersToStorage() {
  localStorage.setItem("Orders", JSON.stringify(Orders));
}