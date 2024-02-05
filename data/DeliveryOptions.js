export const DeliveryOptions = [
  {
    Id: '1',
    DeliveryDays: 7,
    priceCents: 0,
  },
  {
    Id: '2',
    DeliveryDays: 3,
    priceCents: 499,
  },
  {
    Id: '3',
    DeliveryDays: 1,
    priceCents: 999,
  }
]

export function getDeliveryOptions(DeliveryOptionsId) {
  let deliveryOptions;
  DeliveryOptions.forEach(delivery => {
    if(delivery.Id === DeliveryOptionsId) {
      deliveryOptions = delivery
    }
  });
  return deliveryOptions
}