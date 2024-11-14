import React from "react";
import { Box, Button, Divider, Grid, Typography, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DownloadIcon from "@mui/icons-material/Download";

export const DetalleEstudiante = () => {
	const navigate = useNavigate();

	const handleClose = () => {
		navigate("/inicio/ControlEstudiantes");
	};
	return (
		<Box padding={4}>
			{/* Título */}
			<Typography
				variant="h4"
				align="center"
				gutterBottom
				sx={{ color: "#A57F52", mb: 4 }}
			>
				Detalle de Estudiante
			</Typography>

			{/* Encabezado con foto, nombre y botón de QR */}
			<Grid
				container
				alignItems="center"
				spacing={2}
				justifyContent="space-between"
				sx={{ mb: 4 }}
			>
				<Grid item xs={12} sm={1} md={1} sx={{ textAlign: { xs: "center", sm: "left"} }}>
					<Avatar
						alt="Foto de Estudiante"
						src="https://via.placeholder.com/150" // Reemplaza con la URL de la imagen del estudiante
						sx={{ width: 120, height: 120, mx: { xs: "auto", sm: "initial" }}}
					/>
				</Grid>
				{/* Información del Estudiante */}
				<Grid item xs={12} sm={6} md={7} sx={{ textAlign: { xs: "center", sm: "left" } }} marginLeft={2}>
					{" "}
					{/* Reduce el marginLeft para acercar el texto a la imagen */}
					<Typography
						variant="h6"
						sx={{ fontWeight: "bold", color: "#A57F52" }}
					>
						Carlos Alberto Rodríguez Torres
					</Typography>
					<Typography sx={{ color: "#333" }}>
						Horas Acumuladas: 400
					</Typography>
					<Typography sx={{ color: "#555" }}>
						Periodo: 15/01/2024 - 15/06/2024
					</Typography>
				</Grid>
				<Grid
					item
					xs={12}
					sm={3}
					md={3}
					textAlign={{ xs: "center", sm: "right" }}
				>
					<Button
						variant="contained"
						sx={{
							backgroundColor: "black",
							color: "white",
							"&:hover": { backgroundColor: "grey.300", color: "black" },
							px: 3,
						}}
						startIcon={<DownloadIcon />} // Ícono de descarga de Material-UI
					>
						DESCARGAR QR
					</Button>
				</Grid>
			</Grid>

			{/* Sección de Información Básica */}
			<Section title="Información Básica">
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<Typography>
							<strong>Tipo de Estudiante:</strong> Servicio Social
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Typography>
							<strong>Número de Gafete:</strong> 1239485
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Typography>
							<strong>Teléfono:</strong> 555-654-3210
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Typography>
							<strong>Género:</strong> Masculino
						</Typography>
					</Grid>
				</Grid>
			</Section>

			{/* Sección de Información Académica */}
			<Section title="Información Académica">
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<Typography>
							<strong>Escolaridad:</strong> Licenciatura
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Typography>
							<strong>Persona Responsable:</strong> Lic. Ana Martínez
						</Typography>
					</Grid>
					<Grid item xs={12} sm={12}>
						<Typography>
							<strong>Instituto Educativo:</strong> Universidad Autónoma
						</Typography>
					</Grid>
				</Grid>
			</Section>

			{/* Sección de Información Administrativa */}
			<Section title="Información Administrativa">
				<Grid container spacing={2}>
					<Grid item xs={12} sm={12} display={"flex"}>
						<Typography sx={{ fontWeight: "bold" }}>
							Unidad Administrativa:
						</Typography>
						<Typography>Despacho del Tesorero</Typography>
					</Grid>
					<Grid item xs={12} sm={6} display={"flex"}>
						<Typography sx={{ fontWeight: "bold" }}>
							Fecha de Vigencia (Inicio):
						</Typography>
						<Typography>15/01/2024</Typography>
					</Grid>
					<Grid item xs={12} sm={6} display={"flex"}>
						<Typography sx={{ fontWeight: "bold" }}>
							Fecha de Vigencia (Fin):
						</Typography>
						<Typography>15/06/2024</Typography>
					</Grid>
				</Grid>
			</Section>

			{/* Sección de Horario y Asistencia */}
			<Section title="Horario y Asistencia">
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6} md={6} display={"flex"}>
						<Typography  sx={{ fontWeight: "bold" }}>
							Frecuencia de Asistencia:
						</Typography>
						<Typography >
							Lunes, Miércoles, Viernes
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6} md={6} display={"flex"}>
						<Typography  sx={{ fontWeight: "bold" }}>
							Horario:
						</Typography>
						<Typography  >10:00 - 14:00</Typography>
					</Grid>
					<Grid item xs={12} sm={6} md={6} display={"flex"}>
						<Typography   sx={{ fontWeight: "bold" }}>
							Inicio del Programa:
						</Typography>
						<Typography  >15/01/2024</Typography>
					</Grid>
					<Grid item xs={12} sm={6} md={6} display={"flex"}>
						<Typography sx={{ fontWeight: "bold" }}>
							Fin del Programa:
						</Typography>
						<Typography >15/06/2024</Typography>
					</Grid>
					<Grid item xs={12} sm={6} md={6} display={"flex"}>
						<Typography   sx={{ fontWeight: "bold" }}>
							Cantidad de Horas:
						</Typography>
						<Typography  >400</Typography>
					</Grid>
					<Grid item xs={12} sm={6} md={6} display={"flex"}>
						<Typography   sx={{ fontWeight: "bold" }}>
							Horas Acumuladas:
						</Typography>
						<Typography  >400</Typography>
					</Grid>
				</Grid>
			</Section>

			{/* Botón de Cerrar */}
			<Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
				<Button
					variant="contained"
					sx={{
						backgroundColor: "#A57F52",
						color: "white",
						"&:hover": { backgroundColor: "grey.300",color: "black"},
					}}
					onClick={() => handleClose()}
				>
					CERRAR
				</Button>
			</Box>
		</Box>
	);
};

// Componente para las secciones con título y divisor
const Section = ({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) => (
	<Box sx={{ mb: 3 }}>
		<Grid container alignItems="center" spacing={1} sx={{ mb: 1 }}>
			<Grid item xs={12} sm={2}>
				<Typography
					variant="subtitle1"
					sx={{ fontWeight: "bold", color: "#A57F52" }}
				>
					• {title}
				</Typography>
			</Grid>
			<Grid item xs={12} sm={10}>
				<Divider sx={{ borderColor: "#B0B0B0", borderBottomWidth: 1 }} />
			</Grid>
			<Grid item xs={12} sm={12}>
				{children}
			</Grid>
		</Grid>
	</Box>
);

export default DetalleEstudiante;
