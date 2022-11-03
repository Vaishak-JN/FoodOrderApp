import { useContext, useState } from "react"
import CartContext from "../../store/cart-context"
import Modal from "../UI/Modal"
import classes from "./Cart.module.css"
import CartItem from "./CartItem"
import Checkout from "./Checkout"


const Cart = ({ onShowCart }) => {
    const [showCheckout, setShowCheckout] = useState(false)
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

    const cartItems = <ul className={classes["cart-items"]}>{cartCtx.items.map(item => <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(null, item)} onAdd={cartItemAddHandler.bind(null, item)} />)}</ul>

    const modalActions = <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={onShowCart}>Close</button>
        {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>

    return (
        <Modal onClick={onShowCart}>
            <div>
                {cartItems}
            </div>
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {showCheckout && <Checkout onCancel={cancelHandler} />}
            {!showCheckout && modalActions}
        </Modal>
    )
}

export default Cart