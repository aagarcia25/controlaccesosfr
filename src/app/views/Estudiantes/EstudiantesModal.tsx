import { useEffect, useState } from "react";
import ModalForm from "../componentes/ModalForm";
import { log } from "console";
import Progress from "../Progress";
import {
	Box,
	Button,
	Checkbox,
	Divider,
	FormControlLabel,
	Grid,
	TextField,
	Typography,
} from "@mui/material";
import SelectFrag from "../componentes/SelectFrag";
import SelectValues from "../../interfaces/Share";
import CustomizedDate from "../componentes/CustomizedDate";
import dayjs, { Dayjs } from "dayjs";
import { ShareService } from "../../services/ShareService";
import {
	TimePicker,
	DatePicker,
	LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { USUARIORESPONSE } from "../../interfaces/UserInfo";
import { getUser } from "../../services/localStorage";
import Swal from "sweetalert2";
import { CatalogosServices } from "../../services/catalogosServices";
import { Toast } from "../../helpers/Toast";
import { set } from "date-fns";
import axios from "axios";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

export const EstudiantesModal = ({
	tipo,
	dt,
	handleClose,
}: {
	tipo: number;
	dt: any;
	handleClose: Function;
}) => {
	const [id, setId] = useState("");
	const [show, setShow] = useState(false);
	const [tipoEstudiante, setTipoEstudiante] = useState("");
	const [ListTipoEstudiante, setListTipoEstudiante] = useState<SelectValues[]>(
		[]
	);
	const user: USUARIORESPONSE = JSON.parse(String(getUser()));
	const [genero, setGenero] = useState("");
	const [ListGenero, setListGenero] = useState<SelectValues[]>([]);
	const [unidadAdmin, setUnidadAdmin] = useState("");
	const [ListUnidadAdmin, setListUnidadAdmin] = useState<SelectValues[]>([]);
	const [NoGaffete, setNoGaffete] = useState("");
	const [nombre, setNombre] = useState("");
	const [telefono, setTelefono] = useState("");
	const [email, setemail] = useState("");
	const [escolaridad, setEscolaridad] = useState("");
	const [ListEscolaridad, setListEscolaridad] = useState<SelectValues[]>([]);
	const [instituto, setInstituto] = useState("");
	const [ListInstituto, setListInstituto] = useState<SelectValues[]>([]);
	const [responsable, setResponsable] = useState("");
	const [fInicio, setFInicio] = useState<Dayjs | null>();
	const [fFin, setFFin] = useState<Dayjs | null>();
	//const [inicioPrograma, setInicioPrograma] = useState<Dayjs | null>(null);
	//const [finPrograma, setFinPrograma] = useState<Dayjs | null>(null);
	const [horarioDesde, setHorarioDesde] = useState<Dayjs | null>(null);
	const [horarioHasta, setHorarioHasta] = useState<Dayjs | null>(null);
	// const [frecuenciaAsistencia, setFrecuenciaAsistencia] = useState({
	// 	lunes: false,
	// 	martes: false,
	// 	miercoles: false,
	// 	jueves: false,
	// 	viernes: false,
	// });

	const handleFilterChangeTipoEstudiante = (v: string) => {
		setTipoEstudiante(v);
	};
	const handleFilterChangeGenero = (v: string) => {
		setGenero(v);
	};
	const handleFilterChangeUnidadAdmin = (v: string) => {
		setUnidadAdmin(v);
	};
	const handleFilterChangeInstituto = (v: string) => {
		setInstituto(v);
	};
	const handleFilterChangeEscolaridad = (v: string) => {
		setEscolaridad(v);
	};
	
	const handleFilterChangeFInicio = (v: any) => {
		setFInicio(v);
	};
	const handleFilterChangeFFin = (v: any) => {
		setFFin(v);
	};
	// const handleFrecuenciaChange = (day: keyof typeof frecuenciaAsistencia) => {
	// 	setFrecuenciaAsistencia((prev) => ({
	// 		...prev,
	// 		[day]: !prev[day],
	// 	}));
	// };


	const loadFilter = (operacion: number, P_ID?: string) => {
		setShow(true);
		let data = { NUMOPERACION: operacion, P_ID: P_ID };
		ShareService.SelectIndex(data).then((res) => {
			if (operacion === 12) {
				console.log("12");
				
				setListGenero(res.RESPONSE);
				setShow(false);
			} else if (operacion === 13) {
				setListTipoEstudiante(res.RESPONSE);
				setShow(false);
			} else if (operacion === 11) {
				setListUnidadAdmin(res.RESPONSE);
				setShow(false);
			}
		});
	};
	
	  
	const loadCatEscolaridad = async () => {
		try {
			const response = await axios.get(process.env.REACT_APP_APPLICATION_BASE_URL+'catalogo/Cat_Escolaridad');
			if (response.data.SUCCESS) {
				// Mapeamos los datos al formato esperado por SelectValues
				const formattedData = response.data.RESPONSE.map((item: any) => ({
					value: item.id,
					label: item.Nombre,
				}));
				setListEscolaridad(formattedData);
			} else {
				console.error("Error en la respuesta: ", response.data.STRMESSAGE);
			}
		} catch (error) {
			console.error("Error al obtener los datos: ", error);
		}
	};

	const loadCatInstituto = async () => {
		try {
			const response = await axios.get(process.env.REACT_APP_APPLICATION_BASE_URL+'catalogo/Cat_Institucion_Educativa');
			if (response.data.SUCCESS) {
				// Mapeamos los datos al formato esperado por SelectValues
				const formattedData = response.data.RESPONSE.map((item: any) => ({
					value: item.id,
					label: item.Nombre,
				}));
				setListInstituto(formattedData);
			} else {
				console.error("Error en la respuesta: ", response.data.STRMESSAGE);
			}
		} catch (error) {
			console.error("Error al obtener los datos: ", error);
		}
	};
	
	
	const [frecuenciaAsistencia, setFrecuenciaAsistencia] = useState<{
		lunes: boolean;
		martes: boolean;
		miercoles: boolean;
		jueves: boolean;
		viernes: boolean;
	  }>({
		lunes: false,
		martes: false,
		miercoles: false,
		jueves: false,
		viernes: false,
	  });
	  
	  // Función para manejar el cambio de la frecuencia
	  const handleFrecuenciaChange = (day: keyof typeof frecuenciaAsistencia) => {
		setFrecuenciaAsistencia({
		  ...frecuenciaAsistencia,
		  [day]: !frecuenciaAsistencia[day], // Cambiar el valor de la propiedad correspondiente
		});
	  };
	  
	  // Código para registrar los datos
	  const handleRegister = () => {
		if (
		  !nombre ||
		  !genero ||
		  !fInicio ||
		  !fFin ||
		  !telefono ||
		  !tipoEstudiante ||
		  !escolaridad ||
		  !instituto ||
		  !responsable ||
		  !escolaridad ||
		  !unidadAdmin ||
		  !horarioDesde ||
		  !horarioHasta
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

		
	  
		  // Crear la cadena de días seleccionados
		  const frecuenciaSeleccionada = Object.keys(frecuenciaAsistencia)
			.filter((day) => frecuenciaAsistencia[day as keyof typeof frecuenciaAsistencia])  // Filtra los días marcados como 'true'
			.join(","); // Une los días con coma
	  console.log("frecuenciaAsistencia",frecuenciaAsistencia);
	  
		  let data = {
			NUMOPERACION: tipo,
			CHID: id,
			CHUSER: user.Id,
			TipoEstudiante: tipoEstudiante,
			Nombre: nombre,
			UnidadAdministrativa: unidadAdmin,
			FechaInicio: fInicio,
			FechaFin: fFin,
			Telefono: telefono,
			Sexo: genero,
			Escolaridad: escolaridad,
			InstitucionEducativa: instituto,
			PersonaResponsable: responsable,
			NoGaffete: NoGaffete,
			Correo: email,
			HorarioDesde: horarioDesde ? horarioDesde.format("YYYY-MM-DD HH:mm:ss") : null,
    HorarioHasta: horarioHasta ? horarioHasta.format("YYYY-MM-DD HH:mm:ss") : null,
			frecuenciaAsistencia: frecuenciaSeleccionada,  // Añadir la cadena con los días seleccionados
		  };
	  
		  if (tipo == 1) {
			console.log("frecuenciaSeleccionada",frecuenciaSeleccionada);
			
			agregar(data);
		  } else if (tipo === 2) {
			editar(data);
		  }
		}
	  };
	  
	  
	  
	  

	  const agregar = (data: any) => {
		CatalogosServices.Estudiante(data).then((res) => {
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
		CatalogosServices.Estudiante(data).then((res) => {
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
		console.log("frecuenciaAsistencia",frecuenciaAsistencia);
		console.log("dt",dt);
		
		loadFilter(12);
		loadFilter(13);
		loadFilter(11);
		loadCatEscolaridad();
		loadCatInstituto();

		if (Object.keys(dt).length === 0) {
		} else {
			setId(dt?.row?.id);

			//setId(dt?.row?.id);}
			setTipoEstudiante(dt?.row?.TipoEstudiante);
			setGenero(dt?.row?.Sexo);
			setUnidadAdmin(dt?.row?.IdEntidad);
			setNoGaffete(dt?.row?.NoGaffete);
			setNombre(dt?.row?.Nombre);
			setTelefono(dt?.row?.Telefono);
			setemail(dt?.row?.Correo);
			setEscolaridad(dt?.row?.IdEscolaridad);
			//setListEscolaridad(dt?.row?.Escolaridad);
			//setListInstituto(dt?.row?.Escolaridad);
			setInstituto(dt?.row?.IdInstitucionEducativa);
			setResponsable(dt?.row?.PersonaResponsable);
			//setFrecuenciaAsistencia(dt.row.Frecuencia);
			console.log("HorarioDesde en base de datos:", dt.row.HorarioDesde);
        console.log(
            "HorarioDesde interpretado:",
            dt.row.HorarioDesde ? dayjs(dt.row.HorarioDesde, "HH:mm:ss").format("HH:mm:ss") : null
        );

        setHorarioDesde(()=>{
			let hora 
			if(dt.row.HorarioDesde)
				 hora = dt.row.HorarioDesde.split(" ")[1];
			return dayjs(hora, "HH:mm:ss")||null; 
		}
			// dt.row.HorarioDesde
			// 	? dayjs.utc(dt.row.HorarioDesde).tz("America/Mexico_City")
			// 	: null
		);
		
        setHorarioHasta(()=>{
			let hora 
			if(dt.row.HorarioHasta)
			 hora = dt.row.HorarioHasta.split(" ")[1];
			return dayjs(hora, "HH:mm:ss")||null; 
		}
            // dt.row.HorarioHasta ? dayjs(dt.row.HorarioHasta, "HH:mm:ss") : null
        );


			if (fInicio !== null) {
				setFInicio(dayjs(dt?.row?.FechaInicio)); // Almacena un objeto Dayjs
			}
			
			
			//   if (fFin !== null && FVencimiento !== undefined) {
			//     setFVencimiento(dayjs(dt?.row?.FVencimiento,'DD-MM-YYYY'));
			//     setSwitchValue(true);
			//   }
			// if (fFin !== null) {
			// 	setFFin(dayjs(dt?.row?.FechaFin, "DD-MM-YYYY"));
			// }
			if (fFin !== null) {
				setFFin(dayjs(dt?.row?.FechaFin)); // Almacena un objeto Dayjs
			}
			//   if (Prorroga !== null && Prorroga !== undefined) {
			//     setProrroga(dayjs(dt?.row?.Prorroga,'DD-MM-YYYY'));
			//     setSwitchValue(true);
			//   }
		}
	}, [dt]);
	useEffect(() => {
		if (Object.keys(dt).length !== 0) {
			const frecuencia = dt.row.Frecuencia
				? dt.row.Frecuencia.split(",").reduce((acc: typeof frecuenciaAsistencia, day: string) => {
					  acc[day as keyof typeof frecuenciaAsistencia] = true; // Asegúrate de que el día exista en las claves
					  return acc;
				  }, { lunes: false, martes: false, miercoles: false, jueves: false, viernes: false })
				: { lunes: false, martes: false, miercoles: false, jueves: false, viernes: false };
	
			setFrecuenciaAsistencia(frecuencia);
			console.log("Frecuencia cargada:", frecuencia);
		}
	}, [dt]);
	useEffect(() => {
		console.log("frecuenciaAsistencia",frecuenciaAsistencia);
		console.log("");
		console.log("dt", dt);
	}, [frecuenciaAsistencia]);
	return (
		<>
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
							<Typography sx={{ fontFamily: "sans-serif" }}>
								Tipo de Estudiante:
							</Typography>
							<SelectFrag
								value={tipoEstudiante}
								options={ListTipoEstudiante}
								onInputChange={handleFilterChangeTipoEstudiante}
								placeholder={"Seleccione.."}
								disabled={false}
							/>
						</Grid>

						<Grid item xs={12} sm={6} md={4}>
							<Typography sx={{ fontFamily: "sans-serif" }}>
								Número de Gafete
							</Typography>
							<TextField
								required
								size="small"
								id="NoGaffete"
								value={NoGaffete}
								type="text"
								fullWidth
								variant="outlined"
								onChange={(v) => setNoGaffete(v.target.value)}
								// error={NoGaffete === "" ? true : false}
								// InputProps={{
								// 	readOnly: tipo === 1 ? false : true,
								// }}
								disabled={false}
							/>
						</Grid>

						<Grid item xs={12} sm={12} md={12}>
							<Typography sx={{ fontFamily: "sans-serif" }}>
								Nombre Completo:
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
								Email:
							</Typography>
							<TextField
								required
								size="small"
								id="email" 
								value={email}
								type="text"
								fullWidth
								variant="outlined"
								onChange={(v) => setemail(v.target.value)}
								// error={email === "" ? true : false}
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

						<Grid item xs={12}  sm={6} md={4}>
							<Typography sx={{ fontFamily: "sans-serif" }}>
								Género:
							</Typography>
							<SelectFrag
								value={genero}
								options={ListGenero}
								onInputChange={handleFilterChangeGenero}
								placeholder={"Seleccione.."}
								disabled={false}
							/>
						</Grid>
					</Grid>

					{/* Información Académica */}
					<Grid
						container
						alignItems="center"
						spacing={1}
						sx={{ mb: 3, mt: 4 }}
					>
						<Grid item xs={12} sm="auto">
							<Typography variant="body1" sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
								• Información Académica
							</Typography>
						</Grid>
						<Grid item xs>
							<Divider sx={{ borderColor: "#B0B0B0" }} />
						</Grid>
					</Grid>

					{/* Contenido de Información Académica */}
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6} md={4}>
						<Typography sx={{ fontFamily: "sans-serif" }}>
								Escolaridad:
							</Typography>
							<SelectFrag
								value={escolaridad}
								options={ListEscolaridad}
								onInputChange={handleFilterChangeEscolaridad}
								placeholder={"Seleccione.."}
								disabled={false}
							/>
						</Grid>

						<Grid item xs={12} sm={6} md={4}>
						<Typography sx={{ fontFamily: "sans-serif" }}>
								Instituto Educativo:
							</Typography>
							<SelectFrag
								value={instituto}
								options={ListInstituto}
								onInputChange={handleFilterChangeInstituto}
								placeholder={"Seleccione.."}
								disabled={false}
							/>
						</Grid>

						<Grid item xs={12} sm={6} md={4}>
							<Typography sx={{ fontFamily: "sans-serif" }}>
								Persona Responsable
							</Typography>
							<TextField
								required
								size="small"
								id="responsable" 
								value={responsable}
								type="text"
								fullWidth
								variant="outlined"
								onChange={(v) => setResponsable(v.target.value)}
								// error={responsable === "" ? true : false}
								// InputProps={{
								// 	readOnly: tipo === 1 ? false : true,
								// }}
								disabled={false}
							/>
						</Grid>
					</Grid>

					{/*  Contenido de Información Administrativa*/}
					<Grid
						container
						alignItems="center"
						spacing={1}
						sx={{ mb: 3, mt: 4 }}
					>
						<Grid item xs={12} sm="auto">
							<Typography variant="body1" sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
								• Información Administrativa
							</Typography>
						</Grid>
						<Grid item xs>
							<Divider sx={{ borderColor: "#B0B0B0" }} />
						</Grid>
					</Grid>

					<Grid container spacing={2}>
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

						<Grid item xs={12} sm={6} md={4}>
							<CustomizedDate
								value={fInicio}
								label={"Fecha de Vigencia (Inicio)"}
								onchange={handleFilterChangeFInicio}
							/>
						</Grid>

						<Grid item xs={12} sm={6} md={4}>
							<CustomizedDate
								value={fFin}
								label={"Fecha de Vigencia (Fin)"}
								onchange={handleFilterChangeFFin}
							/>
						</Grid>
					</Grid>

					{/*  Contenido de Horario y Asistencia*/}
					<Grid
						container
						alignItems="center"
						spacing={1}
						sx={{ mb: 3, mt: 4 }}
					>
						<Grid item xs={12} sm="auto">
							<Typography variant="body1" sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
								• Horario y Asistencia
							</Typography>
						</Grid>
						<Grid item xs>
							<Divider sx={{ borderColor: "#B0B0B0" }} />
						</Grid>
					</Grid>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<Grid container spacing={2} alignItems="center">
							<Grid item xs={4}>
								<Typography variant="body2">
									Frecuencia de Asistencia:
								</Typography>
								<Grid container spacing={1} sx={{ mt: 1 }}>
									{[
										"lunes",
										"martes",
										"miercoles",
										"jueves",
										"viernes",
									].map((day) => (
										<Grid item key={day}>
											<FormControlLabel
												control={
													<Checkbox
														checked={
															frecuenciaAsistencia[
																day as keyof typeof frecuenciaAsistencia
															]
														}
														onChange={() =>
															handleFrecuenciaChange(
																day as keyof typeof frecuenciaAsistencia
															)
														}
													/>
												}
												label={
													day.charAt(0).toUpperCase() +
													day.slice(1)
												}
											/>
										</Grid>
									))}
								</Grid>
							</Grid>

							{/* Horario (Inicio) */}
							<Grid item xs={12} sm={6} md={4}>
								<Typography variant="body2">
									Horario (Inicio)
								</Typography>
								<TimePicker
									value={horarioDesde}
									onChange={(newTime) => setHorarioDesde(newTime)}
									slotProps={{
										textField: {
											fullWidth: true,
											variant: "outlined",
											size: "small",
										},
									}}
								/>
							</Grid>

							{/* Horario (Fin) */}
							<Grid item xs={12} sm={6} md={4}>
								<Typography variant="body2">Horario (Fin)</Typography>
								<TimePicker
									value={horarioHasta}
									onChange={(newTime) => setHorarioHasta(newTime)}
									slotProps={{
										textField: {
											fullWidth: true,
											variant: "outlined",
											size: "small",
										},
									}}
								/>
							</Grid>

							{/* Inicio Programa */}
							<Grid item xs={12} sm={6} md={4}>
								{/* <Typography variant="body2">Inicio programa</Typography>
								<DatePicker
									value={inicioPrograma}
									onChange={(newDate) => setInicioPrograma(newDate)}
									slotProps={{
										textField: {
											fullWidth: true,
											variant: "outlined",
											size: "small",
										},
									}}
								/> */}
							</Grid>

							{/* Fin Programa */}
							<Grid item xs={12} sm={6} md={4}>
								{/* <Typography variant="body2">Fin programa</Typography>
								<DatePicker
									value={finPrograma}
									onChange={(newDate) => setFinPrograma(newDate)}
									slotProps={{
										textField: {
											fullWidth: true,
											variant: "outlined",
											size: "small",
										},
									}}
								/> */}
							</Grid>
						</Grid>
					</LocalizationProvider>

					{/*  Contenido de Información de Horas*/}
					{/* <Grid
						container
						alignItems="center"
						spacing={1}
						sx={{ mb: 3, mt: 4 }}
					>
						<Grid item xs={12} sm="auto">
							<Typography variant="body1" sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
								• Información de Horas
							</Typography>
						</Grid>
						<Grid item xs>
							<Divider sx={{ borderColor: "#B0B0B0" }} />
						</Grid>
					</Grid> */}

					<Grid container spacing={2}>
						{/* Cantidad de Horas */}
						{/* <Grid item xs={12} sm={6} md={4}>
							<Typography sx={{ fontFamily: "sans-serif" }}>
								Cantidad de Horas
							</Typography>
							<TextField
								size="small"
								fullWidth
								variant="outlined"
								value="400"
								InputProps={{
									readOnly: tipo !== 1, // Hazlo editable o no dependiendo del valor de `tipo`
								}}
							/>
						</Grid>

						<Grid item xs={12} sm={6} md={4}>
							<Typography
								sx={{
									fontFamily: "sans-serif",
									color: "text.secondary",
								}}
							>
								Horas Acumuladas
							</Typography>
							<TextField
								size="small"
								fullWidth
								variant="outlined"
								value="400"
								disabled
							/>
						</Grid> */}

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
		</>
	);
};
