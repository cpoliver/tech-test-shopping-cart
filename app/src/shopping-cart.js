import ITEMS from './items';

export function getLineItem(itemId, cartItems) {
    const { id, price } = ITEMS[itemId];
    const count = cartItems.filter((itemId) => itemId === id).length;
    const { discount, subtotal } = getLineTotal(id, count, price);

    return { id, count, price, discount, subtotal };
}

export function getLineItems(cartItems) {
    const uniqueItemIds = new Set(cartItems);
    return [...uniqueItemIds].map((itemId) => getLineItem(itemId, cartItems));
}

export function getLineTotal(id, count, price) {
    const discountApplies = id === ITEMS.papaya.id && count >= 3;
    const calculateDiscount = (count) => Math.floor(count / 3) * ITEMS.papaya.price;

    const discount = discountApplies ? calculateDiscount(count) : 0;
    const subtotal = (price * count) - discount;

    return { discount, subtotal };
}

export function getReceipt(cartItems) {
    const lineItems = getLineItems(cartItems);
    const total = getTotalCost(cartItems);

    return { lineItems, total };
}

export function getTotalCost(cartItems) {
    return getLineItems(cartItems).reduce((total, { subtotal }) => subtotal + total, 0);
}
