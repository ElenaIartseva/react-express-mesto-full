import React from 'react';
import { PopupWithForm } from './PopupWithForm.js';
import { useFormWithValidation } from '../hooks/useFormWithValidation.js';


function AddPlacePopup(props) {
  const { isOpen, onClose, isLoading } = props;
  const {
    values,
    errors,
    isValid,
    handleChange,
    resetForm,
  } = useFormWithValidation({ name: '', link: '' });

  // очищение инпутов после успешного добавления карточки,  для того чтобы пользователь мог сразу же 
  // еще раз добавить что-то новое и ему не пришлось бы очищать инпуты вручную перед этим
  React.useEffect(() => {
    resetForm({ name: '', link: '' });
  }, [isOpen, resetForm]);

  const handleSubmit = (evt) => {
    // запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    // передаём значения управляемых компонентов во внешний обработчик
    props.onAddPlace({ name: values.name, link: values.link });
  };

  return (
  <PopupWithForm name="popup_add-image" title="Новое место" isOpen={isOpen} 
  onClose={onClose} buttonText={isLoading ? 'Сохранение...' : 'Сохранить'} onSubmit={handleSubmit} isLoading={isLoading} isSubmitDisabled={!isValid}>
      <label className="popup__field">
        <input
          id="place-input"
          type="text"
          name="name"
          className="popup__input popup__input_type_place"
          placeholder="Название"
          minLength={2}
          maxLength={30}
          required
          value={values.name}
          onChange={handleChange}
        />
        <span className="place-input popup__input-error popup__input-error_active">{errors.name}</span>
      </label>
      <label className="popup__field">
        <input
          id="link-input"
          name="link"
          className="popup__input popup__input_type_link"
          placeholder="Ссылка на картинку"
          type="url"
          required
          value={values.link}
          onChange={handleChange}
        />
        <span className="link-input popup__input-error popup__input-error_active">{errors.link}</span>
      </label>
  </PopupWithForm>
)};


export { AddPlacePopup };
