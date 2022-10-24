import { useContext } from "react"
import CartContext from "../../store/cart-context"
import Modal from "../UI/Modal"
import classes from "./Cart.module.css"
import CartItem from "./CartItem"


const Cart = ({ onShowCart }) => {

    const cartCtx = useContext(CartContext)

    const hasItems = cartCtx.items.length > 0
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 })
    }
    const cartItemRemoveHandler = (item) => {
        cartCtx.removeItem({ ...item })
    }

    const cartItems = <ul className={classes["cart-items"]}>{cartCtx.items.map(item => <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(null, item)} onAdd={cartItemAddHandler.bind(null, item)} />)}</ul>

    return (
        <Modal onClick={onShowCart}>
            <div>
                {cartItems}
            </div>
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes["button--alt"]} onClick={onShowCart}>Close</button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    )
}

export default Cart