import { useEffect, useState } from "react";
import TitleComponent from "../componentes/TitleComponent";
import { Box, Grid, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import ButtonsAdd from "../componentes/ButtonsAdd";
import MUIXDataGridSimple from "../componentes/MUIXDataGridSimple";
import { GridColDef } from "@mui/x-data-grid";
import ButtonsEdit from "../componentes/ButtonsEdit";
import { CatalogosServices } from "../../services/catalogosServices";
import { Toast } from "../../helpers/Toast";
import Swal from "sweetalert2";
import { PERMISO, USUARIORESPONSE } from "../../interfaces/UserInfo";
import { getPermisos, getUser } from "../../services/localStorage";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { EstudiantesModal } from "./EstudiantesModal";
import { ButtonsDetail } from "../componentes/ButtonsDetail";
import ButtonsDeleted from "../componentes/ButtonsDeleted";
import { ButtonsImport } from "../componentes/ButtonsImport";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Button,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CustomizedDate from "../componentes/CustomizedDate";
import dayjs, { Dayjs } from "dayjs";
import MUIXDataGridEstudiantes from "../componentes/MUIXDataGridEstudiantes";

export const Estudiantes = ({ setDataGlobal }: { setDataGlobal: Function }) => {
	const [open, setOpen] = useState(false);
	const [data, setData] = useState([]);
	const [editar, setEditar] = useState<boolean>(true);
	const [vrows, setVrows] = useState({});
	const user: USUARIORESPONSE = JSON.parse(String(getUser()));
	const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
	const [agregar, setAgregar] = useState<boolean>(false);
	const [show, setShow] = useState(false);
	const [id, setId] = useState("");
	const navigate = useNavigate();

	const [openSlider, setOpenSlider] = useState(true);
	const [modo, setModo] = useState("");
	const [tipoOperacion, setTipoOperacion] = useState(0);

	// Nuevo estado para el modal de subir foto
	const [openModal, setOpenModal] = useState(false);
	const [file, setFile] = useState<File | null>(null);
	const [loading, setLoading] = useState(false);
	const [openExtenderFechaModal, setOpenExtenderFechaModal] = useState(false); // Nuevo estado para el modal de Extender Fecha
	const [selectedRowId, setSelectedRowId] = useState<string>("");
    const [selectedRow, setSelectedRow] = useState<any>(null);
    const [newFechaFin, setNewFechaFin] = useState("");
	const [fFin, setFFin] = useState<Dayjs | null>();


    const handleOpenExtenderFecha = (row: any) => {
        setSelectedRow(row);
        setOpenExtenderFechaModal(true);
    };

    const handleCloseExtenderFecha = () => {
        setOpenExtenderFechaModal(false);
        setNewFechaFin("");
    };

	const extenderFechaFin = (data: any) => {
		CatalogosServices.Estudiante(data).then((res) => {
		  if (res.SUCCESS) {
			Toast.fire({
			  icon: "success",
			  title: "¡Fecha Extendida!",
			});
			setOpenExtenderFechaModal(false);
			consulta();
		  } else {
			Swal.fire(res.STRMESSAGE, "¡Error!", "info");
		  }
		});
	  };

    const handleConfirmarFecha = () => {
	
			let data = {
			  CHID: selectedRow?.id,
			  NUMOPERACION: 8,
			  CHUSER: user.Id,
			  FechaFin:fFin,
			};
			extenderFechaFin(data);
		
    };

	const handleOpen = (v: any) => {
		setTipoOperacion(1);
		setModo("Agregar Registro");
		setOpen(true);
		setVrows("");
	};

	const handleUpload = (data: any) => {
		setShow(true);
		let file = data?.target?.files?.[0] || "";
		const formData = new FormData();
		formData.append("inputfile", file, "inputfile.xlxs");
		formData.append("CHUSER", user.Id);
		formData.append("tipo", "migraEstudiantes");
		CatalogosServices.migraData(formData).then((res) => {
			if (res.SUCCESS) {
				setShow(false);
				Toast.fire({
					icon: "success",
					title: "¡Consulta Exitosa!",
				});
				consulta();
			} else {
				setShow(false);
				Swal.fire("¡Error!", res.STRMESSAGE, "error");
			}
		});
	};

	const subirFoto = () => {
		if (!file) {
			Swal.fire("¡Error!", "Por favor selecciona una foto", "error");
			return;
		}

		setLoading(true);
		const formData = new FormData();
		formData.append("NUMOPERACION", "5");
		formData.append("ID", id.toString());
		formData.append("CHUSER", user.Id.toString());
		formData.append("TOKEN", "token_value");
		formData.append("FILE", file, file.name);

		axios
			.post(
				process.env.REACT_APP_APPLICATION_BASE_URL + "Estudiante",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						"X-Requested-With": "XMLHttpRequest",
						"Access-Control-Allow-Origin": "*",
					},
				}
			)
			.then((response) => {
				if (response.data.SUCCESS) {
					Swal.fire({
						icon: "success",
						title: "Foto subida correctamente",
						text: "La foto ha sido subida exitosamente.",
						confirmButtonText: "Ok",
					});
					setOpenModal(false);
					consulta();
				} else {
					Swal.fire(
						"¡Error!",
						"Hubo un problema al subir la foto",
						"error"
					);
				}
			})
			.catch((error) => {
				Swal.fire("¡Error!", "No se pudo realizar la operación", "error");
			})
			.finally(() => {
				setLoading(false);
			});
	};
	const DetalleEstudiante = (v: any) => {
		setDataGlobal(v);
		navigate("/inicio/DetalleEstudiante");
	};

	const handleAccion = (v: any) => {
		if (v.tipo === 1) {
			setTipoOperacion(2);
			setModo("Editar Registro");
			setOpen(true);
			setVrows(v.data);
		} else if (v.tipo === 2) {
			Swal.fire({
				icon: "info",
				title: "¿Estás seguro de eliminar este registro?",
				showDenyButton: true,
				showCancelButton: false,
				confirmButtonText: "Confirmar",
				denyButtonText: `Cancelar`,
			}).then((result) => {
				if (result.isConfirmed) {
					let data = {
						NUMOPERACION: 3,
						CHID: v.data.row.id,
						CHUSER: user.Id,
					};

					CatalogosServices.Estudiante(data).then((res) => {
						if (res.SUCCESS) {
							Toast.fire({
								icon: "success",
								title: "¡Registro Eliminado!",
							});
							consulta();
						} else {
							Swal.fire("¡Error!", res.STRMESSAGE, "error");
						}
					});
				} else if (result.isDenied) {
					Swal.fire("No se realizaron cambios", "", "info");
				}
			});
		}
	};

	const consulta = () => {
		let data = {
			NUMOPERACION: 4,
		};

		CatalogosServices.Estudiante(data).then((res) => {
			if (res.SUCCESS) {
				setData(res.RESPONSE);
				setOpenSlider(false);
			} else {
				setOpenSlider(false);
				Swal.fire("¡Error!", res.STRMESSAGE, "error");
			}
		});
	};

	const columnsRel: GridColDef[] = [
		{
			field: "id",
		},
		{
			field: "acciones",
			disableExport: true,
			headerName: "Acciones",
			description: "Acciones",
			sortable: false,
			minWidth: 150,
			flex: 1,
			renderCell: (v: any) => {
				return (
					<>
					
						<ButtonsDetail
							title={"Detalle del Estudiante"}
							handleFunction={DetalleEstudiante}
							show={true}
							icon={<VisibilityIcon />}
							row={v}
						></ButtonsDetail>
						{editar ? (
							<ButtonsEdit
								handleAccion={handleAccion}
								row={v}
								show={true}
							></ButtonsEdit>
						) : (
							""
						)}
						<ButtonsDetail
							title={"Subir Foto"}
							handleFunction={handleOpenUploadFoto} // Abre el modal
							show={true}
							icon={<AddPhotoAlternateIcon />}
							row={v}
						></ButtonsDetail>
						<ButtonsDeleted
							handleAccion={handleAccion}
							row={v}
							show={true}
						></ButtonsDeleted>
					</>
				);
			},
		},
		{
			field: "TipoEstudiante",
			headerName: "Tipo de estudiante",
			description: "Tipo de estudiante",
			minWidth: 200,
			flex: 1,
		},
		{
			field: "Nombre",
			headerName: "Nombre de estudiante",
			description: "Nombre de estudiante",
			minWidth: 200,
			flex: 1,
		},
		{
			field: "UnidadAdministrativa",
			headerName: "Unidad administrativa",
			description: "Unidad administrativa",
			minWidth: 170,
			flex: 1,
		},
		{
			field: "FechaInicio",
			headerName: "Fecha de inicio",
			description: "Fecha de inicio",
			minWidth: 120,
			flex: 0.8,
		},
		{
			field: "FechaFin",
			headerName: "Fecha de fin",
			description: "Fecha de fin",
			minWidth: 120,
			flex: 0.8,
		},
		{
			field: "Telefono",
			headerName: "Teléfono",
			description: "Teléfono",
			minWidth: 170,
			flex: 1,
		},
		{
			field: "Sexo",
			headerName: "Sexo",
			description: "Sexo",
			minWidth: 100,
			flex: 0.5,
		},
		{
			field: "Escolaridad",
			headerName: "Escolaridad",
			description: "Escolaridad",
			minWidth: 170,
			flex: 1,
		},
		{
			field: "InstitucionEducativa",
			headerName: "Institución educativa",
			description: "Institución educativa",
			minWidth: 170,
			flex: 1,
		},
		{
			field: "PersonaResponsable",
			headerName: "Persona responsable",
			description: "Persona responsable",
			minWidth: 170,
			flex: 1,
		},
		{
			field: "NoGaffete",
			headerName: "Número de gaffete",
			description: "Número de gaffete",
			minWidth: 150,
			flex: 0.8,
		},
		{
			field: "ExtenderFecha",
			headerName: "Extender Fecha",
			minWidth: 150,
			renderCell: (params: any) => (
				<Button
					variant="contained"
					size="small"
                    onClick={() => handleOpenExtenderFecha(params.row)}
					sx={{
						backgroundColor: "black",
						color: "white",
						fontWeight: "bold",
						"&:hover": { backgroundColor: "grey.300", color: "black" },
					}}
				>
					ACTUALIZAR
				</Button>
			),
		},
		{
			field: "EstadoQR",
			headerName: "Estado QR",
			minWidth: 150,
			renderCell: (params: any) => (
				<Box
					sx={{
						padding: "4px 10px",
						borderRadius: "5px",
						color: "white",
						fontWeight: "bold",
						backgroundColor:
							params.row.EstadoQR === "1" ? "#4CAF50" : "#F44336",
					}}
				>
					{params.row.EstadoQR === "1" ? "GENERADO" : "NO GENERADO"}
				</Box>
			),
		},
	];

	const handleFilterChangeFFin = (v: any) => {
		setFFin(v);
	};

	const handleClose = () => {
		setOpen(false);
		consulta();
	};
	const handleOpenUploadFoto = (v: any) => {

		console.log("row", v.row.id);

		setId(v.row.id || "");
		//if(existeFoto){

		//}else{
			setOpenModal(true);
		//}
		
		
	};

	useEffect(() => {
		permisos.map((item: PERMISO) => {
			// Aquí podrías realizar alguna validación de permisos si es necesario
		});

		consulta();
	}, []);
	
	useEffect(() => {
		if(openExtenderFechaModal){
			console.log("openExtenderFechaModal",openExtenderFechaModal);
		console.log("fFin",fFin);
		console.log("row");
		
		
		if(Object.keys.length === 0){

		}
		else{
			console.log("SelectedRow",selectedRow);
			
			setFFin(dayjs(selectedRow?.FechaFin));

		}
		}
		
	}, [openExtenderFechaModal]);

	return (
		<>
			<Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
				<TitleComponent title={"Estudiantes"} show={openSlider} />
				<Grid container spacing={2}>
					<Grid
						item
						xs={12}
						sm={6}
						md={4}
						lg={3}
						display="flex"
						alignItems="center"
					>
						<Box sx={{ transform: "scale(0.8)", margin: 0, padding: 0 }}>
							<ButtonsAdd handleOpen={handleOpen} agregar={true} />
						</Box>
						<Box sx={{ transform: "scale(0.8)", margin: 0, padding: 0 }}>
							<ButtonsImport handleOpen={handleUpload} agregar={true} />
						</Box>
					</Grid>
					<Grid item xs={12}>
						<Box
							sx={{
								height: { xs: 300, sm: 400, md: 500 },
								width: "100%",
								overflowX: "auto",
							}}
						>
							<MUIXDataGridEstudiantes columns={columnsRel} rows={data} />
						</Box>
					</Grid>
				</Grid>
				{open ? (
					<EstudiantesModal
						tipo={tipoOperacion}
						handleClose={handleClose}
						dt={vrows}
					/>
				) : (
					""
				)}

				{/* Modal para extender fecha */}
				<Dialog
					open={openExtenderFechaModal}
					onClose={handleCloseExtenderFecha}
					maxWidth="xs"
					fullWidth
				>
					{/* Botón de cierre en la parte superior derecha */}
					<IconButton
						aria-label="close"
						onClick={handleCloseExtenderFecha}
						sx={{
							position: "absolute",
							right: 8,
							top: 8,
							color: (theme) => theme.palette.grey[500],
						}}
					>
						<CloseIcon />
					</IconButton>

					<DialogTitle
						sx={{
							fontWeight: "bold",
							textAlign: "center",
							fontSize: 24,
							color: "#A57F52",
						}}
					>
						EXTENDER FECHA DE FIN
					</DialogTitle>

					<DialogContent sx={{ textAlign: "center", mb: 2 }}>
						<Typography sx={{ mb: 2, fontWeight: "bold" }}>
							Fecha de Fin Actual: {selectedRow?.FechaFin || "N/A"}
						</Typography>
						<CustomizedDate
								value={fFin}
								label={"Fecha de Vigencia (Inicio)"}
								onchange={handleFilterChangeFFin}
							/>
					</DialogContent>

					<DialogActions sx={{ justifyContent: "center", gap: 2, pb: 3 }}>
						{/* <Button
							variant="contained"
							onClick={handleCloseExtenderFecha}
							sx={{
								backgroundColor: "#A57F52",
								color: "white",
								"&:hover": { backgroundColor: "#8D6E4F" },
							}}
						>
							CANCELAR
						</Button> */}
						<Button
							variant="contained"
							onClick={handleConfirmarFecha}
							sx={{
								backgroundColor: "black",
								color: "white",
								"&:hover": { backgroundColor: "grey.300", color: "black" },
							}}
						>
							Confirmar
						</Button>
					</DialogActions>
				</Dialog>

				{/* Modal para subir foto */}
				<Dialog
					open={openModal}
					onClose={() => setOpenModal(false)}
					maxWidth="xs"
					fullWidth
				>
					{/* Botón de cierre en la parte superior derecha */}
					<IconButton
						aria-label="close"
						onClick={() => setOpenModal(false)}
						sx={{
							position: "absolute",
							right: 8,
							top: 8,
							color: (theme) => theme.palette.grey[500],
						}}
					>
						<CloseIcon />
					</IconButton>

					<DialogTitle
						sx={{
							fontWeight: "bold",
							textAlign: "center",
							fontSize: 24,
							color: "#A57F52",
						}}
					>
						Cargar Imagen de Perfil
					</DialogTitle>

					<DialogContent sx={{ color: "black", mb: 2 }}>
						<Typography sx={{ mb: 1 }}>
							Seleccione una imagen adecuada que representará el perfil
							del estudiante.
						</Typography>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center", // Centrar el contenido horizontalmente
								mt: 2,
								textAlign: "center", // Centrar el texto dentro del Typography
							}}
						>
							<input
								type="file"
								accept="image/*"
								onChange={(e) =>
									setFile(e.target.files ? e.target.files[0] : null)
								}
								id="upload-button"
								style={{ display: "none" }}
							/>
							<label htmlFor="upload-button">
								<Button
									variant="outlined"
									component="span"
									startIcon={<UploadFileIcon />}
									sx={{
										mr: 2,
										backgroundColor: "#F0F0F0",
										color: "#333333",
										borderColor: "#A0A0A0",
										"&:hover": {
											backgroundColor: "#E0E0E0",
											color: "#000000",
										},
										fontSize: 14,
										textTransform: "none",
									}}
								>
									Seleccionar Archivo
								</Button>
							</label>
							<Typography
								variant="body2"
								color="textSecondary"
								sx={{ color: "#666666" }}
							>
								{file ? file.name : "No hay archivo seleccionado"}
							</Typography>
						</Box>
					</DialogContent>

					<DialogActions
						sx={{ justifyContent: "flex-end", pb: 3, pt: 2, mx: 3 }}
					>
						<Button
							onClick={() => setOpenModal(false)}
							variant="contained"
							sx={{
								backgroundColor: "#A57F52",
								color: "white",
								"&:hover": {
									backgroundColor: "grey.300", // Cambia a gris claro en hover
									color: "black", // Cambia a letras negras en hover
								},
							}}
						>
							Cancelar
						</Button>

						<Button
							onClick={subirFoto}
							color="primary"
							disabled={loading || !file}
							sx={{
								backgroundColor: "black",
								color: "white",
								width: "40%", // Más ancho
								height: 36, // Altura reducida
								"&:hover": {
									backgroundColor: "#333",
								},
							}}
						>
							{loading ? <CircularProgress size={24} /> : "Subir"}
						</Button>
					</DialogActions>
				</Dialog>
			</Box>
		</>
	);
};
