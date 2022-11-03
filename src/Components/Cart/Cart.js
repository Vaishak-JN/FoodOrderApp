import { useContext, useState } from "react"
import CartContext from "../../store/cart-context"
import Modal from "../UI/Modal"
import classes from "./Cart.module.css"
import CartItem from "./CartItem"
import Checkout from "./Checkout"


const Cart = ({ onShowCart }) => {
    const [showCheckout, setShowCheckout] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [didSubmit, setDidSubmit] = useState(false)
    const cartCtx = useContext(CartContext)

    const hasItems = cartCtx.items.length > 0
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 })
    }
    const cartItemRemoveHandler = (item) => {
        cartCtx.removeItem({ ...item })
    }

    const orderHandler = () => {
        setShowCheckout(true)
    }

    const cancelHandler = () => {
        setShowCheckout(false)
    }

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true)
        const res = await fetch("https://foodorderapp-f97de-default-rtdb.firebaseio.com/orders.json", {
            method: "POST",
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        })
        setIsSubmitting(false)
        setDidSubmit(true)
        cartCtx.clearCart()
    }

    const cartItems = <ul className={classes["cart-items"]}>{cartCtx.items.map(item => <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(null, item)} onAdd={cartItemAddHandler.bind(null, item)} />)}</ul>

    const modalActions = <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={onShowCart}>Close</button>
        {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>


    const cartModalContent = <>
        <div>
            {cartItems}
        </div>
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {showCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={cancelHandler} />}
        {!showCheckout && modalActions}
    </>

    const isSubmittingModalContent = <p>Ordering...</p>

    const didSubmitModalContent = <div className={classes.actions}>
        <p style={{ "text-align": "left" }}>Order Successfull. Happy Eating!!!</p>
        <button className={classes.button} onClick={onShowCart}>Close</button>
    </div>


    return (
        <Modal onClick={onShowCart}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {didSubmit && didSubmitModalContent}
        </Modal>
    )
}

export default Cart