import { useEffect, useId, useRef, useState } from 'react';
import DatePicker from 'react-multi-date-picker';
import './Input.scss';

export default function Input({
   type,
   label,
   name,
   id,
   icon,
   placeholder,
   isDisabled,
   setValue,
   errors,
   setInputValidation,
   minDate = null
}) {
   const [isFocus, setFocus] = useState(false);
   const [isInvalid, setInvalid] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');
   const [startDate, setStartDate] = useState('');
   const [endDate, setEndDate] = useState('');

   const inputRef = useRef();

   const inputId = useId();

   const handleFocus = $event => {
      setFocus(true);
   };
   const handleBlur = $event => {
      setFocus(false);
   };

   const handleStartDateChange = date => {
      setStartDate(date);
      if (endDate && date > endDate) {
         setEndDate(date);
      }
   };
   
   const handleEndDateChange = date => {
      setEndDate(date);
      if (date < startDate) {
         setStartDate(date);
      }
   };

   const handleChangeInput = $event => {
      const error = errors
         .map(validationError => validationError($event.target.value, name))
         .reduce((messages, error) => `${error ? error + '.' : ''} ${messages} `, '');
      if (!Boolean(error.trim())) {
         setValue($event.target.value);
         setInvalid(false);
         setInputValidation(true);
      } else {
         setErrorMessage(error);
         setInvalid(true);
         setInputValidation(false);
      }
   };

   useEffect(() => {
      const input = inputRef && inputRef.current && inputRef.current.firstChild;
      if (input) {
         input.addEventListener('focus', handleFocus);
         input.addEventListener('blur', handleBlur);
      }

      return () => {
         if (input) {
            input.removeEventListener('focus', handleFocus);
            input.removeEventListener('blur', handleBlur);
         }
      };
   }, []);

   return (
      <div className="input">
         {label ? (
            <label className="input-label" htmlFor={id}>
               {label}
            </label>
         ) : null}
         <div
            className={`input-wrapper ${isFocus ? 'focus' : ''} ${isInvalid ? 'invalid' : ''} ${isDisabled ? 'disabled' : '' }`}>
            {icon ? <span className="input-icon">{icon}</span> : null}

            {type === 'date-picker' ? (
               <div className="date-picker">
                  <DatePicker
                     onChange={handleStartDateChange}
                     ref={inputRef}
                     placeholder={'Fecha de inicio'}
                     minDate={minDate}
                     value={startDate}
                  />
                  <DatePicker
                     onChange={handleEndDateChange}
                     placeholder={'Fecha de salida'}
                     minDate={minDate}
                     value={endDate}
                  />
               </div>
            ) : (
               <input
                  key={id}
                  id={id}
                  type={type}
                  placeholder={placeholder}
                  disabled={isDisabled}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChange={handleChangeInput}
               />
            )}
         </div>
         {errorMessage && isInvalid ? <div className="input-error">{errorMessage}</div> : null}
      </div>
   );
}