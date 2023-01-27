import React from "react"

function PopupWithForm(props) {
    return (
        <div className={`popup popup-${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container">
                <h3 className="popup__title">{props.title}</h3>
                <form
                    className="popup__form"
                    name={`popup-form-${props.name}`}
                    onSubmit={props.onSubmit}>
                    {props.children}
                    <button className="popup__submit" type="submit">{props.buttonText}</button>
                </form>
                <button
                    aria-label="Закрыть"
                    className="popup__button-close"
                    type="button"
                    onClick={props.onClose}></button>
            </div>
        </div>
    )
}

export default PopupWithForm;
