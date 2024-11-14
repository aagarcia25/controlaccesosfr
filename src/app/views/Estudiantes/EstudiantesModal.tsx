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

export const EstudiantesModal = ({
	tipo,
	dt,
	handleClose,
}: {
	tipo: number;
	dt: any;
	handleClose: Function;
}) => {
	const [show, setShow] = useState(false);
	const [tipoEstudiante, setTipoEstudiante] = useState("");
	const [ListTipoEstudiante, setListTipoEstudiante] = useState<SelectValues[]>(
		[]
	);
	const [genero, setGenero] = useState("");
	const [ListGenero, setListGenero] = useState<SelectValues[]>([]);
	const [unidadAdmin, setUnidadAdmin] = useState("");
	const [ListUnidadAdmin, setListUnidadAdmin] = useState<SelectValues[]>([]);
	const [NoGaffete, setNoGaffete] = useState("");
	const [nombre, setNombre] = useState("");
	const [telefono, setTelefono] = useState("");
	const [escolaridad, setEscolaridad] = useState("");
	const [instituto, setInstituto] = useState("");
	const [responsable, setResponsable] = useState("");
	const [fInicio, setFInicio] = useState<Dayjs | null>();
	const [fFin, setFFin] = useState<Dayjs | null>();
	const [inicioPrograma, setInicioPrograma] = useState<Dayjs | null>(null);
	const [finPrograma, setFinPrograma] = useState<Dayjs | null>(null);
	const [horarioInicio, setHorarioInicio] = useState<Dayjs | null>(null);
	const [horarioFin, setHorarioFin] = useState<Dayjs | null>(null);
	const [frecuenciaAsistencia, setFrecuenciaAsistencia] = useState({
		lunes: false,
		martes: false,
		miercoles: false,
		jueves: false,
		viernes: false,
	});

	const handleFilterChangeTipoEstudiante = (v: string) => {
		setTipoEstudiante(v);
	};
	const handleFilterChangeGenero = (v: string) => {
		setGenero(v);
	};
	const handleFilterChangeUnidadAdmin = (v: string) => {
		setUnidadAdmin(v);
	};
	const handleFilterChangeFInicio = (v: any) => {
		setFInicio(v);
	};
	const handleFilterChangeFFin = (v: any) => {
		setFFin(v);
	};
	const handleFrecuenciaChange = (day: keyof typeof frecuenciaAsistencia) => {
		setFrecuenciaAsistencia((prev) => ({
			...prev,
			[day]: !prev[day],
		}));
	};

	const loadFilter = (operacion: number, P_ID?: string) => {
		setShow(true);
		let data = { NUMOPERACION: operacion, P_ID: P_ID };
		ShareService.SelectIndex(data).then((res) => {
			if (operacion === 12) {
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

	useEffect(() => {
		loadFilter(12);
		loadFilter(13);
		loadFilter(11);

		if (Object.keys(dt).length === 0) {
		} else {
			//setId(dt?.row?.id);}
			setTipoEstudiante(dt?.row?.TipoEstudiante);
			setGenero(dt?.row?.Sexo);
			setUnidadAdmin(dt?.row?.UnidadAdministrativa);
			setNoGaffete(dt?.row?.NoGaffete);
			setNombre(dt?.row?.Nombre);
			setTelefono(dt?.row?.Telefono);
			setEscolaridad(dt?.row?.Escolaridad);
			setInstituto(dt?.row?.InstitucionEducativa);
			setResponsable(dt?.row?.PersonaResponsable);

			if (fInicio !== null) {
				setFInicio(dayjs(dt?.row?.FechaInicio, "DD-MM-YYYY"));
			}
			//   if (fFin !== null && FVencimiento !== undefined) {
			//     setFVencimiento(dayjs(dt?.row?.FVencimiento,'DD-MM-YYYY'));
			//     setSwitchValue(true);
			//   }
			if (fFin !== null) {
				setFFin(dayjs(dt?.row?.FechaFin, "DD-MM-YYYY"));
			}
			//   if (Prorroga !== null && Prorroga !== undefined) {
			//     setProrroga(dayjs(dt?.row?.Prorroga,'DD-MM-YYYY'));
			//     setSwitchValue(true);
			//   }
		}
	}, [dt]);
	useEffect(() => {
		console.log("dt", dt);
	}, []);
	return (
		<>
			<ModalForm
				title={tipo === 1 ? "Agregar Registro" : "Editar Registro"}
				handleClose={handleClose}
			>
				<Progress open={show}></Progress>
				<Box margin={2} padding={2}>
					{/* Información Básica */}
					<Grid container alignItems="center" spacing={1} sx={{ mb: 1 }}>
						<Grid item xs={12} sm="auto">
							<Typography variant="body1" sx={{ fontWeight: "bold" }}>
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
								label="Número de Gafete"
								value={NoGaffete}
								type="text"
								fullWidth
								variant="outlined"
								onChange={(v) => setNoGaffete(v.target.value)}
								// error={NoGaffete === "" ? true : false}
								InputProps={{
									readOnly: tipo === 1 ? false : true,
								}}
								disabled={false}
							/>
						</Grid>

						<Grid item xs={12} sm={6} md={6}>
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
								InputProps={{
									readOnly: tipo === 1 ? false : true,
								}}
								disabled={false}
							/>
						</Grid>

						<Grid item xs={12} sm={3} md={3}>
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
								InputProps={{
									readOnly: tipo === 1 ? false : true,
								}}
								disabled={false}
							/>
						</Grid>

						<Grid item xs={12} sm={3} md={3}>
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
						sx={{ mb: 1, marginTop: 2 }}
					>
						<Grid item xs={12} sm="auto">
							<Typography variant="body1" sx={{ fontWeight: "bold" }}>
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
								Escolaridad
							</Typography>
							<TextField
								required
								size="small"
								id="escolaridad" 
								value={escolaridad}
								type="text"
								fullWidth
								variant="outlined"
								onChange={(v) => setEscolaridad(v.target.value)}
								// error={escolaridad === "" ? true : false}
								InputProps={{
									readOnly: tipo === 1 ? false : true,
								}}
								disabled={false}
							/>
						</Grid>

						<Grid item xs={12} sm={6} md={4}>
							<Typography sx={{ fontFamily: "sans-serif" }}>
								Instituto Educativo
							</Typography>
							<TextField
								required
								size="small"
								id="instituto" 
								value={instituto}
								type="text"
								fullWidth
								variant="outlined"
								onChange={(v) => setInstituto(v.target.value)}
								// error={instituto === "" ? true : false}
								InputProps={{
									readOnly: tipo === 1 ? false : true,
								}}
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
								InputProps={{
									readOnly: tipo === 1 ? false : true,
								}}
								disabled={false}
							/>
						</Grid>
					</Grid>

					{/*  Contenido de Información Administrativa*/}
					<Grid
						container
						alignItems="center"
						spacing={1}
						sx={{ mb: 1, marginTop: 2 }}
					>
						<Grid item xs={12} sm="auto">
							<Typography variant="body1" sx={{ fontWeight: "bold" }}>
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
								value={fFin}
								label={"Fecha de Vigencia (Fin)"}
								onchange={handleFilterChangeFFin}
							/>
						</Grid>

						<Grid item xs={12} sm={6} md={4}>
							<CustomizedDate
								value={fInicio}
								label={"Fecha de Vigencia (Inicio)"}
								onchange={handleFilterChangeFInicio}
							/>
						</Grid>
					</Grid>

					{/*  Contenido de Horario y Asistencia*/}
					<Grid
						container
						alignItems="center"
						spacing={1}
						sx={{ mb: 1, marginTop: 2 }}
					>
						<Grid item xs={12} sm="auto">
							<Typography variant="body1" sx={{ fontWeight: "bold" }}>
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
									value={horarioInicio}
									onChange={(newTime) => setHorarioInicio(newTime)}
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
									value={horarioFin}
									onChange={(newTime) => setHorarioFin(newTime)}
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
								<Typography variant="body2">Inicio programa</Typography>
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
								/>
							</Grid>

							{/* Fin Programa */}
							<Grid item xs={12} sm={6} md={4}>
								<Typography variant="body2">Fin programa</Typography>
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
								/>
							</Grid>
						</Grid>
					</LocalizationProvider>

					{/*  Contenido de Información de Horas*/}
					<Grid
						container
						alignItems="center"
						spacing={1}
						sx={{ mb: 1, marginTop: 2 }}
					>
						<Grid item xs={12} sm="auto">
							<Typography variant="body1" sx={{ fontWeight: "bold" }}>
								• Información de Horas
							</Typography>
						</Grid>
						<Grid item xs>
							<Divider sx={{ borderColor: "#B0B0B0" }} />
						</Grid>
					</Grid>

					<Grid container spacing={2}>
						{/* Cantidad de Horas */}
						<Grid item xs={12} sm={6} md={4}>
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
									// onClick={() => handleRegister()} // Añade la acción deseada para el botón de registrar
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
