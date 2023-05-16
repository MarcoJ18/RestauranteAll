import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import { useAuth } from "../hooks/useAuth";
import { ToastContainer } from "react-toastify";

export default function AdminLayout() {

  useAuth({middleware: 'admin'});

  return (
    <div>
        <div className='md:flex'>
        <AdminSidebar/>
        <main className='flex-1 h-screen md:overflow-y-scroll bg-gray-100 p-3'>
          <Outlet/>
        </main>
      </div>
      <ToastContainer/>
    </div>
  )
}
