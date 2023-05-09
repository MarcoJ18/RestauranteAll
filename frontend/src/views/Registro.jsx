import {React, createRef, useState} from 'react'
import {Link} from 'react-router-dom'
import Alerta from '../components/Alerta';
import { useAuth } from '../hooks/useAuth';


export default function Registro() {

  const nameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmRef = createRef();

  const [errores,setErrores] = useState([]);
  const {register} = useAuth({middleware: 'guest', url:'/'});

  const handleSubmit = async(e) => {
    e.preventDefault();//prevenir la acción por defecto del navegador
    /*const datos = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      passwordConfirm: passwordConfirmRef.current.value
    }*/
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const password_confirmation = passwordConfirmRef.current.value;
  
    register({name,email,password,password_confirmation},setErrores);
  }


  return (
    <>
      <h1 className='text-4xl font-black'>Crea tu Cuenta</h1>
      <p>Crea tu Cuenta llenando el formulario</p>

      <div className='bg-white shadow-md rounded-md mt-10 px-5 py-10'>
        <form
          onSubmit={handleSubmit}
          noValidate
        >
          {errores ? errores.map((error,i) => <Alerta key={i}>{error}</Alerta>) : null}
          <div className='mb-4'>
            <label 
              htmlFor="name"
              className='text-stale-800'
            >Nombre:</label>
            <input 
              type="text" 
              id='name'
              className='mt-2 p-3 w-full bg-gray-50'
              name='name'
              placeholder='Tu Nombre'
              ref={nameRef}
            />
          </div>
          <div className='mb-4'>
            <label 
              htmlFor="email"
              className='text-stale-800'
            >Email:</label>
            <input 
              type="email" 
              id='email'
              className='mt-2 p-3 w-full bg-gray-50'
              name='email'
              placeholder='Tu Email'
              ref={emailRef}
            />
          </div>
          <div className='mb-4'>
            <label 
              htmlFor="password"
              className='text-stale-800'
            >Password:</label>
            <input 
              type="password" 
              id='password'
              className='mt-2 p-3 w-full bg-gray-50'
              name='password'
              placeholder='Tu Password'
              ref={passwordRef}
            />
          </div>
          <div className='mb-4'>
            <label 
              htmlFor="password_confirmation"
              className='text-stale-800'
            >Repetir password:</label>
            <input 
              type="password" 
              id='passsword_confirmation'
              className='mt-2 p-3 w-full bg-gray-50'
              name='password_confirmation'
              placeholder='Repetir Password'
              ref={passwordConfirmRef}
            />
          </div>
          <input 
            type="submit" 
            value="Crear Cuenta" 
            className='bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer'
          />
        </form>
      </div>

      <nav className="mt-5">
        <Link to="/auth/login">
          ¿Ya tienes cuenta? Inicia Sesión
        </Link>
      </nav>

    </>
  )
}
