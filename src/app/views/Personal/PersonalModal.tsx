import { useEffect, useState } from "react";
import ModalForm from "../componentes/ModalForm";
import Progress from "../Progress";
import { Box, Button, Divider, Grid, TextField, Typography } from "@mui/material";
import SelectFrag from "../componentes/SelectFrag";
import SelectValues from "../../interfaces/Share";
import { ShareService } from "../../services/ShareService";
import Swal from "sweetalert2";
import { USUARIORESPONSE } from "../../interfaces/UserInfo";
import { getUser } from "../../services/localStorage";
import { CatalogosServices } from "../../services/catalogosServices";
import { Toast } from "../../helpers/Toast";

export const PersonalModal = ({
    tipo,
    handleClose,
    dt,
}: {
    tipo: number;
    handleClose: Function;
    dt: any;
}) => {
    const [show, setShow] = useState(false);
	const [nombre, setNombre] = useState("");
	const [apellidoP, setApellidoP] = useState("");
	const [apellidoM, setApellidoM] = useState("");
	const [curp, setCurp] = useState("");
	const [correo, setCorreo] = useState("");
	const [celular, setCelular] = useState("");
	const [telefono, setTelefono] = useState("");
	const [extension, setExtension] = useState("");
	const [puesto, setPuesto] = useState("");
	const [unidadAdmin, setUnidadAdmin] = useState("");
	const [ListUnidadAdmin, setListUnidadAdmin] = useState<SelectValues[]>([]);
	const [id, setId] = useState("");
	const user: USUARIORESPONSE = JSON.parse(String(getUser()));
	
	const handleFilterChangeUnidadAdmin = (v: string) => {
		setUnidadAdmin(v);
	};

	const loadFilter = (operacion: number, P_ID?: string) => {
		setShow(true);
		let data = { NUMOPERACION: operacion, P_ID: P_ID };
		ShareService.SelectIndex(data).then((res) => {
			if (operacion === 11) {
				setListUnidadAdmin(res.RESPONSE);
				setShow(false);
			}
		});
	};

		  const handleRegister = () => {
			if (
			  !nombre ||
			  !apellidoP ||
			  !apellidoM ||
			  !correo ||
			  !curp ||
			  !telefono ||
			  !extension ||
			  !unidadAdmin ||
			  !puesto
			) {
			  Swal.fire("Favor de Completar los Campos", "¡Error!", "info");
			} else {
			  // Convertir horarios al formato compatible con MySQL
			//   const horarioDesdeFormatted = horarioDesde
			// 	? horarioDesde.format("YYYY-MM-DD HH:mm:ss")
			// 	: null;
			//   const horarioHastaFormatted = horarioHasta
			// 	? horarioHasta.format("YYYY-MM-DD HH:mm:ss")
			// 	: null;
	

		  
			  let data = {
				NUMOPERACION: tipo,
				CHID: id,
				CHUSER: user.Id,
				Nombre: nombre,
				ApellidoPaterno: apellidoP,
				ApellidoMaterno: apellidoM,
				CorreoElectronico: correo,
				CURP: curp,
				Telefono: telefono,
				Ext: extension,
				idEntidad: unidadAdmin,
				Puesto: puesto,
				};
		  
			  if (tipo == 1) {
				
				agregar(data);
			  } else if (tipo === 2) {
				editar(data);
			  }
			}
		  };

		  const agregar = (data: any) => {
				CatalogosServices.PersonalIndex(data).then((res) => {
				  if (res.SUCCESS) {
					Toast.fire({
					  icon: "success",
					  title: "¡Registro Agregado!",
					});
					handleClose();
				  } else {
					Swal.fire(res.STRMESSAGE, "¡Error!", "info");
				  }
				});
			  };
			
			  const editar = (data: any) => {
				CatalogosServices.PersonalIndex(data).then((res) => {
				  if (res.SUCCESS) {
					Toast.fire({
					  icon: "success",
					  title: "¡Registro Editado!",
					});
					handleClose();
				  } else {
					Swal.fire(res.STRMESSAGE, "¡Error!", "info");
				  }
				});
			  };

	useEffect(() => {

			loadFilter(11);
	
			if (Object.keys(dt).length === 0) {
			} else {
				//setId(dt?.row?.id);
	
				//setId(dt?.row?.id);}
				//setTipoEstudiante(dt?.row?.TipoEstudiante);
				//setGenero(dt?.row?.Sexo);
				//setUnidadAdmin(dt?.row?.IdEntidad);
				//setNoGaffete(dt?.row?.NoGaffete);
				//setNombre(dt?.row?.Nombre);
				//setTelefono(dt?.row?.Telefono);
				//setemail(dt?.row?.Correo);
				//setEscolaridad(dt?.row?.IdEscolaridad);
				//setListEscolaridad(dt?.row?.Escolaridad);
				//setListInstituto(dt?.row?.Escolaridad);
				//setInstituto(dt?.row?.IdInstitucionEducativa);
				
			}
		}, [dt]);

    return (<>
        <ModalForm
            title={tipo === 1 ? "Agregar Registro" : "Editar Registro"}
            handleClose={handleClose}
        >
            <Progress open={show}></Progress>
            <Box margin={2} padding={2}>
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
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography sx={{ fontFamily: "sans-serif" }}>
                            Nombre:
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
                    <Grid item xs={12}  sm={6} md={4}>
							<Typography sx={{ fontFamily: "sans-serif" }}>
                            Apellido Paterno:
							</Typography>
							<TextField
								required
								size="small"
								id="apellidoP" 
								value={apellidoP}
								type="text"
								fullWidth
								variant="outlined"
								onChange={(v) => setApellidoP(v.target.value)}
								// error={email === "" ? true : false}
								// InputProps={{
								// 	readOnly: tipo === 1 ? false : true,
								// }}
								disabled={false}
							/>
						</Grid>

						<Grid item xs={12}  sm={6} md={4}>
							<Typography sx={{ fontFamily: "sans-serif" }}>
								Apellido Materno:
							</Typography>
							<TextField
								required
								size="small"
								id="apellidoM" 
								value={apellidoM}
								type="text"
								fullWidth
								variant="outlined"
								onChange={(v) => setApellidoM(v.target.value)}
								// error={telefono === "" ? true : false}
								// InputProps={{
								// 	readOnly: tipo === 1 ? false : true,
								// }}
								disabled={false}
							/>
						</Grid>
                        <Grid item xs={12} sm={6} md={4}>
                        <Typography sx={{ fontFamily: "sans-serif" }}>
                            CURP:
                        </Typography>
                        <TextField
                            required
                            id="curp"
                            size="small"
                            value={curp}
                            type="text"
                            fullWidth
                            variant="outlined"
                            onChange={(v) => setCurp(v.target.value)}
                            // error={nombre === "" ? true : false}
                            // InputProps={{
                            // 	readOnly: tipo === 1 ? false : true,
                            // }}
                            disabled={false}
                        />
                    </Grid>
                </Grid>
                <Grid
						container
						alignItems="center"
						spacing={1}
						sx={{ mb: 3, mt: 4 }}
					>
						<Grid item xs={12} sm="auto">
							<Typography variant="body1" sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
								• Contacto
							</Typography>
						</Grid>
						<Grid item xs>
							<Divider sx={{ borderColor: "#B0B0B0" }} />
						</Grid>
					</Grid>
                    <Grid container spacing={2}>
                    <Grid item xs={12}  sm={6} md={4}>
							<Typography sx={{ fontFamily: "sans-serif" }}>
								Correo Electrónico:
							</Typography>
							<TextField
								required
								size="small"
								id="correo" 
								value={correo}
								type="text"
								fullWidth
								variant="outlined"
								onChange={(v) => setCorreo(v.target.value)}
								// error={telefono === "" ? true : false}
								// InputProps={{
								// 	readOnly: tipo === 1 ? false : true,
								// }}
								disabled={false}
							/>
						</Grid>
                        <Grid item xs={12}  sm={6} md={4}>
							<Typography sx={{ fontFamily: "sans-serif" }}>
								Celular:
							</Typography>
							<TextField
								required
								size="small"
								id="celular" 
								value={celular}
								type="text"
								fullWidth
								variant="outlined"
								onChange={(v) => setCelular(v.target.value)}
								// error={telefono === "" ? true : false}
								// InputProps={{
								// 	readOnly: tipo === 1 ? false : true,
								// }}
								disabled={false}
							/>
						</Grid>
                        <Grid item xs={12}  sm={6} md={4}>
							<Typography sx={{ fontFamily: "sans-serif" }}>
								Teléfono:
							</Typography>
							<TextField
								required
								size="small"
								id="telefono" 
								value={telefono}
								type="text"
								fullWidth
								variant="outlined"
								onChange={(v) => setTelefono(v.target.value)}
								// error={telefono === "" ? true : false}
								// InputProps={{
								// 	readOnly: tipo === 1 ? false : true,
								// }}
								disabled={false}
							/>
						</Grid>

						<Grid item xs={12} sm={6} md={4}>
							<Typography sx={{ fontFamily: "sans-serif" }}>
								Extensión:
							</Typography>
							<TextField
								required
								size="small"
								id="extension" 
								value={extension}
								type="text"
								fullWidth
								variant="outlined"
								onChange={(v) => setExtension(v.target.value)}
								// error={responsable === "" ? true : false}
								// InputProps={{
								// 	readOnly: tipo === 1 ? false : true,
								// }}
								disabled={false}
							/>
						</Grid>
					</Grid>
                    <Grid
						container
						alignItems="center"
						spacing={1}
						sx={{ mb: 3, mt: 4 }}
					>
						<Grid item xs={12} sm="auto">
							<Typography variant="body1" sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
								• Trabajo
							</Typography>
						</Grid>
						<Grid item xs>
							<Divider sx={{ borderColor: "#B0B0B0" }} />
						</Grid>
					</Grid>
                    <Grid item xs={12}  sm={6} md={4}>
							<Typography sx={{ fontFamily: "sans-serif" }}>
								Puesto:
							</Typography>
							<TextField
								required
								size="small"
								id="puesto" 
								value={puesto}
								type="text"
								fullWidth
								variant="outlined"
								onChange={(v) => setPuesto(v.target.value)}
								// error={telefono === "" ? true : false}
								// InputProps={{
								// 	readOnly: tipo === 1 ? false : true,
								// }}
								disabled={false}
							/>
						</Grid>

						<Grid item xs={12} sm={6} md={4}>
						<Typography sx={{ fontFamily: "sans-serif" }}>
								Unidad Administrativa:
							</Typography>
							<SelectFrag
								value={unidadAdmin}
								options={ListUnidadAdmin}
								onInputChange={handleFilterChangeUnidadAdmin}
								placeholder={"Seleccione.."}
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
            </Box>


        </ModalForm>
    </>)
}