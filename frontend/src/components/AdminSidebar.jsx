
import { Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export default function AdminSidebar() {

  const { logout,user } = useAuth({middleware: 'admin'});


  return (
    <div>
      <aside className="md:w-72 flex items-center justify-around sticky  top-0 w-full bg-white md:block">
        <div className="p-4">
            <img 
                src="/img/logo.png" 
                alt="imagen logo" 
                className="md:w-40 w-10 m-auto"
            />
        </div>
        <nav className="flex flex-col p-4">
            <Link to='/admin' className="font-bold text-lg underline">Ordenes</Link>
            <Link to='/admin/productos' className="font-bold text-lg underline">Productos</Link>
        </nav>

        <div className="my-5 px-5">
          <button
            type="button"
            className="text-center bg-red-500 w-full p-3 font-bold text-white truncate"
            onClick={()=> {logout(user.id)}}
          
          >Cerrar Sesión</button>

        </div>
      </aside>
    </div>
  )
}
