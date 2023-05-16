import {useEffect } from 'react';
import useSWR from 'swr';
import clienteAxios from "../config/axios";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

export const useAuth = ({middleware,url}) =>{


    const token = localStorage.getItem('AUTH_TOKEN');
    const navigate = useNavigate();

    const {data: user, error, mutate} = useSWR('/api/user',()=>
        clienteAxios('/api/user',{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then(res =>res.data)
        .catch(error =>{
            throw Error(error?.response?.data?.errors);
        })
    );

    
    const login = async ({email,password},setErrores) =>{
        try {
            const {data} = await clienteAxios.post('/api/login', {email,password});
            localStorage.setItem('AUTH_TOKEN', data.token);
            setErrores([]);
            await mutate();
            toast.success('Iniciando sesión...');

          } catch (error) {
            setErrores(Object.values(error.response.data.errors));
            toast.error('Error al iniciar sesión');

          }
    }

    const register = async ({name,email,password,password_confirmation},setErrores) =>{
        try {
            const {data} = await clienteAxios.post('/api/register', {name, email, password, password_confirmation});
            localStorage.setItem('AUTH_TOKEN', data.token);

            setErrores([]);
            await mutate();
            toast.success('Espera hasta que el administrador confirme tu cuenta');
          } catch (error) {
            toast.error('No se pudo registrar el usuario');
            setErrores(Object.values(error.response.data.errors));
          }
    }
    
    const logout = async (id) =>{
        try {
            await clienteAxios.post('/api/logout', null, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            await clienteAxios.put(`api/mesas/update/${id}`,null);
            localStorage.removeItem('AUTH_TOKEN');
            await mutate(undefined);
        } catch (error) {

            throw Error(error?.response?.data?.errors);
        }
    }



    const {data: mesaUser, errorMesa} = useSWR('/api/mesas',()=>
    clienteAxios('/api/mesas')
    .then(res => res.data)
    .catch(error =>{
        throw Error(error?.response?.data?.errors);
        })
    );


    const intoMesas = async ({nombre,current_mesa,mesa},setErrores) =>{
        try {
            const {data} = await clienteAxios.post('/api/mesas', {nombre, current_mesa,mesa});
            localStorage.setItem('AUTH_TOKEN', data.token);
            setErrores([]);
            await mutate();
            toast.success('Espera un momento estamos revisando que hay mesas disponible...');
          } catch (error) {
            setErrores(Object.values(error.response.data.errors));

          }
    }



    const updateMesa = async (id) =>{
        try {
            await clienteAxios.put(`/api/mesas/${id}`, null);
            await mutate(undefined);
        } catch (error) {

            throw Error(error?.response?.data?.errors);
        }
    }




    useEffect(() =>{



        if (middleware === 'guest' && user ){
            navigate('/');
        }


        if(middleware === 'guest' && user && user.admin === 0){
            navigate('/auth/login');
        }




        if(middleware === 'guest' && user && user.admin === 1){
            navigate('/admin');
        }


        if(middleware === 'admin' && !user ){
            navigate('/auth/login');
        }


        if(middleware === 'auth' && user && user.admin === 0){
            navigate('/auth/login');
        }


        if(middleware === 'authUser' && error){
            navigate('/auth/user');
        }

    


        

    },[user,error,mesaUser,errorMesa])


    return {login,register,logout,intoMesas,updateMesa,mesaUser,errorMesa,user,error};
}