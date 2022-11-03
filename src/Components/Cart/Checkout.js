import classes from "./Checkout.module.css"
import { useRef, useState } from "react"

const isEmpty = val => val.trim() === ""
const isFiveChars = val => val.trim().length === 5

const Checkout = ({ onCancel, onConfirm }) => {

    const [formInputsValidity, setFormInutsValidity] = useState({
        name: true,
        street: true,
        city: true,
        pin: true
    })

    const nameInputRef = useRef()
    const streetInputRef = useRef()
    const pinInputRef = useRef()
    const cityInputRef = useRef()

    const confirmHandler = (e) => {
        e.preventDefault()
        const enteredName = nameInputRef.current.value
        const enteredStreet = streetInputRef.current.value
        const enteredPin = pinInputRef.current.value
        const enteredCity = cityInputRef.current.value

        const enteredNameIsValid = !isEmpty(enteredName)
        const enteredStreetIsValid = !isEmpty(enteredStreet)
        const enteredCityIsValid = !isEmpty(enteredCity)
        const enteredPinIsValid = isFiveChars(enteredPin)

        setFormInutsValidity({
            name: enteredNameIsValid,
            city: enteredCityIsValid,
            pin: enteredPinIsValid,
            street: enteredStreetIsValid
        })

        const formIsValid = enteredNameIsValid && enteredCityIsValid && enteredPinIsValid && enteredStreetIsValid


        if (!formIsValid) {
            return
        }

        onConfirm({
            name: enteredName,
            street: enteredStreet,
            pin: enteredPin,
            city: enteredCity
        })
    }
    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={`${classes.control} ${formInputsValidity.name ? "" : classes.invalid}`}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef} />
                {!formInputsValidity.name && <p>Please enter a valid name!</p>}
            </div>
            <div className={`${classes.control} ${formInputsValidity.street ? "" : classes.invalid}`}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetInputRef} />
                {!formInputsValidity.street && <p>Please enter a valid street!</p>}
            </div>
            <div className={`${classes.control} ${formInputsValidity.pin ? "" : classes.invalid}`}>
                <label htmlFor='pincode'>Pincode Code</label>
                <input type='text' id='pincode' ref={pinInputRef} />
                {!formInputsValidity.pin && <p>Please enter a valid pincode!</p>}
            </div>
            <div className={`${classes.control} ${formInputsValidity.city ? "" : classes.invalid}`}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInputRef} />
                {!formInputsValidity.city && <p>Please enter a valid city!</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    )
}

export default Checkout