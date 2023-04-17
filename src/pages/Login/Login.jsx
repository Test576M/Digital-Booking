import MainCenterLayout from '../../shared/Layouts/MainCenterLayout/MainCenterLayout';
import Input from '../../shared/Input/Input';
import Button from '../../shared/Button/Button';
import Header from '../../components/Header/Header'
import { Link } from 'react-router-dom';
import { getValidationErrors} from '../../utils/validationErrors';
import { logUser } from '../../core/services/login';
import { formStateValidation } from '../../utils/formStateMapper';
import { useState } from 'react';

const Login = () => {
   const [failedAuth, setFailedAuth] = useState(false);
   const [successfulAuth, setSuccessfulAuth] = useState(false);

   const loginForm = {
      email: { state: useState(), isValid: useState(false) },
      password: { state: useState(), isValid: useState(false) },
   };

   const login = async () => {

      /*loginUser(loginForm).then(userAuth => {
         setTimeout(() => {
            if (userAuth) {
               sessionStorage.setItem('CURRENT_USER', JSON.stringify(userAuth));
               userContext.setUser(userAuth);
               browserNavigate('/');
            } else {
               setFailedAuth(true)
            }
         }, 2000);
      }); */
      await logUser(loginForm.email.state[0],loginForm.password.state[0]);
      localStorage.getItem("jwt") ? setSuccessfulAuth(true) : setFailedAuth(true);
   };


   return (
      <>
         <Header/>
         {!failedAuth && !successfulAuth ?
         <MainCenterLayout>
            <div className="login">
               <h1 className="form-title">Iniciar sesión</h1>
               <Input
                  id={'email'}
                  placeholder={''}
                  type={'email'}
                  label={'Correo Electronico'}
                  errors={getValidationErrors('email', true)}
                  setValue={loginForm.email.state[1]}
                  name={'email'}
                  setInputValidation={loginForm.email.isValid[1]}
               />
               <Input
                  id={'password'}
                  placeholder={''}
                  type={'password'}
                  label={'Contraseña'}
                  errors={getValidationErrors('password', true)}
                  setValue={loginForm.password.state[1]}
                  name={'password'}
                  setInputValidation={loginForm.password.isValid[1]}
               />
               <Button
                  classList={'button-primary button-small'}
                  action={login}
                  isDisabled={!formStateValidation(loginForm)}>
                  Iniciar sesión
               </Button>
               <div className="form-footer">
                  <span>¿No tienes una cuenta? </span>
                  <Link to={'/register'}>
                     <span>Registrarse</span>
                  </Link>
               </div>
            </div>
            
         </MainCenterLayout> : failedAuth ?
         <MainCenterLayout>
            <h2>Lamentablemente no ha podido iniciar sesión. Por favor intente más tarde.</h2>
            <a style={{color:"#1DBEB4",marginLeft:"25%"}} href='/'>Volver a la pagina principal</a>
         </MainCenterLayout> : successfulAuth ?
         <MainCenterLayout>
            <h2 style={{marginLeft:"25%"}}>Ha ingresado correctamente!</h2>
            <a style={{color:"#1DBEB4",marginLeft:"25%"}} href='/'>Volver a la pagina principal</a>
         </MainCenterLayout>
         :null}
      </>
   );
};

export default Login;