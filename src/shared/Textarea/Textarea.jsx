import { useState,useRef,useEffect } from "react";
import "./Textarea.scss"

export default function Textarea({ 
    label,
    name,
    id,
    placeholder,
    isDisabled,
    setValue,
    errors,
    setInputValidation,
}){
    const [isFocus, setFocus] = useState(false);
    const [isInvalid, setInvalid] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const inputRef = useRef();

    const handleFocus = () => {
        setFocus(true);
    };
    const handleBlur = () => {
        setFocus(false);
    };
    const handleChangeInput = e => {
        const error = errors
           .map(validationError => validationError(e.target.value, name))
           .reduce((messages, error) => `${error ? error + '.' : ''} ${messages} `, '');
        if (!Boolean(error.trim())) {
           setValue(e.target.value);
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

    return(
        <div className="textarea">
            {label ? (
            <label className="textarea-label" htmlFor={id}>
               {label}
            </label>
            ) : null}
            <div className={`textarea-wrapper ${isFocus ? 'focus' : ''} ${isInvalid ? 'invalid' : ''} ${isDisabled ? 'disabled' : '' }`}>
                <textarea
                    style={{resize:"none"}}
                    key={id}
                    id={id}
                    placeholder={placeholder}
                    disabled={isDisabled}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleChangeInput}
                />
            </div>
            {errorMessage && isInvalid ? <div className="textarea-error">{errorMessage}</div> : null}
        </div>
    )
}