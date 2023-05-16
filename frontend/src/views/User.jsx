import { React, createRef, useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import { useAuth } from "../hooks/useAuth";

export default function User() {
  const nombreRef = createRef();
  const current_mesaRef = createRef();

  const [errores, setErrores] = useState([]);
  const { intoMesas } = useAuth({ middleware: "guest", url: "/" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const nombre = nombreRef.current.value;
    const current_mesa = current_mesaRef.current.value;
    const mesa = current_mesaRef.current.value;

    intoMesas({ nombre, current_mesa,mesa }, setErrores);
  };
  return (
    <>
      <div className="mt-24">
        <h1 className="text-4xl font-black">Restaurante Rissoto</h1>
        <p>Bienvenido</p>

        <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
          <form onSubmit={handleSubmit} noValidate>
          {errores ? errores.map((error,i) => <Alerta key={i}>{error}</Alerta>) : null}
            <div className="mb-4">
              <label htmlFor="nombre" className="text-stale-800">
                Nombre:
              </label>
              <input
                type="text"
                id="nombre"
                className="mt-2 p-3 w-full bg-gray-50"
                name="nombre"
                placeholder="Tu nombre"
                ref={nombreRef}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="mesa" className="text-stale-800">
                Mesa:
              </label>
              <select
                name="current_mesa"
                id="current_mesa"
                className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                ref={current_mesaRef}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
            <input
              type="submit"
              value="Entrar"
              className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
            />
          </form>
        </div>
      </div>
    </>
  );
}
