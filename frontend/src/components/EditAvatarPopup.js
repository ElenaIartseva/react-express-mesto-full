import React from 'react';
import { PopupWithForm } from './PopupWithForm.js';
import { useFormWithValidation } from '../hooks/useFormWithValidation.js';

function EditAvatarPopup(props) {
  const { isOpen, onClose, isLoading } = props;
  const {
    values,
    errors,
    isValid,
    handleChange,
    resetForm,
  } = useFormWithValidation({ avatar: '' });

  React.useEffect(() => {
    resetForm({ avatar: '' });
  }, [isOpen, resetForm]);

 function handleSubmit(evt) {
   evt.preventDefault();
   props.onUpdateAvatar({
      avatar: values.avatar,
   });
 }

  return(
    <PopupWithForm name="popup_update-avatar" title="Обновить аватар" isOpen={isOpen} 
        onClose={onClose} buttonText={isLoading ? 'Сохранение...' : 'Сохранить'} onSubmit={handleSubmit} isLoading={isLoading} isSubmitDisabled={!isValid}>
            <label className="popup__field">
              <input
                id="link-inputAvatar"
                name="avatar"
                className="popup__input popup__input_type_link"
                placeholder="Ссылка на картинку"
                type="url"
                required
                value={values.avatar}
                onChange={handleChange}
              />
              <span className="link-input popup__input-error popup__input-error_active">{errors.avatar}</span>
            </label>
        </PopupWithForm>
  )
}

export { EditAvatarPopup };