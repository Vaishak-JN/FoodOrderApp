import { useRef, useState } from "react"
import Input from "../../UI/Input"
import classes from "./MealItemForm.module.css"

const MealItemForm = ({ id, onAddToCart }) => {

    const [amountIsValid, setAmountIsValid] = useState(true)
    const amountInputRef = useRef()

    const submitHandler = (event) => {
        event.preventDefault()

        const enteredAmount = amountInputRef.current.value
        const enteredAmountNumber = +enteredAmount

        if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
            setAmountIsValid(false)
            return
        }

        onAddToCart(enteredAmountNumber)
    }
    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input label="Amount" input={{ id: id, type: "number", min: "1", max: "5", step: "1", defaultValue: "1" }} ref={amountInputRef} />
            <button>+ Add</button>
            {!amountIsValid && <p>Please enter an amount between 1 and 5</p>}
        </form>
    )
}

export default MealItemForm
