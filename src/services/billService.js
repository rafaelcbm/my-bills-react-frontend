import { formatCurrency, formatDate } from '../util/format-util';

export function transformToForm(bill, categories, wallets) {
  const newBill = { ...bill };
  newBill.formattedDate = formatDate(newBill.date);
  newBill.formattedValue = formatCurrency(newBill.value);
  newBill.category = categories.find((c) => c.id === newBill.categoryId).name;
  newBill.wallet = wallets.find((w) => w.id === newBill.walletId).name;

  if (Object.keys(newBill.periodicity).length > 0) {
    newBill.isPeriodic = true;
    newBill.type = newBill.periodicity.type;
    newBill.interval = newBill.periodicity.interval;
    newBill.part = newBill.periodicity.part;
    newBill.endPart = newBill.periodicity.endPart;
  } else {
    newBill.isPeriodic = false;
    newBill.type = -1;
    newBill.interval = 0;
    newBill.part = 0;
    newBill.endPart = 0;
  }

  return newBill;
}

export function transformToSend(bill) {
  const newBill = {
    ...bill,
    value: +bill.value,
    periodicity: bill.isPeriodic ? {
      type: +bill.type,
      interval: +bill.interval,
      part: +bill.part,
      endPart: +bill.endPart
    } : {}
  };

  delete newBill.isPeriodic;
  delete newBill.type;
  delete newBill.interval;
  delete newBill.part;
  delete newBill.endPart;
  delete newBill.category;
  delete newBill.wallet;
  delete newBill.formattedDate;
  delete newBill.formattedValue;

  return newBill;
}
