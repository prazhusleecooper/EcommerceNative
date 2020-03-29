import { ADD_TO_CART, CLEAR_ALL_ITEMS, DECREASE_QTY } from '../constants';

const initialState = {
    addedItems: []
};


export const reducer = (state=initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART: {
            console.log(':::ADD TO CART HIT:::', action.payload);
            if(state.addedItems === [] || state.addedItems.length === 0) {
                state.addedItems.push(action.payload);
                return state;
            } else if(state.addedItems !== [] || state.addedItems.length !== 0) {
                let itemExists = false;
                state.addedItems.map((item, index) => {
                    if(item.uid === action.payload.uid) {
                        itemExists = true;
                        item.quantity += 1;
                        item.total_price = item.quantity * item.price;
                    }
                    return '';
                });
                if(itemExists === false) {
                    state.addedItems.push(action.payload);
                }
            }
            console.log('REDUX STATE:::', state.addedItems);
            return state;
        }

        case CLEAR_ALL_ITEMS: {
            state.addedItems = [];
            return state;
        }

        case DECREASE_QTY: {
            console.log(':::DECREASE QTY HIT:::', action.payload);
            state.addedItems.map((item, index = 0) => {
                if(item.uid === action.payload.uid) {
                    let tempArr = state;
                    if(tempArr[index].quantity === 1) {
                        tempArr.splice(index, 1);
                        state.addedItems = tempArr;
                    } else if(tempArr[index].quantity > 1) {
                        tempArr[index].quantity -= 1;
                        tempArr[index].total_price = tempArr[index].quantity * tempArr[index].price;
                        state.addedItems = tempArr;
                    }
                }
                return '';
            });
            return state;
        }

        default: {
            return state;
        }
    }
};
