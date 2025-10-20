export const initialState ={
    cart:[],
    isCartOpen: false,
    isCartSyncing: false,
    error:''
};

export const cartActions ={
    OPEN: 'open',
    CLOSE: 'close',
    ADD_ITEM: 'addItem',
    UPDATE_CART: 'updateCart',
    ERROR: 'error',
    SYNC: 'sync',
    NOT_SYNCING: 'notSyncing'
};

export function cartReducer(state, action){
    switch(action.type){
        case cartActions.OPEN:
            return{...state, isCartOpen: true};
        case cartActions.CLOSE:
            return{...state, isCartOpen: false};
        case cartActions.ADD_ITEM:{
            const item = action.inventory.find( i =>i.id === action.id);
            if(!item) return state;

            const existing = state.cart.find( i => i.id === action.id);
            const updatedItem = existing ?{...existing, quantity: existing.quantity +1}: {...item, quantity: 1};

            return{
                ...state,
                cart:[
                    ...state.cart.filter(i => i.productId !== action.id),
                    updatedItem
                ]
            };

        }
        case cartActions.UPDATE_CART:
            return{...state, cart: action.cart};
        case cartActions.ERROR:
            return{...state, error: action.error};
        case cartActions.SYNC:
            return{...state, isCartSyncing: true};
        case cartActions.NOT_SYNCING:
        return {...state, isCartSyncing: false}
    default:
        return state;
    }
}