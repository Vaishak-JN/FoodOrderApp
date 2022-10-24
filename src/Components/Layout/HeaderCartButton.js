import { useContext, useEffect, useState } from "react"
import CartContext from "../../store/cart-context"
import CartIcon from "../Cart/CartIcon"
import classes from "./HeaderCartButton.module.css"

const HeaderCartButton = ({ onClick }) => {
    const [btnBump, setBtnBump] = useState(false)
    const cartCtx = useContext(CartContext)
    const { items } = cartCtx

    const numberOfCartItrems = items.reduce((curNum, item) => {
        return curNum + item.amount
    }, 0)

    const btnClasses = `${classes.button} ${btnBump && classes.bump}`
    useEffect(() => {
        if (items.length === 0) return
        setBtnBump(true)

        const timer = setTimeout(() => {
            setBtnBump(false)
        }, 300)

        return () => {
            clearTimeout(timer)
        }
    }, [items])
    return (
        <button className={btnClasses} onClick={onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>
                {numberOfCartItrems}
            </span>
        </button>
    )
}


export default HeaderCartButton