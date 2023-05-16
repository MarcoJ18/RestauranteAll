import DataResumen from "./DataResumen";
import { formatearDinero } from "../helpers";
import useQuiosco from "../hooks/useQuiosco";
import { useAuth } from "../hooks/useAuth"
import ResumenProductoResponsibe from "./ResumenProductoResponsibe";


export default function ModalResumen() {

  const { pedido , total, handleSumbitNuevaOrden, handleClickModalResumen} = useQuiosco();
  const { logout , updateMesa,user,modal} = useAuth({});
  
  const comprobarPedido = () => pedido.length === 0;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSumbitNuevaOrden(logout,updateMesa,user);
    handleClickModalResumen();


  }

  return (
    <aside>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleClickModalResumen}
              >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>  
    <h1 className="text-4xl font-black">Mi pedido</h1>
    <p className="text-lg my-5">
      Aquí podrás ver el resumen y totales de tu pedido
    </p>
    <div className="py-10">
      {pedido.length === 0 ? (
        <p className="text-center text-2xl">
          No tienes ningún pedido
        </p>
      ) : (
        pedido.map(producto =>(

          <ResumenProductoResponsibe
            producto={producto}
            key={producto.id}
          />

        ))
      )}
    </div>
    <p className="text-xl mt-10">
      Total: {''} {formatearDinero(total)}
    </p>
    <form 
      className="w-full"
      onSubmit={handleSubmit}
    >
        <div className="mt-5">
          <input 
            disabled={comprobarPedido()} 
            type="submit" 
            className={`${comprobarPedido() ? 
              'bg-indigo-100' : 
              'bg-indigo-600 hover:bg-indigo-800 cursor-pointer'}  
              'px-5 py-2 rounded uppercase font-bold text-white text-center w-full`}
            value="Confirmar pedido"
          />
        </div>
    </form>
  </aside>
  )
}
