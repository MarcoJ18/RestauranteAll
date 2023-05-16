import useQuiosco from "../hooks/useQuiosco"
import { useAuth } from "../hooks/useAuth"
import Hamburger from "./Hamburger";
import Menu from "./Menu";


export default function Sidebar() {

  const {hamburgerOpen,toogleHamburger} = useQuiosco()
  const {logout,user,updateMesa} = useAuth({middleware: 'authUser'});

  return (
    <aside className="md:w-72 flex items-center justify-around fixed md:static top-0 w-full bg-white md:block">
      <div className="p-4">
        <img 
            className="w-10 md:w-40 m-auto"
            src="img/logo.png" 
            alt="img-logo" 
        />
      </div>
      <p className="my-1 text-xl text-center">Mesa: {user?.mesa}</p>
      <p className="my-1 text-xl text-center">Usuario: {user?.nombre}</p>
      <p className="my-1 text-xl text-center bg-black text-white">{user?.admin}</p>
      <div className="md:mt-3 hidden md:block">
        <Menu/>
      </div>
      <div className="md:mt-5">
          <button
            type="button"
            className="text-center bg-red-500 w-full p-3 font-bold text-white truncate"
            onClick={()=>{
              updateMesa(user?.id);
              logout(user?.id);
            }}
          >
            Cancelar Orden
          </button>
      </div>
      <div       
        onClick={toogleHamburger}
        className="block md:hidden"
      >
        <Hamburger/>
      </div>

    </aside>
  )
}
