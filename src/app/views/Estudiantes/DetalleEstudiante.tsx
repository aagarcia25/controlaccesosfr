import React from "react";
import { Box, Button, Divider, Grid, Typography, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const DetalleEstudiante = () => {
    const navigate = useNavigate();

	const handleClose = () => {
        navigate("/inicio/ControlEstudiantes");
    };
	return (
		<Box padding={4}>
			{/* Título */}
			<Typography variant="h4" align="center" gutterBottom sx={{ color: "#A57F52" }}>
				Detalle de Estudiante
			</Typography>

			{/* Encabezado con foto, nombre y botón de QR */}
			<Grid container alignItems="center" spacing={2} sx={{ mb: 4 }}>
				<Grid item xs={12} sm={3}>
					<Avatar
						alt="Foto de Estudiante"
						src="https://via.placeholder.com/150" // Reemplaza con la URL de la imagen del estudiante
						sx={{ width: 120, height: 120 }}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography variant="h6" sx={{ fontWeight: "bold" }}>
						Carlos Alberto Rodríguez Torres
					</Typography>
					<Typography>Horas Acumuladas: 400</Typography>
					<Typography>Periodo: 15/01/2024 - 15/06/2024</Typography>
				</Grid>
				<Grid item xs={12} sm={3} textAlign="right">
					<Button variant="contained" sx={{ backgroundColor: "black", color: "white" }}>
						Descargar QR
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
					<Grid item xs={12} sm={6}>
						<Typography>
							<strong>Unidad Administrativa:</strong> Despacho del Tesorero
						</Typography>
					</Grid>
					<Grid item xs={12} sm={3}>
						<Typography>
							<strong>Fecha de Vigencia (Inicio):</strong> 15/01/2024
						</Typography>
					</Grid>
					<Grid item xs={12} sm={3}>
						<Typography>
							<strong>Fecha de Vigencia (Fin):</strong> 15/06/2024
						</Typography>
					</Grid>
				</Grid>
			</Section>

			{/* Sección de Horario y Asistencia */}
			<Section title="Horario y Asistencia">
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<Typography>
							<strong>Frecuencia de Asistencia:</strong> Lunes, Miércoles, Viernes
						</Typography>
					</Grid>
					<Grid item xs={12} sm={3}>
						<Typography>
							<strong>Horario:</strong> 10:00 - 14:00
						</Typography>
					</Grid>
					<Grid item xs={12} sm={3}>
						<Typography>
							<strong>Cantidad de Horas:</strong> 400
						</Typography>
					</Grid>
				</Grid>
			</Section>

			{/* Botón de Cerrar */}
			<Box textAlign="center" sx={{ mt: 4 }}>
				<Button
					variant="contained"
					sx={{ backgroundColor: "#A57F52", color: "white", "&:hover": { backgroundColor: "#8C6B45" } }}
					 onClick={() => handleClose()}
				>
					CERRAR
				</Button>
			</Box>
		</Box>
	);
};

// Componente para las secciones con título y divisor
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
	<Box sx={{ mb: 3 }}>
		<Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#A57F52", mb: 1 }}>
			• {title}
		</Typography>
		<Divider sx={{ borderColor: "#B0B0B0", mb: 2 }} />
		{children}
	</Box>
);

export default DetalleEstudiante;
