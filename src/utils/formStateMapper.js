
//FUNCTION pasar el estado del form a un objeto sin estado para su facilitar su envio como objeto JSON o petición HTTP
export function formStateMapper(form) {
  let formStateless = {};

  Object.keys(form).forEach((key) => {
      formStateless[key] = form[key].state[0]
  })

  return formStateless;
}
//FUNCTION para validar si el estado del formulario es valido para su envio o no
export function formStateValidation(form) {
  return Object.keys(form).every((key) => form[key].isValid[0]);
}

