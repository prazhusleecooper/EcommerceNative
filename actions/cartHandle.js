import { ADD_TO_CART, CLEAR_ALL_ITEMS, DECREASE_QTY } from '../constants';

export function addToCart(item) {
    return {
        type: ADD_TO_CART,
        payload: item,
    }
}

export function clearAllItems() {
    return {
        type: CLEAR_ALL_ITEMS,
    }
}

export function decreaseQuantity(item) {
    return {
        type: DECREASE_QTY,
        payload: item,
    }
}
