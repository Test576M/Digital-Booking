function isRequiredValidationError(value, name) {
    return Boolean(value) ? null : `El campo ${name} es obligatorio` ;
}

function emailValidationError(value, name) {
    const regex = new RegExp("[a-zA-Z0-9!#$%&'*_+-]([\.]?[a-zA-Z0-9!#$%&'*_+-])+@[a-zA-Z0-9]([^@&%$\/()=?¿!.,:;]|\d)+[a-zA-Z0-9][\.][a-zA-Z]{2,4}([\.][a-zA-Z]{2})?");
    return regex.test(value) ? null : 'El email no es valido';
}

function passwordValidationError(value, name) {
    return value.trim().length > 6 ? null : 'La contraseña debe tener más de 6 caracteres';
}

export function passwordConfirmValidation(currentPassword) {
    return [(value, name) => {
        return currentPassword === value ? null : 'Las contraseñas no coinciden';
    }]
}

export function getValidationErrors(type, isRequired) {
    let validations = isRequired ? [isRequiredValidationError] : [];

    switch (type) {
        case 'text':
            break;
        case 'email':
            validations = [...validations, emailValidationError]
            break;
        case 'password':
            validations = [...validations, passwordValidationError]
            break;
        default:
            break;
    }


    return validations;
}

