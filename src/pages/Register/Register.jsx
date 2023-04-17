import { useState } from 'react';
import MainCenterLayout from '../../shared/Layouts/MainCenterLayout/MainCenterLayout';
import Input from '../../shared/Input/Input';
import Button from '../../shared/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { getValidationErrors, passwordConfirmValidation } from '../../utils/validationErrors';
import { registerUser } from '../../core/services/login';
import { formStateValidation } from '../../utils/formStateMapper';
import axios from 'axios';
import { postReq } from '../../core/services/axios';
import Header from '../../components/Header/Header';


  const Register = () => {
 let browserNavigate = useNavigate();


  const registerForm = {
      name: { state: useState(), isValid: useState(false) },
      lastName: { state: useState(), isValid: useState(false) },
      email: { state: useState(), isValid: useState(false) },
      password: { state: useState(), isValid: useState(false) },
      passwordConfirm: { state: useState(), isValid: useState(false) },
      ciudad: { state: useState('Indefinido'), isValid: useState(true) },


   };


 const registerNewUser = () => {
      
   const userData = {
         
         id: 1,
         nombre: registerForm.name.state[0],
         apellido: registerForm.lastName.state[0],
         email: registerForm.email.state[0],
         contrasena: registerForm.password.state[0],
         ciudad: registerForm.ciudad.state[0],
         rol: {
            id:2
         },
         jwt:""

     };
    /*  fetch('http://13.59.110.188:8090/usuarios',{
         method: "POST",
         body: JSON.stringify(userData),
         headers: {
            "Content-Type": "application/json"
         }
      })
      .then(response => {
         if (response.status === 201) {
            // Guardar el token globalmente
            const token = response.data.token;

            // Permanecer logueado
            localStorage.setItem('token', token);

            // Redirigir al usuario a la página de reserva
            browserNavigate('/login');
         } else {
            console.log(response.data);
            alert('Lamentablemente no ha podido registrarse. Por favor intente más tarde.');
         }
      })
      .catch(error => {
         console.log(error);
         alert('Lamentablemente no ha podido registrarse. Por favor intente más tarde.');
      });*/
    
     axios.post('http://13.59.110.188:8090/usuarios', userData)
      .then(response => {
         if (response.status === 200) {
            // Guardar el token globalmente
            const token = response.data.token;

            // Permanecer logueado
            localStorage.setItem('token', token);

            // Redirigir al usuario a la página de reserva
            browserNavigate('/login');
         } else {
            console.log(response.data);
            alert('Lamentablemente no ha podido registrarse. Por favor intente más tarde.');
         }
      })
      .catch(error => {
         console.log(error);
         alert('Lamentablemente no ha podido registrarse. Por favor intente más tarde.');
      });
      
};



   return (
      <>
      <Header/>
      <MainCenterLayout>

         <div className="register">
            <h1 className="form-title">Crear cuenta</h1>
            <div className="form-row">
               <Input
                  id={'name'}
                  placeholder={''}
                  type={'text'}
                  label={'Nombre'}
                  errors={getValidationErrors('text', false)}
                  setValue={registerForm.name.state[1]}
                  name={'name'}
                  setInputValidation={registerForm.name.isValid[1]}
               />               
               <Input
                  id={'lastname'}
                  placeholder={''}
                  type={'text'}
                  label={'Apellido'}
                  errors={getValidationErrors('text', false)}
                  setValue={registerForm.lastName.state[1]}
                  name={'lastname'}
                  setInputValidation={registerForm.lastName.isValid[1]}
               />
            </div>


            <Input
               id={'email'}
               placeholder={''}
               type={'email'}
               label={'Correo Electronico'}
               errors={getValidationErrors('email', true)}
               setValue={registerForm.email.state[1]}
               name={'email'}
               setInputValidation={registerForm.email.isValid[1]}
            />

            <Input
               id={'password'}
               placeholder={''}
               type={'password'}
               label={'Contraseña'}
               errors={getValidationErrors('password', true)}
               setValue={registerForm.password.state[1]}
               name={'password'}
               setInputValidation={registerForm.password.isValid[1]}
            />
            
            <Input
               id={'passwordConfirm'}
               placeholder={''}
               type={'password'}
               label={'Confirmar contraseña'}
               errors={[
                  ...getValidationErrors('password', true),
                  ...passwordConfirmValidation(registerForm.password.state[0]),
               ]}
               setValue={registerForm.passwordConfirm.state[1]}
               name={'passwordConfirm'}
               setInputValidation={registerForm.passwordConfirm.isValid[1]}
            />

            <Button
               classList={'button-primary button-small'}
               action={registerNewUser}
               onClick={registerNewUser}
               isDisabled={!formStateValidation(registerForm)}>
               Crear cuenta
            </Button>
            <div className="form-footer">
               <span>¿Ya tienes una cuenta? </span>
               <Link to={'/login'}>
                  <span>Iniciar Sesión</span>
               </Link>
            </div>
         </div>
      </MainCenterLayout>
      </>
   );
};

export default Register;
