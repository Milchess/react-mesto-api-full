import React from "react";
import goodImg from '../images/goodRegistration.svg';
import badImg from '../images/badRegistration.svg';

function InfoTooltip({tooltipStatus, onClose, isOpen}) {
    const icon = tooltipStatus === 'success' ? `${goodImg}` : `${badImg}`;
    const text = tooltipStatus === 'success' ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.';

    return (
            <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
                <div className='popup__container-tooltip'>
                    <img src={icon} className='popup-registration__image' alt={text}></img>
                    <p className='popup-registration__text'>{text}</p>
                    <button
                        aria-label="Закрыть"
                        className="popup__button-close"
                        type="button"
                        onClick={onClose}></button>
                </div>
            </div>
    )
}

export default InfoTooltip;