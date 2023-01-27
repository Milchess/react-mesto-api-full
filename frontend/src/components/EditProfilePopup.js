import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const[name, setName] = useState('');
    const[description, setDescription] = useState('');

    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser.about, currentUser.name, isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
    <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        buttonText="Сохранить"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}>
        <input
            className="popup__user popup__user_type_name"
            maxLength="40"
            minLength="2"
            name="name"
            placeholder="Имя"
            required
            type="text"
            onChange={handleChangeName}
            value={name || ''}/>
        <span className="popup__error name-error"></span>
        <input
            className="popup__user popup__user_type_vocation"
            maxLength="200"
            minLength="2"
            name="about"
            placeholder="Род деятельности"
            required
            type="text"
            onChange={handleChangeDescription}
            value={description || ''}/>
        <span className="popup__error about-error"></span>
    </PopupWithForm>
    )
}

export default EditProfilePopup;