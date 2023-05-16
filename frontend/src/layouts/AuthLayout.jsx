import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import'react-toastify/dist/ReactToastify.css'

export default function AuthLayout() {

  return (
    <>
    <main className="max-w-4xl max-h-screen m-auto flex flex-col items-center md:flex-row ">
      <img src="../img/logo.png" alt="logotivo" className="md:w-1/3 mt-1 w-1/4"/>
      <div className="p-10 w-full">
        <Outlet />
      </div>
    </main>
    <ToastContainer/>
    </>
  );
}
