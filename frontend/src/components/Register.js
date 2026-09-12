import React from 'react';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../hooks/useFormWithValidation.js';

// компонент авторизации пользователя с необходимыми стейт-переменными
// компонент практически полностью дублирует логику компонента выше, 
// но при сабмите форма вызывает другую функцию 
// она отправляет данные через функцию регистрации и получает ответ что все ок, или не совсем

const Register = (props) => {

  const { onRegister } = props;
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

    onRegister({ email: values.email, password: values.password }) // сюда попадают данные из инпутов
  };
    

  return (
    <div className="register"> 
    <div className="login__container">
      <h3 className="popup__header login__header">Регистрация</h3>
      <form action="#" name="register" className="popup__form"
        noValidate
        onSubmit={handleSubmit}
      >
         <label className="popup__field">
        <input id="email-register-input" type="email" name="email"
          className="popup__input popup__input_type_login login__input"
          placeholder="Email" required
          value={values.email}
          onChange={handleChange}
        />
        <span className="email-input popup__input-error popup__input-error_active">{errors.email}</span>
      </label>
      <label className="popup__field">
        <input id="password-register-input" name="password"
          className="popup__input popup__input_type_password login__input"
          placeholder="Пароль" type="password" minLength={6} required
          value={values.password}
          onChange={handleChange}
        />
        <span className="password-input popup__input-error popup__input-error_active">{errors.password}</span>
      </label> 
        <button name="button" type="submit" 
          disabled={!isValid}
          className={`popup__save login__button popup__save_register ${!isValid ? 'popup__save_inactive' : ''}`}>Зарегистрироваться</button>
        <h3 className="login__text">Уже зарегистрированы? <Link to="/sign-in" className="login__link">Войти</Link></h3>
      </form> 
    </div>
  </div>
  )
};

export { Register };