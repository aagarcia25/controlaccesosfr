import { Box, Button, Divider, Grid, TextField, Typography } from "@mui/material";
import ModalForm from "../componentes/ModalForm";
import Progress from "../Progress";
import { useEffect, useState } from "react";
import axios from "axios";
import { Toast } from "../../helpers/Toast";
import Swal from "sweetalert2";
import { USUARIORESPONSE } from "../../interfaces/UserInfo";
import { getUser } from "../../services/localStorage";
import dayjs from "dayjs";
 

export const CatInstitucionModal = ({
	tipo,
	dt,
	handleClose,
}: {
	tipo: number;
	dt: any;
	handleClose: Function;
}) =>{
        const [nombre, setNombre] = useState("");
        const [id, setId] = useState("");
        const [show, setShow] = useState(false);
        const user: USUARIORESPONSE = JSON.parse(String(getUser()));
        
        const handleRegister = () => {
                if (
                  !nombre 
              
                ) {
                  Swal.fire("Favor de Completar los Campos", "¡Error!", "info");
                } else {
                 
                  let data = {
                    //id: id,
                   // NUMOPERACION: tipo,
                    ModificadoPor:user.Id,
                    Nombre: nombre,
                    deleted: 0,
                    UltimaActualizacion: dayjs().format("YYYY-MM-DD HH:mm:ss"),

                   };
                  if (tipo == 1) {   
                    let aux = {...data,FechaCreacion: dayjs().format("YYYY-MM-DD HH:mm:ss"),CreadoPor: user.Id,}
                    data= aux                
                    agregar(data);
                  } else if (tipo === 2) {
                    editar(data);
                  }
                }
              };

    const agregar = (data: any) => {
            axios
					  .post(
						process.env.REACT_APP_APPLICATION_BASE_URL + "catalogo/Cat_Institucion_Educativa",
						data
					  )
                      .then((response) => {	
                        if (response.data.SUCCESS) {
                                 Toast.fire({
                                 icon: "success",
                                  title: "¡Registro Agregado!",
                             });
                                 handleClose();
                               } else {
                                 Swal.fire(response.data.STRMESSAGE, "¡Error!", "info");
                               }
					  })
          };
        
          const editar = (data: any) => {
            axios
					  .put(
						process.env.REACT_APP_APPLICATION_BASE_URL + "catalogo/Cat_Institucion_Educativa/"+id,
						data
					  )
                      .then((response) => {	
                        if (response.data.SUCCESS) {
                                 Toast.fire({
                                 icon: "success",
                                  title: "¡Registro Editado!",
                             });
                                 handleClose();
                               } else {
                                 Swal.fire(response.data.STRMESSAGE, "¡Error!", "info");
                               }
					  })
          };
          useEffect(() => {
                            console.log("tipo",tipo);
                            console.log("dt",dt);
							
                            
                        }, []);
							useEffect(() => {
								console.log("dt",dt);
								
								
						
								if (Object.keys(dt).length === 0) {
								} else {
									setId(dt?.row?.id);
									setNombre(dt?.row?.Nombre);
								
								
								}	
							}, [dt]);
return(<>
<ModalForm
				title={tipo === 1 ? "Agregar Registro" : "Editar Registro"}
				handleClose={handleClose}
			>
				<Progress open={show}></Progress>
				<Box margin={2} padding={2}>
					{/* Información Básica */}
					<Grid container alignItems="center" spacing={1} sx={{ mb: 3 }}>
						<Grid item xs={12} sm="auto">
							<Typography variant="body1" sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
								• Información Básica
							</Typography>
						</Grid>
						<Grid item xs>
							<Divider sx={{ borderColor: "#B0B0B0" }} />
						</Grid>
					</Grid>

					{/* Aquí va el contenido de la sección de Información Básica */}
					<Grid container spacing={3}>
						<Grid item xs={12} sm={6} md={4}>
							
						</Grid>

						<Grid item xs={12} sm={6} md={4}>
							
						</Grid>

						<Grid item xs={12} sm={12} md={12}>
							<Typography sx={{ fontFamily: "sans-serif" }}>
								Nombre de Institución:
							</Typography>
							<TextField
								required
								id="nombre" 
								size="small"
								value={nombre}
								type="text"
								fullWidth
								variant="outlined"
								onChange={(v) => setNombre(v.target.value)}
								// error={nombre === "" ? true : false}
								// InputProps={{
								// 	readOnly: tipo === 1 ? false : true,
								// }}
								disabled={false}
							/>
						</Grid>


						<Grid
							container
							spacing={2}
							justifyContent="flex-end"
							sx={{ mt: 3 }}
						>
							{/* Botón de Cancelar */}
							<Grid item>
								<Button
									variant="contained"
									sx={{
										backgroundColor: "#A57F52",
										color: "white",
										"&:hover": {
											backgroundColor: "grey.300", // Cambia a gris claro en hover
											color: "black", // Cambia a letras negras en hover
										},
									}}
									onClick={() => handleClose()} // Añade la acción deseada para el botón de cancelar
								>
									CANCELAR
								</Button>
							</Grid>

							{/* Botón de Registrar */}
							<Grid item>
								<Button
									variant="contained"
									sx={{
										backgroundColor: "black",
										color: "white",
										"&:hover": { backgroundColor: "grey.300",color: "black", },
									}}
									onClick={() => handleRegister()} // Añade la acción deseada para el botón de registrar
								>
									REGISTRAR
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</Box>
			</ModalForm>
</>)
}