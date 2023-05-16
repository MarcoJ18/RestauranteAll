import DataResumen from "./DataResumen";
import DataResumenResponsibe from "./DataResumenResponsibe";

export default function Resumen() {
  return (
    <>
      <div className="md:mt-3 hidden md:block">
        <DataResumen/>
      </div>
      <div className="block md:hidden">
        <DataResumenResponsibe/>
      </div>
    </>

  );
}
