import './Button.scss';

export default function Button ({id, classList, action, isDisabled, type, children}) {
    const buttonClass = `button ${classList} ${isDisabled ? 'button-disabled' : null}`;
    return (
        <button id={id} type={type} className={buttonClass} onClick={action} disabled={isDisabled}>
            {children}
        </button>
    )
}