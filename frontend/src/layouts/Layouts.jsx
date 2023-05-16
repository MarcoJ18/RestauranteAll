import { Outlet } from 'react-router-dom'
import Modal from 'react-modal'
import { ToastContainer } from 'react-toastify'
import'react-toastify/dist/ReactToastify.css'
import Sidebar from '../components/Sidebar'
import Resumen from '../components/Resumen'
import ModalProducto from '../components/ModalProducto'
import useQuiosco from '../hooks/useQuiosco'
import { useAuth } from '../hooks/useAuth'
import ModalResumen from '../components/ModalResumen'

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement('#root')

export default function Layouts() {

  
  useAuth({middleware: 'auth'})

  const { modal , modalResumen} = useQuiosco()



  return (
    <>
      <div className='md:flex '>
        <Sidebar/>
        <main className='flex-1 w-full h-screen bg-gray-100 p-3 mt-20 md:mt-0'>
          <Outlet/>
        </main>
        <Resumen/>
      </div>
      
        <Modal isOpen={modal} style={customStyles}>
            <ModalProducto/>
        </Modal>
        <Modal isOpen={modalResumen}>
          <ModalResumen/>
        </Modal>

        <ToastContainer/>
    </>

  )
}
