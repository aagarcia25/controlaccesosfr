import { useState } from "react";
import Visitas from "./Visitas"
import { VisitasEspeciales } from "./VisitasEspeciales"
import { UserServices } from "../../services/UserServices";

const VisitasReedireccion = () => {

    const [EntidadEspecial, setEntidadEspecial] = useState(true);
    UserServices.verificarEntidadEspecial("Especial", setEntidadEspecial, () => { });
    if (EntidadEspecial)
        return <VisitasEspeciales />

    return <Visitas />

}
export default VisitasReedireccion;