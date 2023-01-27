import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePlacePopup(props) {
    function handleSubmit(e) {
        e.preventDefault();

        props.onConfirmDelete(props.card);
    }

    return (
        <PopupWithForm
            name="delete_card"
            title="Вы уверены?"
            buttonText="Да"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}>
        </PopupWithForm>
    )
}

export default ConfirmDeletePlacePopup;