import {React, createRef, useState} from 'react'
import {Link} from 'react-router-dom'
import Alerta from '../components/Alerta';
import { useAuth } from '../hooks/useAuth';


export default function Login() {

  const emailRef = createRef();
  const passwordRef = createRef();

  const [errores,setErrores] = useState([]);
  const { login } = useAuth({
    middleware: 'guest',
    url: '/'
  });


  const handleSubmit = async(e) => {
    e.preventDefault();//prevenir la acción por defecto del navegador
  
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    
    login({email,password},setErrores);

  }


  return (
    <>
      <h1 className='text-4xl font-black'>Inciar Sesión</h1>
      <p>Inicie sessión con su cuenta</p>

      <div className='bg-white shadow-md rounded-md mt-10 px-5 py-10'>
        <form 
          onSubmit={handleSubmit}
          noValidate
        >
          {errores ? errores.map((error,i) => <Alerta key={i}>{error}</Alerta>) : null}
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
          <input 
            type="submit" 
            value="Iniciar Sesión" 
            className='bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer'
          />
        </form>
      </div>

      <nav className="mt-5">
        <Link to="/auth/register">
          ¿No tienes cuenta? Crea una cuenta
        </Link>
      </nav>

    </>
  )
}
