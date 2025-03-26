import { useEffect, useState } from "react";
import Visitas from "./Visitas";
import { VisitasEspeciales } from "./VisitasEspeciales";
import { UserServices } from "../../services/UserServices";
import { useLocation } from "react-router-dom";
const useCustomParams = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
  
    const id = searchParams.get("id"); // Obtiene el valor de id
    const especial = searchParams.get("especial"); // Obtiene el valor de especial
    const opcion = searchParams.get("opcion");
    return { id, especial,opcion };
  };
const VisitasReedireccion = () => {
    const { id, especial,opcion } = useCustomParams();

    const [pantalla, setPantalla] = useState(<></>);
console.log(especial);

    

    useEffect(() => {
        UserServices.verificarEntidadEspecial("Especial", () => {}, () => {})
            .then((r) => {
                console.log("r:", r);
                console.log("especial:", especial);
                console.log("r || especial:", r || especial);
                 
                
                if(!r && especial!="true") {
                    setPantalla(<Visitas />);
                }else if(r&&especial=="false"){ setPantalla(<Visitas />);} 
                else{
                    setPantalla(<VisitasEspeciales />);
                } 
            })
            .catch((error) => {
                console.error("Error al verificar entidad especial:", error);
                setPantalla(<Visitas />); // Fallback en caso de error
            });
    }, [especial]); // ✅ Agregar `especial` como dependencia

    return pantalla;
};

export default VisitasReedireccion;
