import useQuiosco from "../hooks/useQuiosco"
import Categoria from "./Categoria"
import { useAuth } from "../hooks/useAuth"


export default function Menu() {

    const {categorias} = useQuiosco()
    useAuth({middleware: 'authUser'});

  return (
    <>
       {categorias.map((categoria) => (
        <Categoria key={categoria.id} categoria={categoria} /> 
      ))}
      
    </>
  );
}
