import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

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
  let deliveryOptions = {};
  DeliveryOptions.forEach(delivery => {
    if(delivery.Id === DeliveryOptionsId) {
      deliveryOptions = delivery
    }
  });
  return deliveryOptions
}

function isWeekend(date) {
  const dayOfWeek = date.format('dddd');
  return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
}

export function calculateDeliveryDate(deliveryOption) {
  let remainingDays = deliveryOption.deliveryDays;
  let deliveryDate = dayjs();

  while (remainingDays > 0) {
    deliveryDate = deliveryDate.add(1, 'day');

    if (!isWeekend(deliveryDate)) {
      remainingDays--;
    }
  }

  const dateString = deliveryDate.format(
    'dddd, MMMM D'
  );

  return dateString;
}