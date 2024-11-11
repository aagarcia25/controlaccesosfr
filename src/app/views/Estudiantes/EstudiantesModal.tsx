import { useEffect } from "react";
import ModalForm from "../componentes/ModalForm";
import { log } from "console";

export const EstudiantesModal = ({
    tipo,
    dt,
    handleClose,

}:{
    tipo: number;
    dt: any;
    handleClose: Function;

})=>{
    
    useEffect(() => {
       
        console.log("dt",dt);
        

    }, []);
    return(
        <>
    <ModalForm
        title={tipo === 1 ? "Agregar Registro" : "Editar Registro"}
        handleClose={handleClose}
      ></ModalForm>
    </>
    )
    

}