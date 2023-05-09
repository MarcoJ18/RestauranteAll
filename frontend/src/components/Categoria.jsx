import useQuiosco from "../hooks/useQuiosco";

export default function Categoria({categoria}) {
    
    const {icono,id,nombre} = categoria;
    const {handleClickCategoria, categoriaActual} = useQuiosco();

    return (
    <div 
    
      className={`${categoriaActual.id === id ? 'bg-amber-400' : 'bg-white'} flex items-center gap-4 border w-full p-3 hover:bg-amber-400
      cursor-pointer`}
      onClick={() => handleClickCategoria(id)}
    >
      <img 
            src={`/img/icono_${icono}.svg`} 
            className="w-12"
            alt="img-icono" 
        />
        <button 
          className="text-lg font-bold cursor-pointer truncate"
          type="button"
        >{nombre}</button> 
    </div>
  )
}
