import { Fragment, useEffect } from "react"
import { createPortal } from "react-dom"
import classes from "./Modal.module.css"

const Backdrop = ({ onShow }) => {

    return (
        <div className={classes.backdrop} onClick={onShow} />
    )
}

const ModalOverlay = ({ children }) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>
                {children}
            </div>
        </div>
    )
}

const portalElement = document.getElementById("overlays")

const Modal = ({ children, onClick }) => {

    useEffect(() => {
        document.body.style.overflow = "hidden"

        return () => {
            document.body.style.overflow = "scroll"
        }
    }, [])

    return (
        <Fragment>
            {createPortal(<Backdrop onShow={onClick} />, portalElement)}

            {createPortal(<ModalOverlay>{children}</ModalOverlay>, portalElement)}


        </Fragment>
    )
}

export default Modal