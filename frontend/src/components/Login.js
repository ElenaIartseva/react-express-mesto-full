import React from 'react';
import { useFormWithValidation } from '../hooks/useFormWithValidation.js';

// компонент авторизации пользователя с необходимыми стейт-переменными
// из себя представляет форму где пользователь вводит данные (почту и пароль) 
// и передает их в функцию отправки на сервер 
// сама функция должна быть описана выше, на уровне app.js
const Login = (props) => {
  const { onLogin } = props;
  const {
    values,
    errors,
    isValid,
    handleChange,
  } = useFormWithValidation({ email: '', password: '' });

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (!isValid) {
      return;
    }
 
    onLogin({ email: values.email, password: values.password }) // сюда попадают данные из инпутов
  };
 
  return (
    <div className="login"> 
    <div className="login__container">
      <h3 className="popup__header login__header">Вход</h3>
      <form action="#" name="login" className="popup__form"
        noValidate
        onSubmit={handleSubmit}
      >
         <label className="popup__field">
        <input id="email-login-input" type="email" name="email"
          className="popup__input popup__input_type_login login__input"
          placeholder="Email" required
          value={values.email}
          onChange={handleChange}
        />
        <span className="email-input popup__input-error popup__input-error_active">{errors.email}</span>
      </label>
      <label className="popup__field">
        <input id="password-login-input" name="password"
          className="popup__input popup__input_type_password login__input"
          placeholder="Пароль" type="password" minLength={6} required
          value={values.password}
          onChange={handleChange}
        />
        <span className="password-input popup__input-error popup__input-error_active">{errors.password}</span>
      </label> 
        <button name="button" type="submit"
            disabled={!isValid}
            className={`popup__save login__button popup__save_login ${!isValid ? 'popup__save_inactive' : ''}`}>Войти</button>
      </form> 
    </div>
  </div>
  )
};

export { Login };