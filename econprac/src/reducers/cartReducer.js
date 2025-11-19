// Cart reducer: pure functions to manage cart state.
// Exports:
// - cartReducer: reducer function to pass to React's useReducer
// - initialCartState: the default state shape
// - ACTIONS: constants for action.type values
//
// Reducer responsibilities:
// - Maintain `cart` array of items. Each item shape: { cartId, id, title, price, image, quantity, ... }
// - Maintain `total` (number) computed from cart contents.
// - Support common actions: add, remove, update quantity, clear, set cart, set loading/error.

const ACTIONS = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    UPDATE_QUANTITY: 'UPDATE_QUANTITY',
    CLEAR_CART: 'CLEAR_CART',
    SET_CART: 'SET_CART',
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
};

const initialCartState = {
    cart: [],
    total: 0,
    loading: false,
    error: null,
};

// Helper to compute total. Note: UI in this project multiplies price by 100 for display (Ksh),
// but the reducer stores and sums raw `price` values. If you want the same convention,
// apply the *100 multiplication where you render prices instead of here.
function calculateTotal(cart) {
    return cart.reduce((sum, item) => sum + (Number(item.price || 0) * Number(item.quantity || 0)), 0);
}

function cartReducer(state, action) {
    switch (action.type) {
        case ACTIONS.ADD_TO_CART: {
            const product = action.payload;
            if (!product || !product.id) return state;

            // If an item with same product id exists, increment its quantity.
            const existing = state.cart.find(i => i.id === product.id);
            let newCart;
            if (existing) {
                newCart = state.cart.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
            } else {
                newCart = [...state.cart, { cartId: Date.now().toString(), ...product, quantity: 1 }];
            }

            return { ...state, cart: newCart, total: calculateTotal(newCart), loading: false, error: null };
        }

        case ACTIONS.REMOVE_FROM_CART: {
            // payload may be { cartId } or { id }
            const { cartId, id } = action.payload || {};
            const newCart = state.cart.filter(i => (cartId ? i.cartId !== cartId : i.id !== id));
            return { ...state, cart: newCart, total: calculateTotal(newCart) };
        }

        case ACTIONS.UPDATE_QUANTITY: {
            // payload: { cartId, quantity } or { id, quantity }
            const { cartId, id, quantity } = action.payload || {};
            if (typeof quantity !== 'number') return state;

            let updated = state.cart.map(i => {
                if (cartId && i.cartId === cartId) return { ...i, quantity };
                if (!cartId && id && i.id === id) return { ...i, quantity };
                return i;
            }).filter(i => i.quantity > 0);

            return { ...state, cart: updated, total: calculateTotal(updated) };
        }

        case ACTIONS.CLEAR_CART: {
            return { ...state, cart: [], total: 0 };
        }

        case ACTIONS.SET_CART: {
            // payload: array of cart items
            const newCart = Array.isArray(action.payload) ? action.payload : [];
            return { ...state, cart: newCart, total: calculateTotal(newCart) };
        }

        case ACTIONS.SET_LOADING: {
            return { ...state, loading: !!action.payload };
        }

        case ACTIONS.SET_ERROR: {
            return { ...state, error: action.payload || null };
        }

        default:
            return state;
    }
}

export { cartReducer, initialCartState, ACTIONS };

// Usage example (in a component):
// const [state, dispatch] = useReducer(cartReducer, initialCartState);
// dispatch({ type: ACTIONS.ADD_TO_CART, payload: product });
// dispatch({ type: ACTIONS.UPDATE_QUANTITY, payload: { cartId, quantity: 2 } });
// dispatch({ type: ACTIONS.REMOVE_FROM_CART, payload: { cartId } });