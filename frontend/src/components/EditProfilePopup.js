import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { PopupWithForm } from './PopupWithForm.js';
import { useFormWithValidation } from '../hooks/useFormWithValidation.js';

function EditProfilePopup(props) {
  const { isOpen, onClose, isLoading } = props;

  // подписываемся на CurrentUserContext и получаем значение контекста
  const currentUser = React.useContext(CurrentUserContext); 
  const {
    values,
    errors,
    isValid,
    handleChange,
    resetForm,
  } = useFormWithValidation({ name: '', about: '' });

  // после загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах
  React.useEffect(() => {
    const name = currentUser?.name ?? '';
    const about = currentUser?.about ?? '';
    resetForm({ name, about }, {}, Boolean(name && about));
  }, [currentUser, isOpen, resetForm]);

  function handleSubmit(evt) {
    evt.preventDefault();

      // передаём значения управляемых компонентов во внешний обработчик
      props.onUpdateUser({ name: values.name, about: values.about });
  };

  return (
    // значение элемента «привязывается» к значению стейта
    <PopupWithForm name="popup_edit-profile" title="Редактировать профиль" isOpen={isOpen} 
        onClose={onClose} buttonText={isLoading ? 'Сохранение...' : 'Сохранить'} onSubmit={handleSubmit} isLoading={isLoading} isSubmitDisabled={!isValid}> 
            <label className="popup__field">
              <input 
                id="name-input"
                type="text"
                name="name"
                className="popup__input popup__input_type_name"
                placeholder="Имя"
                minLength={2}
                maxLength={30}
                required
                value={values.name}
                onChange={handleChange}
            />
            <span className="name-input popup__input-error popup__input-error_active">{errors.name}</span>
            </label>
            <label className="popup__field">
              <input
                  id="profession-input"
                  type="text"
                  name="about"
                  className="popup__input popup__input_type_profession"
                  placeholder="Вид деятельности"
                  minLength={2}
                  maxLength={30}
                  required
                  value={values.about}
                  onChange={handleChange}
              />
            <span className="profession-input popup__input-error popup__input-error_active">{errors.about}</span>
            </label>
        </PopupWithForm>
  )
};

export { EditProfilePopup };