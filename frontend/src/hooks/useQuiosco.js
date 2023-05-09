import { useContext } from "react";
import QuioscoContext from "../context/QuioscoProvider";

const useQuiosco = () => useContext(QuioscoContext);

export default useQuiosco;