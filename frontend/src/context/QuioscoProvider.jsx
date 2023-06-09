import { createContext , useState, useEffect } from "react"
import { toast } from "react-toastify";
import clienteAxios from "../config/axios";

const QuioscoContext = createContext();

const QuioscoProvider = ({children}) =>{

    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({});
    const [modal, setModal] = useState(false);
    const [producto, setProducto] = useState({});
    const [pedido, setPedido] = useState([]);
    const [total, setTotal] = useState(0);
    const [hamburgerOpen, setHamburgerOpen] = useState(false);
    const [modalResumen, setModalResumen] = useState(false);


    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0);
        setTotal(nuevoTotal);
    },[pedido]);

    const obtenerCategorias = async () => {
        //const token = localStorage.getItem("AUTH_TOKEN");
        try {
        /*    const {data} = await clienteAxios('/api/categorias',{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });*/
            const {data} = await clienteAxios('/api/categorias');
            setCategorias(data.data);
            setCategoriaActual(data.data[0]);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        obtenerCategorias();
    },[]);


    const handleClickCategoria = id =>{
        const categoria = categorias.filter(categoria => categoria.id === id)[0]
        setCategoriaActual(categoria)
    }

    const handleClickModal = () =>{
        setModal(!modal)
    }

    const handleSetProducto = producto =>{
        setProducto(producto)
    }

    const handleAgregarPedido = ({categoria_id, ...producto}) =>{

        if(pedido.some(pedidoState => pedidoState.id === producto.id)){
            const pedidoActualizado = pedido.map(pedidoState => pedidoState.id === producto.id ? producto : pedidoState);
            setPedido(pedidoActualizado);
            toast.success('Guardado exitosamente');
      
        }else{
            setPedido([...pedido,producto])
            toast.success("Pedido agregado correctamente");
        }

    }

    const handleCambiarCantidad = id =>{
        const productoActualizado = pedido.filter(producto => producto.id === id)[0];
        setProducto(productoActualizado);
        setModal(!modal);
        

    }

    const handleCambiarCantidadResponsive = id =>{
        const productoActualizado = pedido.filter(producto => producto.id === id)[0];
        setProducto(productoActualizado);
        setModal(!modal);
        setModalResumen(modal);

    }

    const hadleEliminarProductoPedido = id =>{
        const pedidoActualizado = pedido.filter(producto => producto.id !== id);
        setPedido(pedidoActualizado);
        toast.success('Eliminado exitosamente');
    }

    const handleSumbitNuevaOrden = async (logout,updateMesa,user) =>{

        const token = localStorage.getItem('AUTH_TOKEN');
        try {
            const {data} = await clienteAxios.post('/api/pedidos', {
                total,
                productos: pedido.map(producto => {
                    return {
                        id: producto.id,
                        cantidad: producto.cantidad
                    }
                }),
            },
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success(data.message);
            setTimeout(() =>{
                setPedido([]);
            },1000);
            //Cerrar sesion del usuario
            setTimeout(() =>{
               localStorage.removeItem('AUTH_TOKEN');
               updateMesa(user?.id);
               logout();
            },3000)
        } catch(error){
            console.log(error);
        }
    }

    const handleClickCompletarPedido = async (id,idMesa) =>{

        const token = localStorage.getItem('AUTH_TOKEN');
        try {
            toast.success('Pedido completado...');
            await clienteAxios.put(`api/pedidos/${id}`,null,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            await clienteAxios.put(`api/mesas/update/${idMesa}`,null);


        } catch (error) {
            console.log(error);
            
        }
            
    }

    
    const handleClickProductoAgotado = async (id) =>{
        const token = localStorage.getItem('AUTH_TOKEN');
        try {
            await clienteAxios.put(`api/productos/${id}`,null,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            console.log(error);
            
        }
    }

    const toogleHamburger = () => {
        setHamburgerOpen(!hamburgerOpen);
      }


    const handleClickModalResumen = () =>{
        setModalResumen(!modalResumen);
    }
  


    return(
        <QuioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                modal,
                handleClickModal,
                producto,
                handleSetProducto,
                pedido,
                handleAgregarPedido,
                handleCambiarCantidad,
                hadleEliminarProductoPedido,
                total,
                handleSumbitNuevaOrden,
                handleClickCompletarPedido,
                handleClickProductoAgotado,
                hamburgerOpen,
                toogleHamburger,
                modalResumen,
                handleClickModalResumen,
                handleCambiarCantidadResponsive
                

            }}
        
        >{children}</QuioscoContext.Provider>
    )
}

export { QuioscoProvider }
export default QuioscoContext