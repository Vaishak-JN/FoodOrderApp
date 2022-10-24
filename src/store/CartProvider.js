import { useReducer } from "react"
import CartContext from "./cart-context"

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {


    if (action.type === "Add") {

        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount

        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id)

        const existingCartItem = state.items[existingCartItemIndex]


        let updatedItems

        if (existingCartItem) {

            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem
        } else {
            updatedItems = state.items.concat(action.item)
        }


        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    if (action.type === "Remove") {
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id)
        const existingItem = state.items[existingCartItemIndex]
        const updatedTotalAmount = state.totalAmount - existingItem.price
        let updatedItems;
        if (existingItem.amount === 1) {
            updatedItems = state.items.filter((item) => item.id !== action.item.id)
        } else {
            const updatedItem = { ...existingItem, amount: existingItem.amount - 1 }
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    return defaultCartState
}

const CartProvider = ({ children }) => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

    const addItemToCartHandler = (item) => {
        dispatchCartAction({ type: "Add", item })
    }

    const removeItemToCartHandler = (item) => {
        dispatchCartAction({ type: "Remove", item })
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemToCartHandler
    }
    return (
        <CartContext.Provider value={cartContext}>
            {children}
        </CartContext.Provider>
    )
}


export default CartProvider