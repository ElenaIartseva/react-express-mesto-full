import React from 'react';
import { usePopupClose } from '../hooks/usePopupClose.js';

function InfoTooltip(props) {
  const { isOpen, onClose, isSuccess, message } = props;

  usePopupClose(isOpen, onClose);

  return (
    <div className={`popup popup_type_login ${isOpen ? 'popup_type_login_opened' : ''}`}>
      <div className="popup__container popup__container_type_login">
        <button className="popup__close popup__close_login" type="button" onClick={onClose} />
        <div className={`login__image ${isSuccess ? 'login__image_yes' : 'login__image_no'}`} />
        <h3 className="login__paragraph">
          {message || (isSuccess
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.')}
        </h3>
      </div>
    </div>
  );
}

export { InfoTooltip };
