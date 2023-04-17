import axios from "axios";
import { formStateMapper } from "../../utils/formStateMapper";

const usersURL = 'http://13.59.110.188:8090/usuarios'

export async function registerUser(userForm) {
    const userInfo = formStateMapper(userForm);
    const response = await postReq(usersURL, userInfo);
    
    if (response.status === 201) {
        localStorage.setItem('token', response.data.token)
    }else{
        throw new Error("Lamentablemente no ha podido registrarse. Por favor intente más tarde")
    }
}

export async function loginUser(loginForm) {
    const credentials = formStateMapper(loginForm);
    const user = {
        name: 'Usuario',
        lastName: 'Logged',
        email: 'user@gmail.com',
        password: '1234567'
    }

    return user.email === credentials.email && user.password === credentials.password ? user : null;
}

export async function logUser(email,pass){
  await axios.post("http://13.59.110.188:8090/autenticar/login", {
    username: email,
    password: pass
  })
  .then((response) => {
    localStorage.setItem("jwt",JSON.stringify(response.data));
  })
  .catch((error)=>{
    console.log(error);
  })
}