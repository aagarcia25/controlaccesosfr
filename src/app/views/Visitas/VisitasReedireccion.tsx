import Visitas from "./Visitas"
import { VisitasEspeciales } from "./VisitasEspeciales"

const VisitasReedireccion=({EntidadEspecial=false}:{EntidadEspecial:boolean})=>{
    if(EntidadEspecial)
        return <VisitasEspeciales/>
        
    return <Visitas/>

}
export default VisitasReedireccion;