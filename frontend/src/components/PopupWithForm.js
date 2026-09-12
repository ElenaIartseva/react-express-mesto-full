import React from 'react';
import { usePopupClose } from '../hooks/usePopupClose.js';

function PopupWithForm(props) {
  // протягиваем сюда isOpen, onClose, чтобы использовать
  const {
    isOpen,
    onClose,
    onSubmit,
    isLoading = false,
    isSubmitDisabled = false,
  } = props;
  const isButtonDisabled = isLoading || isSubmitDisabled;

  // используем в любом компоненте (попапе), которому нужно установить эти обработчики
  usePopupClose(isOpen, onClose);

  // если попап isOpen то добавляем класс popup_opened
  return (
    <div className={`popup popup_type_${props.name} ${isOpen ?'popup_opened':''}`}> 
      <div className="popup__container">
        <button className="popup__close" type="reset" onClick={onClose}/>
        <h3 className="popup__header" >{props.title}</h3>
        <form
          action="#"
          name={`${props.name}`}
          className="popup__form"
          noValidate
          onSubmit={onSubmit}
        >
           {props.children} 
          <button
              name="button"
              type="submit"
              disabled={isButtonDisabled}
              className={`popup__save popup__save_${props.name} ${isButtonDisabled ? 'popup__save_inactive' : ''}`}> 
                {props.buttonText}
          </button>
        </form> 
      </div>
    </div>
  )
};

export { PopupWithForm };