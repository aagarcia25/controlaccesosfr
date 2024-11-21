import { useNavigate, useParams } from "react-router-dom";
import { USUARIORESPONSE } from "../../interfaces/UserInfo";
import { getUser } from "../../services/localStorage";
import { useEffect, useState } from "react";
import { Estudiante } from "../../interfaces/Visitas";
import { CatalogosServices } from "../../services/catalogosServices";
import Swal from "sweetalert2";
import { Button, Grid, Typography, Box } from "@mui/material";
import TitleComponent from "../componentes/TitleComponent";

export const EstudiantesEscaneo = () => {
	const user: USUARIORESPONSE = JSON.parse(String(getUser()));
	let params = useParams();
	const navigate = useNavigate();
	const [vrows, setVrows] = useState<Estudiante | null>(null);

	const [open, setopen] = useState(false);

	const handlesalir = () => {
		navigate("/");
	};

	const handleentrada = () => {
		let data = {
			NUMOPERACION: 13,
			CHID: params.id,
			CHUSER: user.Id,
		};

		CatalogosServices.visita_index(data).then((res) => {
			if (res.SUCCESS) {
				Swal.fire({
					title: "!Exito!",
					icon: "success",
					html: "Se Registro la Fecha de Ingreso",
					showDenyButton: false,
					showCancelButton: false,
					confirmButtonText: "Aceptar",
					background: "EBEBEB",
				}).then((result) => {
					if (result.isConfirmed) {
						navigate("/");
					}
				});
			} else {
				Swal.fire(res.STRMESSAGE, "¡Error!", "info");
			}
		});
	};

	// const handlesalida = () => {
	//   let data = {
	//     NUMOPERACION: 14,
	//     CHID: params.id,
	//     CHUSER: user.Id,
	//   };

	//   CatalogosServices.visita_index(data).then((res) => {
	//     if (res.SUCCESS) {
	//       Swal.fire({
	//         title: "!Exito!",
	//         icon: "success",
	//         html: "Se Registro la Fecha de Salida, el QR ya no es Valido",
	//         showDenyButton: false,
	//         showCancelButton: false,
	//         confirmButtonText: "Aceptar",
	//         background: "EBEBEB",
	//       }).then((result) => {
	//         if (result.isConfirmed) {
	//           navigate("/");
	//         }
	//       });
	//     } else {
	//       Swal.fire(res.STRMESSAGE, "¡Error!", "info");
	//     }
	//   });
	// };

	const handleSend = () => {
		let data = {
			NUMOPERACION: 4,
			CHID: params.id,
		};

		CatalogosServices.Estudiante(data).then((res) => {
			console.log("res", res);

			if (res.SUCCESS) {
				if (res.RESPONSE[0]) {
					setVrows(res.RESPONSE[0]);
					setopen(false);
				} else {
					Swal.fire({
						title: "QR no Valido",
						icon: "error",
						showDenyButton: false,
						showCancelButton: false,
						confirmButtonText: "Aceptar",
						background: "EBEBEB",
					}).then((result) => {
						if (result.isConfirmed) {
							Swal.fire(
								"Por Favor, Verifique el QR",
								"¡Atención!",
								"info"
							);
						}
					});
				}
			} else {
				Swal.fire(res.STRMESSAGE, "¡Error!", "info");
			}
		});
	};

	const handleEscaneo = () => {
		setopen(true);

		let data = {
			NUMOPERACION: 7, // Operación específica para estudiantes
			CHID: params.id, // ID del QR escaneado
		};

		CatalogosServices.Estudiante(data).then((resultado) => {
			console.log("resultado", resultado);

			if (resultado.SUCCESS) {
				if (resultado.RESPONSE && resultado.RESPONSE.datos) {
					handleSend();

					setVrows(resultado.RESPONSE.datos); // Guarda los datos del estudiante
					setopen(false); // Cierra el estado de "escaneo"
				} else {
					Swal.fire({
						title: "QR no Valido",
						icon: "error",
						showDenyButton: false,
						showCancelButton: false,
						confirmButtonText: "Aceptar",
						background: "EBEBEB",
					}).then((result) => {
						if (result.isConfirmed) {
							navigate("/"); // Redirige al usuario si el QR no es válido
						}
					});
				}
			} else {
				Swal.fire({
					title: "¡Error!",
					text: resultado.STRMESSAGE,
					icon: "error",
					confirmButtonText: "Aceptar",
				});
			}
		});
	};

	useEffect(() => {
		console.log("vrows", vrows);

		handleEscaneo();
	}, []);

	return (
		<>
			<TitleComponent title={"Estudiante QR"} show={open} />
			<Grid container spacing={3} sx={{ padding: { xs: "5%", md: "2%" } }}>
				<Grid item xs={12} sx={{ textAlign: "center" }}>
					{/* <Grid item xs={12} sm={12} md={12} lg={12}>
							<Typography
								sx={{
									fontFamily: "sans-serif",
									fontSize: "30px",
									textAlign: "center",
									margin: "auto",
								}}
							>
								{vrows?.Indefinido == 1 ? (
                  <>
                    <Typography
                      variant="h5"
                      component="h5"
                      sx={{ fontFamily: "sans-serif", color: "black" }}
                    >
                      QR Sin Vigencia
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontFamily: "sans-serif", color: "black" }}
                    >
                      Permite el Acceso y salida hasta que se confirme la Salida
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography
                      variant="h5"
                      component="h5"
                      sx={{ fontFamily: "sans-serif", color: "black" }}
                    >
                      QR de Visita
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontFamily: "sans-serif", color: "black" }}
                    >
                      Valido para Ingreso y salida el mismo dia de la visita
                    </Typography>
                  </>
                )}
							</Typography>
						</Grid> */}

					<Grid item xs={12} sx={{ textAlign: "center" }}>
						<Box
							component="img"
							src={"https://via.placeholder.com/200"}
							alt="Foto del Estudiante"
							sx={{
								width: "200px",
								height: "200px",
								borderRadius: "10px",
								objectFit: "cover",
								border: "2px solid #ccc",
								marginBottom: "20px",
							}}
						/>
					</Grid>

					{/* Información del estudiante */}
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6} md={4}>
							<Typography
								sx={{
									fontWeight: "bold",
									fontSize: { xs: "20px", md: "22px" },
								}}
							>
								Estudiante:
							</Typography>
							<Typography sx={{ fontSize: { xs: "20px", md: "22px" } }}>
								{vrows?.Nombre}
							</Typography>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<Typography
								sx={{
									fontWeight: "bold",
									fontSize: { xs: "20px", md: "22px" },
								}}
							>
								Unidad Administrativa:
							</Typography>
							<Typography sx={{ fontSize: { xs: "20px", md: "22px" } }}>
								{vrows?.UnidadAdministrativa}  
							</Typography>
						</Grid>

						<Grid item xs={12} sm={12} md={4} lg={4}>
							<Typography
								sx={{
									fontWeight: "bold",
									fontSize: { xs: "20px", md: "22px" },
								}}
							>
								Persona Responsable:
							</Typography>
							<Typography sx={{ fontSize: { xs: "20px", md: "22px" } }}>
								{vrows?.PersonaResponsable}  
							</Typography>
						</Grid>
					</Grid>

					<Grid container spacing={2} sx={{ marginTop: "30px" }}>
						<Grid item xs={12} sm={12} md={4} lg={4}>
							<Typography
								sx={{
									fontWeight: "bold",
									fontSize: { xs: "20px", md: "22px" },
								}}
							>
								Correo :
							</Typography>
							<Typography sx={{ fontSize: { xs: "20px", md: "22px" } }}>
								{/* {vrows?.EmailNotificacion} */} 
							</Typography>
						</Grid>

						<Grid item xs={12} sm={6} md={4}>
							<Typography
								sx={{
									fontWeight: "bold",
									fontSize: { xs: "20px", md: "22px" },
								}}
							>
								Periodo:
							</Typography>
							<Typography sx={{ fontSize: { xs: "20px", md: "22px" } }}>
								{/* {formatFecha(vrows?.FechaVisita)} */}
								{vrows?.FechaInicio}
							</Typography>
						</Grid>

						{/* {vrows?.FechaEntrada ? (
                <>
                  <Typography
                    sx={{ fontFamily: "sans-serif", fontSize: "30px" }}
                  >
                    <b>Entrada: </b>
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "sans-serif", fontSize: "30px" }}
                  > */}
						{/* {formatFecha(vrows?.FechaEntrada)} */}
						{/* </Typography>
                </>
              ) : (
                ""
              )} */}
					</Grid>

					<Grid container spacing={2} sx={{ marginTop: "30px" }}>
						<Grid item xs={12} sm={6} md={4}>
							<Typography
								sx={{
									fontWeight: "bold",
									fontSize: { xs: "20px", md: "22px" },
								}}
							>
								Horario:
							</Typography>
							<Typography sx={{ fontSize: { xs: "20px", md: "22px" } }}>
								{/* {vrows?.Duracion} Horas / {vrows?.pisoreceptorrr} */} 
							 
							</Typography>
						</Grid>

						<Grid item xs={12} sm={6} md={4}>
							<Typography
								variant="body1"
								sx={{
									fontWeight: "bold",
									fontSize: { xs: "20px", md: "22px" },
								}}
							>
								Horas Acumuladas:
							</Typography>
							<Typography sx={{ fontSize: { xs: "20px", md: "22px" } }}>
								{/* {vrows?.entidadreceptor} */}  
							</Typography>
						</Grid>
					</Grid>

					<Grid container>
						<Grid
							item
							xs={12}
							sx={{
								textAlign: "center",
								marginTop: "5%",
								display: "flex",
								flexDirection: "row",
								justifyContent: "center",
								gap: "20px", // Espaciado entre botones
							}}
						>
							{/* {vrows?.FechaEntrada ? (
								<>
									<Button
										 
										onClick={() => handlesalida()} 
										sx={{
											backgroundColor:"#000000",
											color: "white",
                      padding: { xs: "12px 22px", md: "15px 25px" },
                      fontSize: { xs: "20px", md: "22px" },
                      borderRadius: "10px",
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
											"&:hover": {
												backgroundColor:"#D3D3D3",
											},
										}}
									>
										{"Registrar Salida"}
									</Button>
								</>
							) : (
								<Button
									 
									onClick={() => handleentrada()}
									variant="contained"
									sx={{
										backgroundColor: "#000000",
										color: "white",
                    padding: { xs: "12px 22px", md: "15px 25px" },
                    fontSize: { xs: "20px", md: "22px" },
                    borderRadius: "10px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
										"&:hover": {
											backgroundColor: "#D3D3D3",
										},
									}}
								>
									{"Registrar Entrada"}
								</Button>
							)} */}

							<Button
							 
								onClick={() => handlesalir()} 
                sx={{
                  backgroundColor: "#A57F52",
                  color: "white",
                  padding: { xs: "12px 22px", md: "15px 25px" },
                  fontSize: { xs: "20px", md: "22px" },
                  borderRadius: "10px",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  "&:hover": {
                    backgroundColor:"#D3D3D3", // Hover gris
                  },
                }}
							>
								{"Salir"}
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</>
	);
};
