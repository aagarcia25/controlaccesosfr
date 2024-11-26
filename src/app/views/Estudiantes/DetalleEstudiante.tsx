import React, { useEffect, useState } from "react";
import { Box, Button, Divider, Grid, Typography, Avatar, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DownloadIcon from "@mui/icons-material/Download";
import { CatalogosServices } from "../../services/catalogosServices";
import { base64ToArrayBuffer } from "../../helpers/Files";
import { getToken, getUser } from "../../services/localStorage";
import Swal from "sweetalert2";
import { json } from "stream/consumers";
import { Toast } from "../../helpers/Toast";
import { USUARIORESPONSE } from "../../interfaces/UserInfo";
import axios from "axios";
import { formatFecha } from "../../helpers/FormatDate";
import { FlowFlags } from "typescript";
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';


export const DetalleEstudiante = (
	{ dataGlobal }: { dataGlobal: any }
) => {
	const [verarchivo, setverarchivo] = useState(false);
	const [URLruta, setURLRuta] = useState<string>("");
	const [id, setId] = useState("");
	const user: USUARIORESPONSE = JSON.parse(String(getUser()));


	const navigate = useNavigate();

	const handleClose = () => {
		navigate("/inicio/ControlEstudiantes");
	};

	const descargaQR = () => {
		let data = {
			id: dataGlobal.id,
			CHUSER: user.Id,
		};

		axios.get(process.env.REACT_APP_APPLICATION_BASE_URL + 'makeQrEstudiante', {
			params: data,
			responseType: 'blob' // aseguramos que la respuesta se maneje como un blob
		})
			.then((response) => {
				console.log("dataGlobal", dataGlobal);

				// Crear un enlace para descargar el PDF
				const blob = new Blob([response.data], { type: 'application/pdf' });
				const link = document.createElement('a');
				link.href = URL.createObjectURL(blob);
				link.download = dataGlobal.row.Nombre + '.pdf';
				link.click(); // Simula el clic para iniciar la descarga
			})
			.catch((error) => {
				console.error('Error al descargar el archivo PDF:', error);
			});


		// CatalogosServices.makeQrEstudiante(data).then((response) => {
		// 	 // Crear un enlace para descargar el PDF
		// 	 const blob = new Blob([response.data], { type: 'application/pdf' });
		// 	 const link = document.createElement('a');
		// 	 link.href = URL.createObjectURL(blob);
		// 	 link.download = 'documento.pdf'; // Nombre por defecto para el archivo descargado
		// 	 link.click(); // Simula el clic para iniciar la descarga
		// //   if (res.SUCCESS) {
		// // 	if (res.STRMESSAGE) {
		// // 	  // El backend devuelve el PDF en formato base64
		// // 	  const base64String = res.STRMESSAGE; // Asume que STRMESSAGE es la cadena base64 del PDF

		// // 	  // Crear un Blob a partir del base64
		// // 	  const byteCharacters = atob(base64String); // Decodifica el base64

		// // 	  const byteArrays = [];
		// // 	  for (let offset = 0; offset < byteCharacters.length; offset++) {
		// // 		const byteArray = new Uint8Array(1);
		// // 		byteArray[0] = byteCharacters.charCodeAt(offset);
		// // 		byteArrays.push(byteArray);
		// // 	  }

		// // 	  // Crear un Blob con los datos binarios del PDF
		// // 	  const blob = new Blob(byteArrays, { type: 'application/pdf' });

		// // 	  // Crear un enlace para la descarga del PDF
		// // 	  const link = document.createElement('a');
		// // 	  link.href = URL.createObjectURL(blob);
		// // 	  link.download = 'QR_Estudiante.pdf'; // Nombre del archivo a descargar

		// // 	  // Simular un clic en el enlace para descargar el archivo
		// // 	  link.click();

		// // 	  // Mostrar el mensaje de éxito
		// // 	  Toast.fire({
		// // 		icon: 'success',
		// // 		title: '¡QR Generado y descargado!',
		// // 	  });
		// // 	} else {
		// // 	  Swal.fire("¡Error!", "No se pudo generar el QR", "error");
		// // 	}
		// //   } else {
		// // 	Swal.fire("¡Error!", res.STRMESSAGE, "error");
		// //   }
		// }).catch((error) => {
		//   Swal.fire("¡Error!", "Hubo un problema al generar el QR.", "error");
		// });
	};


	// 	const handleVer = (v: any) => {
	//         setverarchivo(false);

	//     //setOpenSlider(true);
	//     let data = {
	//       NUMOPERACION: 6,
	//       P_ROUTE: dataGlobal.row.id,
	//       TOKEN: JSON.parse(String(getToken())),
	//     };
	// console.log("dataGlobal.row.id",dataGlobal.row.id,);

	//     CatalogosServices.Estudiante(data).then((res) => {
	// 			console.log("res.SUCCESS",res.SUCCESS);
	//       if (res.SUCCESS) {


	//         var bufferArray = base64ToArrayBuffer(String(res.RESPONSE.FILE));
	//         var blobStore = new Blob([bufferArray], { type: res.RESPONSE.TIPO }); //type:"application/pdf"
	//         var data = window.URL.createObjectURL(blobStore);
	//         var link = document.createElement("a");
	//         document.body.appendChild(link);
	//         link.download = "Documento.pdf";
	//         link.href = data;
	//         setURLRuta(link.href);
	//         //setOpenSlider(false);
	//         setverarchivo(true);
	//       } else {
	//         //setOpenSlider(false);
	//         Swal.fire("¡Error!", res.STRMESSAGE, "error");
	//       }
	//     });
	//   };
	const handleVer = (v: any) => {
		setverarchivo(false);
		console.log("dataGlobal", dataGlobal.row.id);

		let data = {
			NUMOPERACION: 6,
			P_ROUTE: dataGlobal.row.id + "/",
			TOKEN: JSON.parse(String(getToken())),
		};

		CatalogosServices.Estudiante(data).then((res) => {
			console.log("ress", res);
			let data = res.RESPONSE[0];
			if (res.SUCCESS) {
				// Validar si FILE no existe o está vacío
				if (!data.FILE || data.FILE.trim() === "") {
					return; // Salir sin hacer nada
				}

				try {
					// Eliminar encabezado y caracteres inválidos en la cadena Base64
					let base64String = String(data.FILE)
						.replace(/^data:image\/[a-zA-Z]+;base64,/, "") // Elimina encabezado Base64 si existe
						.replace(/\s/g, ""); // Elimina espacios en blanco

					// Asegúrate de que la longitud sea múltiplo de 4
					while (base64String.length % 4 !== 0) {
						base64String += "="; // Añadir "=" para completar
					}

					const bufferArray = base64ToArrayBuffer(base64String);
					const blobStore = new Blob([bufferArray], { type: res.RESPONSE.TIPO || "image/jpeg" });

					const dataUrl = window.URL.createObjectURL(blobStore);

					setURLRuta(dataUrl);
					setverarchivo(true);
				} catch (error) {
					console.error("Error al convertir la imagen:", error);
					Swal.fire("¡Error!", "La imagen no está correctamente codificada.", "error");
				}
			} else {
				Swal.fire("¡Error!", res.STRMESSAGE, "error");
			}
		});
	};


	// Función para convertir Base64 a ArrayBuffer
	const base64ToArrayBuffer = (base64: string): ArrayBuffer => {
		let binaryString = window.atob(base64);
		let len = binaryString.length;
		let bytes = new Uint8Array(len);

		for (let i = 0; i < len; i++) {
			bytes[i] = binaryString.charCodeAt(i);
		}

		return bytes.buffer;
	};



	useEffect(() => {

		handleVer(dataGlobal.row.id);
		console.log("dataGlobal", dataGlobal);
		console.log("URLruta", URLruta);

		// if (breadcrumbs.length === 0) {
		//   handleFunction();
		// }
		// setexplorerRoute(breadcrumbs.join(""));
	}, [
		//breadcrumbs
	]);

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
				<Grid item xs={12} sm={1} md={1}>
					{/* <Avatar
						alt="Foto de Estudiante"
						src="URLruta" // Reemplaza con la URL de la imagen del estudiante
						sx={{ width: 120, height: 120, mx: "auto" }}
					/> */}
					<Avatar src={URLruta}
						alt="Foto de Estudiante"
						sx={{ width: 120, height: 120, mx: "auto" }}

					/>

				</Grid>
				{/* Información del Estudiante */}
				<Grid item xs={12} sm={6} md={7} sx={{ textAlign: { xs: "center", sm: "left" } }} marginLeft={2}>
					{" "}
					{/* Reduce el marginLeft para acercar el texto a la imagen */}
					<Typography
						 variant="h5"
						sx={{ fontWeight: "bold", color: "#A57F52" }}
					>
						{dataGlobal.row.Nombre}
					</Typography>
					<Typography sx={{ color: "#333", fontSize: "1.4rem" }}>
						Horas Acumuladas: 400
					</Typography>
					<Typography sx={{ color: "#333", fontSize: "1.4rem" }}>
					Periodo: {formatFecha(dataGlobal.row.FechaInicio)} - {formatFecha(dataGlobal.row.FechaFin)}					</Typography>
				</Grid>
				<Grid
					item
					display="flow"
					xs={12}
					sm={3}
					md={3}
					textAlign={{ xs: "center", sm: "right" }}  
				>
					<Grid>
					
					<Tooltip title={dataGlobal.row.EstadoQR==="1"? "Descarga QR en PDF":"No se ha generado QR"}>
						<span>
							<Button
						variant="contained"
						sx={{
							backgroundColor: "black",
							width: { xs: "100%", sm: "auto" },
							marginBottom: 2, // Espaciado vertical entre botones
							color: "white",  // Esto debería funcionar sin problemas
							"&:hover": {
								backgroundColor: "grey.300",
								color: "black",
							},
							px: 3,
						}}
						startIcon={<DownloadIcon />}
						onClick={descargaQR}  // Asegúrate de pasar la función correctamente
						disabled={dataGlobal.row.EstadoQR==="1"? false:true}
					>
						DESCARGAR QR
					</Button>
						</span>
						
					</Tooltip>
					</Grid>
					<Grid>
					<Tooltip title={dataGlobal.row.EstadoQR==="1"? "Reenviar QR por Correo":"No se Reenviar QR por Correo"}>
						<span>
							<Button
						variant="contained"
						sx={{
							backgroundColor: "black",
							width: { xs: "100%", sm: "auto" },
							color: "white",  // Esto debería funcionar sin problemas
							"&:hover": {
								backgroundColor: "grey.300",
								color: "black",
							},
							px: 3,
						}}
						startIcon={<ForwardToInboxIcon />}
						onClick={descargaQR}  // Asegúrate de pasar la función correctamente
						disabled={dataGlobal.row.EstadoQR==="1"? false:true}
					>
						REENVIAR QR 
					</Button>
						</span>
						
					</Tooltip>
					</Grid>
					
				</Grid>
 
			</Grid>

			{/* Sección de Información Básica */}
			<Section title="Información Básica">
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<Typography sx={{ fontSize: "1.3rem" }}>
							<strong>Tipo de Estudiante:</strong> {dataGlobal.row.TipoEstudiante}
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Typography sx={{ fontSize: "1.3rem" }}>
							<strong>Número de Gafete:</strong> {dataGlobal.row.NoGaffete}
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Typography sx={{ fontSize: "1.3rem" }}>
							<strong>Teléfono:</strong> {dataGlobal.row.Telefono}
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Typography sx={{ fontSize: "1.3rem" }}>
							<strong>Género:</strong> {dataGlobal.row.Sexo}
						</Typography>
					</Grid>
				</Grid>
			</Section>

			{/* Sección de Información Académica */}
			<Section title="Información Académica">
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<Typography sx={{ fontSize: "1.3rem" }}>
							<strong>Escolaridad:</strong> {dataGlobal.row.Escolaridad}
						</Typography>
					</Grid>
					<Grid item xs={12} sm={12}>
						<Typography sx={{ fontSize: "1.3rem" }}>
							<strong>Instituto Educativo:</strong> {dataGlobal.row.InstitucionEducativa}
						</Typography>
					</Grid>
				</Grid>
			</Section>

			{/* Sección de Información Administrativa */}
			<Section title="Información Administrativa">
				<Grid container spacing={2}>
					<Grid item xs={12} sm={12} display={"flex"} >
						<Typography sx={{ fontWeight: "bold",fontSize: "1.3rem"  }} paddingRight={1}>
							Unidad Administrativa: 
						</Typography>
						<Typography  sx={{ fontSize: "1.3rem" }}> Despacho del Tesorero</Typography>
					</Grid>
					<Grid item xs={12} sm={12}>
						<Typography sx={{ fontSize: "1.3rem" }}>
							<strong>Persona Responsable:</strong> {dataGlobal.row.PersonaResponsable}
						</Typography>
					</Grid>
 
				</Grid>
			</Section>

			{/* Sección de Horario y Asistencia */}
			<Section title="Horario y Asistencia">
				<Grid container spacing={2}>
					<Grid item xs={12} sm={12} md={12} display={"flex"}>
						<Typography sx={{ fontWeight: "bold",fontSize: "1.3rem"  }} paddingRight={1}>
							Frecuencia de Asistencia: 
						</Typography>
						<Typography sx={{ fontSize: "1.3rem" }}>
							Lunes, Miércoles, Viernes
						</Typography>
					</Grid>
					<Grid item xs={12} sm={12} md={12} display={"flex"}>
						<Typography sx={{ fontWeight: "bold",fontSize: "1.3rem"  }} paddingRight={1}>
							Horario:
						</Typography>
						<Typography sx={{ fontSize: "1.3rem" }} > 10:00 - 14:00</Typography>
					</Grid>
 
				</Grid>
			</Section>

			{/* Botón de Cerrar */}
			<Grid item xs={12} sm={12} sx={{ display: "flex", justifyContent: "flex-end"}}>
				<Button
					variant="contained"
					sx={{
						backgroundColor: "#A57F52",
						color: "white",
						fontSize: "1.2rem", // Aumenta el tamaño del texto del botón
						padding: "10px 10px", // Aumenta el tamaño del botón
						width: { xs: "100%", sm: "auto" }, // 100% del ancho en móviles
						maxWidth: "500px", // Define un ancho máximo para pantallas más grandes
						"&:hover": { backgroundColor: "grey.300", color: "black" },
					}}
					onClick={() => handleClose()}
				>
					CERRAR
				</Button>
			</Grid>
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
		<Grid
			container
			alignItems="center"
			spacing={1}
			sx={{ mb: 1, marginTop: 2 }}
		>
			<Grid item xs={12} sm="auto" >
				<Typography variant="body1" sx={{ fontWeight: "bold", color: "#A57F52", fontSize: "1.5rem"  }}>
					• {title}
				</Typography>
			</Grid>
			<Grid item xs>
				<Divider sx={{ borderColor: "#B0B0B0" }} />
			</Grid>
			<Grid item xs={12} sm={12}>
				{children}
			</Grid>
		</Grid>
	</Box>
);

export default DetalleEstudiante;
