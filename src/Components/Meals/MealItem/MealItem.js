import { useContext } from "react"
import CartContext from "../../../store/cart-context"
import classes from "./MealItem.module.css"
import MealItemForm from "./MealItemForm"


const MealItem = ({ name, description, price, id }) => {

    // const $price = `$${price.toFixed(2)}`

    const cartCtx = useContext(CartContext)

    const addToCartHandler = (amount) => {
        cartCtx.addItem({
            id: id,
            name: name,
            amount: amount,
            price: price
        })
    }
    return (
        <li>
            <div className={classes.meal}>
                <h3>{name}</h3>
                <div className={classes.description}>{description}</div>
                <div className={classes.price}>{price.toFixed(2)}</div>
            </div>
            <div>
                <MealItemForm id={id} onAddToCart={addToCartHandler} />
            </div>
        </li>
    )
}

export default MealItem