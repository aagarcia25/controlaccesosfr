import { SetStateAction, useEffect, useState } from "react";
import TitleComponent from "../componentes/TitleComponent";
import {
	Box,
	Collapse,
	Grid,
	IconButton,
	Menu,
	MenuItem,
	TextField,
	ToggleButton,
	Tooltip,
	Typography,
} from "@mui/material";
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
import QrCodeIcon from "@mui/icons-material/QrCode";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SelectFrag from "../componentes/SelectFrag";
import SelectValues from "../../interfaces/Share";
import { ShareService } from "../../services/ShareService";
import SendIcon from "@mui/icons-material/Send";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import ButtonsShare from "../componentes/ButtonsShare";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import { base64ToArrayBuffer } from "../../helpers/Files";
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import { CatInstitucion } from "./CatInstitucion";
import { CatEscolaridad } from "./CatEscolaridad";

export const Estudiantes = ({ setDataGlobal }: { setDataGlobal: Function }) => {
	const [open, setOpen] = useState(false);
	const [data, setData] = useState<any[]>([]);
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
	
	const [openCatInstitucion, setOpenCatInstitucion] = useState(false);
	const [openCatEscolaridad, setOpenCatEscolaridad] = useState(false);

	const [openModal, setOpenModal] = useState(false);
	const [file, setFile] = useState<File | null>(null);
	const [loading, setLoading] = useState(false);
	const [openExtenderFechaModal, setOpenExtenderFechaModal] = useState(false); // Nuevo estado para el modal de Extender Fecha
	const [selectedRowId, setSelectedRowId] = useState<string>("");
	const [selectedRow, setSelectedRow] = useState<any>(null);
	const [newFechaFin, setNewFechaFin] = useState("");
	const [fFin, setFFin] = useState<Dayjs | null>();
	const [selectionModel, setSelectionModel] = useState<any[]>([]);
	const [showfilter, setshowfilter] = useState<boolean>(false);
	const [idUnidadAdministrativa, setIdUnidadAdministrativa] = useState("");
	const [ListIdUnidadAdministrativa, setListIdUnidadAdministrativa] = useState<SelectValues[]>([]);
	const [idEstudiante, setIdEstudiante] = useState("");
	const [ListIdEstudiante, setListIdEstudiante] = useState<SelectValues[]>([]);
	const [fInicioFiltro, setFInicioFiltro] = useState<Dayjs | null>();
	const [fFinFiltro, setFFinFiltro] = useState<Dayjs | null>();


	const noSelection = () => {
		let obj = data.find((dato: any) => dato.id === selectionModel[0]);

// Verificar si obj es undefined o no tiene 'Nombre'
			//fileName = (obj && obj.Nombre ? obj.Nombre : 'archivo') + `.${fileExtension}`;
		if(selectionModel.length >4){
			Swal.fire("Seleccione máximo 4 registros", "", "info");
		}else if (selectionModel.length >= 1) {
console.log("entre alñ min 4");
console.log("EstadoQr1",obj.EstadoQR);

			if(obj.EstadoQR==="0"){

					//console.log("entre al if1",obj.EstadoQR);
				
			
			Swal.fire({
				icon: "info",
				title: "Se generará un QR único para cada registro seleccionado",
				showDenyButton: true,
				showCancelButton: false,
				confirmButtonText: "Confirmar",
				denyButtonText: `Cancelar`,
			}).then((result) => {
				if (result.isConfirmed) {
					let data = {
						NUMOPERACION: 9,
						CHIDs: selectionModel,
						CHUSER: user.Id,
					};

					CatalogosServices.Estudiante(data).then((res) => {
						if (res.SUCCESS) {
							// Mostrar mensaje de éxito
							Toast.fire({
								icon: "success",
								title: res.STRMESSAGE.success,
							});

							// Si hay warnings, mostrar una alerta adicional
							if (res.STRMESSAGE.warnings) {
								const studentNames = res.STRMESSAGE.warnings.students.join(", ");
								Swal.fire({
									icon: "warning",
									title: "Advertencia",
									html: `<p>${res.STRMESSAGE.warnings.message}</p><p><strong>Estudiantes:</strong> ${studentNames}</p>`,
								});
							}

							// Refrescar la tabla y limpiar selección
							consulta();
							setSelectionModel([]);
						} else {
							// Mostrar errores críticos
							const errorDetails = res.STRMESSAGE.errors?.message || "Ha ocurrido un error inesperado.";
							Swal.fire("¡Error!", errorDetails, "error");
						}
					});
				} else if (result.isDenied) {
					Swal.fire("No se realizaron cambios", "", "info");
				}
			});
			}else if (obj?.EstadoQR === "1"){
				console.log("entre al if de qr generado");
				
				Swal.fire({
					icon: "info",
					title: "Los QR que ya se generaron antes solo se reenviarán por correo de nuevo",
					showDenyButton: true,
					showCancelButton: false,
					confirmButtonText: "Confirmar",
					denyButtonText: `Cancelar`,
				}).then((result) => {
					if (result.isConfirmed) {
						let data = {
							NUMOPERACION: 9,
							CHIDs: selectionModel,
							CHUSER: user.Id,
						};
	
						CatalogosServices.Estudiante(data).then((res) => {
							if (res.SUCCESS) {
								// Mostrar mensaje de éxito
								Toast.fire({
									icon: "success",
									title: res.STRMESSAGE.success,
								});
	
								// Si hay warnings, mostrar una alerta adicional
								if (res.STRMESSAGE.warnings) {
									const studentNames = res.STRMESSAGE.warnings.students.join(", ");
									Swal.fire({
										icon: "warning",
										title: "Advertencia",
										html: `<p>${res.STRMESSAGE.warnings.message}</p><p><strong>Estudiantes:</strong> ${studentNames}</p>`,
									});
								}
	
								// Refrescar la tabla y limpiar selección
								consulta();
								setSelectionModel([]);
							} else {
								// Mostrar errores críticos
								const errorDetails = res.STRMESSAGE.errors?.message || "Ha ocurrido un error inesperado.";
								Swal.fire("¡Error!", errorDetails, "error");
							}
						});
					} else if (result.isDenied) {
						Swal.fire("No se realizaron cambios", "", "info");
					}
				});
			}
			
			
		} else {
			Swal.fire({
				title: "No se han seleccionado registros",
				icon: "warning",
			});
		}
	};

	// Función para exportar en un formato
	const handleExport = (format: "pdf" | "qr") => {
		
		handleMenuClose();
		if (selectionModel.length >= 1){
			
			// Validar formato soportado
		if (!["pdf", "qr"].includes(format)) {
			console.error("Formato no soportado:", format);
			return;
		}
	
		if (selectionModel.length === 0) {
			console.error("No se han seleccionado IDs para exportar.");
			return;
		}
	
		const dataR = {
			ids: selectionModel,
			CHUSER: user.Id, // Asegúrate de que `user.Id` esté definido
			output_format: format,
		};
	
		axios.get(process.env.REACT_APP_APPLICATION_BASE_URL + 'makeQrEstudiante', {
			params: dataR,
			responseType: 'blob', // Asegura que recibes un blob
		})
			.then((response) => {
				const contentType = response.headers['content-type']; // Detecta el tipo de archivo devuelto
				let fileExtension = "pdf"; // Asume PDF por defecto
	
				if (contentType === "application/zip") {
					fileExtension = "zip";
				} else if (contentType === "image/png" || format === "qr") {
					fileExtension = "png";
				}
	
				let fileName = "";
        if (selectionModel.length === 1) {
			console.log("select 1",selectedRow);
			console.log("select 2",selectionModel);
			
			//let obj = data.find((dato: any) => dato.id === selectionModel[0]);
			let obj = data.find((dato: any) => dato.id === selectionModel[0]);

// Verificar si obj es undefined o no tiene 'Nombre'
			fileName = (obj && obj.Nombre ? obj.Nombre : 'archivo') + `.${fileExtension}`;


        } else {
            // Si hay más de uno, usa el nombre genérico
            fileName = `archivo.${fileExtension}`;
        }
				//const fileName = `archivo.${fileExtension}`;
				const blob = new Blob([response.data], { type: contentType });
	
				// Crear un enlace para descargar
				const link = document.createElement('a');
				link.href = URL.createObjectURL(blob);
				link.download = fileName;
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link); // Limpia el DOM
			})
			.catch((error) => {
				console.error('Error al descargar el archivo:', error);
			});
		}else {
			Swal.fire({
				title: "No se han seleccionado registros",
				icon: "warning",
			});
		}
		
	};
	

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
			FechaFin: fFin,
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
			console.log("res",res);
			console.log("data",data);
			if (res.SUCCESS) {
				setData(res.RESPONSE);
				console.log("res.RESPONSE", res.RESPONSE);

				setOpenSlider(false);
			} else {
				setOpenSlider(false);
				Swal.fire("¡Error!", res.STRMESSAGE, "error");
			}
		});
	};

	
	const handleCatInstitucion = (v: any) => {
		//setTipoOperacion(1);
		//setModo("Agregar Registro");
		setOpenCatInstitucion(true);
		//setVrows("");
	};
	
	
	const handleCatEscolaridad = (v: any) => {
		//setTipoOperacion(1);
		//setModo("Agregar Registro");
		setOpenCatEscolaridad(true);
		//setVrows("");
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
			minWidth: 180,
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
			field: "EstadoQR",
			headerName: "Estado QR",
			minWidth: 100,
			renderCell: (params: any) => (
				<Box
					sx={{
						display: "flex",
						justifyContent: "center", // Centrar horizontalmente
						alignItems: "center", // Centrar verticalmente
						padding: "4px 10px",
						borderRadius: "5px",
						color: "white",
						fontWeight: "bold",
						backgroundColor:
							params.row.EstadoQR === "1" ? "#4CAF50" : "#F44336",
						textAlign: "center",
					}}
				>
					{params.row.EstadoQR === "1" ? "GENERADO" : "NO GENERADO"}
				</Box>
			),
		},
		{
			field: "TipoEstudiante",
			headerName: "Tipo de estudiante",
			description: "Tipo de estudiante",
			minWidth: 130,
			flex: 0.8,
		},
		{
			field: "Nombre",
			headerName: "Nombre de estudiante",
			description: "Nombre de estudiante",
			minWidth: 200,
			flex: 1.1,
		},

		{
			field: "Telefono",
			headerName: "Teléfono",
			description: "Teléfono",
			minWidth: 120,
			flex: 0.5,
		},

		{
			field: "UnidadAdministrativa",
			headerName: "Unidad administrativa",
			description: "Unidad administrativa",
			minWidth: 170,
			flex: 1.2,
		},
		{
			field: "PersonaResponsable",
			headerName: "Persona responsable",
			description: "Persona responsable",
			minWidth: 170,
			flex: 1,
		},
		// {
		// 	field: "Escolaridad",
		// 	headerName: "Escolaridad",
		// 	description: "Escolaridad",
		// 	minWidth: 170,
		// 	flex: 1,
		// },
		{
			field: "FechaInicio",
			headerName: "Fecha de inicio",
			description: "Fecha de inicio",
			//minWidth: 120,
			width: 100,
			flex: 0.5,
			valueFormatter: (params) => {
				// Formatea la fecha
				return new Intl.DateTimeFormat("es-MX", {
					year: "numeric",
					month: "2-digit",
					day: "2-digit",
				}).format(new Date(params.value));
			},
		},
		{
			field: "FechaFin",
			headerName: "Fecha de fin",
			description: "Fecha de fin",
			//minWidth: 120,
			width: 100,
			flex: 0.5,
			valueFormatter: (params) => {
				// Formatea la fecha
				return new Intl.DateTimeFormat("es-MX", {
					year: "numeric",
					month: "2-digit",
					day: "2-digit",
				}).format(new Date(params.value));
			},
		},
		{
			field: "InstitucionEducativa",
			headerName: "Institución educativa",
			description: "Institución educativa",
			minWidth: 170,
			flex: 1,
		},

		{
			field: "Correo",
			headerName: "Correo Electrónico",
			description: "Correo Electrónico",
			minWidth: 100,
			flex: 0.8,
		},

		{
			field: "NoGaffete",
			headerName: "Número de gaffete",
			description: "Número de gaffete",
			//minWidth: 120,
			width: 80,
			flex: 0.5,
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
	];

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [anchorElSettings, setAnchorElSettings] = useState<null | HTMLElement>(null);

/////////////////////////////////////////////////////////////////
///////////// Reportes con Filtro ///////////////////////////////

const GenerarReporteEstudiantes = () => {
    const data = {
        idUnidadAdministrativa:idUnidadAdministrativa === "false" ? "" : idUnidadAdministrativa,
        idEstudiante:idEstudiante === "false" ? "" :idEstudiante,
		fInicioFiltro: fInicioFiltro ? fInicioFiltro.format("YYYY-MM-DD") : "", // Convierte Dayjs a string
		fFinFiltro: fFinFiltro ? fFinFiltro.format("YYYY-MM-DD") : "", // Convierte Dayjs a string
    };

    try {
        const config = {
            method: "post",
            maxBodyLength: Infinity,
            url: process.env.REACT_APP_APPLICATION_BASE_URL + "ReporteGeneralEstudiantes",
            headers: {
                "Content-Type": "application/json",
                responseType: "blob",
            },
            data: data, // Envía los filtros aquí
        };

        axios
            .request(config)
            .then((response) => {
                const bufferArray = base64ToArrayBuffer(String(response.data.RESPONSE.response64));
                const blobStore = new Blob([bufferArray], { type: "application/*" });

                const link = document.createElement("a");
                link.href = window.URL.createObjectURL(blobStore);
                link.download = "Informe de estudiantes." + response.data.RESPONSE.extencion;
                link.click();
            })
            .catch((error) => {
                console.log(error);
            });
    } catch (err) {
        console.log(err);
    }
};

	const handleFilterChangeFFin = (v: any) => {
		setFFin(v);
	};

	const handleFilterChangeUnidadAdministrativa = (v: string) => {
		setIdUnidadAdministrativa(v);
		//loadFilter(21, v);
	};

	const handleFilterChangeEstudiante = (v: string) => {
		setIdEstudiante(v);
		//loadFilter(21, v);
	};

	const handleFilterChangeFInicioFiltro = (v: any) => {
		setFInicioFiltro(v);
	};

	const handleFilterChangeFFinFiltro = (v: any) => {
		setFFinFiltro(v);
	};

	const loadFilter = (operacion: number, id?: string) => {
		let data = { NUMOPERACION: operacion, P_ID: id };
		ShareService.SelectIndex(data).then((res) => {
		  if (operacion === 5) {
			//  setCatInforme(res.RESPONSE);
		  } else if (operacion === 14) {
			setListIdEstudiante(res.RESPONSE);
		  } else if (operacion === 15) {
			setListIdUnidadAdministrativa(res.RESPONSE);
		  } 
		});
	};
	const clearFilter = () => {
		setIdEstudiante("");
		setIdUnidadAdministrativa("");
		setFFinFiltro(null);
		setFInicioFiltro(null);

		
	};

	const verfiltros = () => {
		if (showfilter) {
		  setshowfilter(false);
		} else {
		  setshowfilter(true);
		}
	  };
////////////////////////////////////////////////////////////////////
///////////// Fin Reportes con Filtro //////////////////////////////
	

	const handleClose = () => {
		setOpen(false);
		setOpenCatInstitucion(false);
		setOpenCatEscolaridad(false);
		consulta();

	};
	// const handleCloseInstitucion = () => {
	// 	setOpen(false);
	// 	consulta();
	// };

	// Función para abrir el menú
	const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	// Función para cerrar el menú
	const handleMenuClose = () => {
		setAnchorEl(null);
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
			// Aquí va la validación de permisos 
		});

		consulta();
	}, []);

	useEffect(() => {
		loadFilter(14);
		loadFilter(15);


		if (openExtenderFechaModal) {
			console.log("openExtenderFechaModal", openExtenderFechaModal);
			console.log("fFin", fFin);
			console.log("row");

			if (Object.keys.length === 0) {
			} else {
				console.log("SelectedRow", selectedRow);

				setFFin(dayjs(selectedRow?.FechaFin));
			}
		}
	}, [openExtenderFechaModal]);

	return (
		<>
			<Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
				<TitleComponent title={"Estudiantes"} show={openSlider} />
				<Collapse in={showfilter} timeout="auto" unmountOnExit>
            <Grid
              container
              item
              spacing={1}
              xs={12}
              sm={12}
              md={12}
              lg={12}
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{ padding: "1%" }}
            >
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Typography sx={{ fontFamily: "sans-serif" }}>
                  Unidad Administrativa:
                </Typography>
                <SelectFrag
                  value={idUnidadAdministrativa}
                  options={ListIdUnidadAdministrativa}
                  onInputChange={handleFilterChangeUnidadAdministrativa}
                  placeholder={"Seleccione.."}
                  disabled={false}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Typography sx={{ fontFamily: "sans-serif" }}>
                  Estudiante:
                </Typography>
                <SelectFrag
                  value={idEstudiante}
                  options={ListIdEstudiante}
                  onInputChange={handleFilterChangeEstudiante}
                  placeholder={"Seleccione.."}
                  disabled={false}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
							<CustomizedDate
								value={fInicioFiltro}
								label={"Desde"}
								onchange={handleFilterChangeFInicioFiltro}
							/>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
			  <CustomizedDate
								value={fFinFiltro}
								label={"Hasta"}
								onchange={handleFilterChangeFFinFiltro}
							/>
              </Grid>
            </Grid>
            
            <Grid
              container
              item
              spacing={1}
              xs={12}
              sm={12}
              md={12}
              lg={12}
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{ padding: "1%" }}
            >
              <Grid item xs={12} sm={6} md={4} lg={2}>
                <Tooltip title="Buscar">
                  <Button
                    onClick={GenerarReporteEstudiantes}
                    variant="contained"
                    color="secondary"
                    endIcon={<SendIcon sx={{ color: "white" }} />}
                  >
                    <Typography sx={{ color: "white" }}> Descargar Reporte </Typography>
                  </Button>
                </Tooltip>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={2}>
                <Tooltip title="Limpiar Filtros">
                  <Button
                    onClick={clearFilter}
                    variant="contained"
                    color="secondary"
                    endIcon={<CleaningServicesIcon sx={{ color: "white" }} />}
                  >
                    <Typography sx={{ color: "white" }}>
                      Limpiar Filtros
                    </Typography>
                  </Button>
                </Tooltip>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={2}>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={6}></Grid>
           		 </Grid>
         		 </Collapse>
				  <Grid container spacing={2}>
  {/* Botones principales */}
  <Grid
    item
    xs={12}
    sm={6}
    md={4}
    lg={3}
    display="flex"
    alignItems="center"
  >
    <Box sx={{ padding: "0px 8px" }}>
      <ButtonsAdd handleOpen={handleOpen} agregar={true} />
    </Box>
    <Box sx={{ padding: "4px 8px" }}>
      <ButtonsImport handleOpen={handleUpload} agregar={true} />
    </Box>
    <Box sx={{ padding: "4px 8px" }}>
      <Tooltip title={"Generar QR Seleccionados"}>
        <ToggleButton
          value="check"
          className="guardar"
          size="small"
          onChange={() => noSelection()}
          sx={{
            padding: "8px", // Ajusta el tamaño del botón
          }}
        >
          <IconButton
            color="inherit"
            component="label"
            size="small"
          >
            <QrCodeIcon />
          </IconButton>
        </ToggleButton>
      </Tooltip>
    </Box>
    <Box sx={{ padding: "4px 8px" }}>
      <Tooltip title={"Exportar QRs"}>
        <Button
          variant="contained"
          sx={{
            padding: "7px", // Ajusta el tamaño del botón
            backgroundColor: "#15212f",
            color: "white",
            minWidth: "40px",
            "&:hover": {
              backgroundColor: "#1C1C1C",
            },
          }}
          onMouseEnter={(event) => setAnchorEl(event.currentTarget)} // Abre el menú
        >
          <IconButton
            color="inherit"
            component="label"
            size="small"
          >
            <FileDownloadIcon />
          </IconButton>
        </Button>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)} // Cierra el menú al hacer clic afuera
        MenuListProps={{
          onMouseEnter: () => setAnchorEl(anchorEl), // Mantiene el menú abierto si el mouse está dentro
          onMouseLeave: () => setAnchorEl(null), // Cierra el menú si el mouse sale
        }}
      >
        <MenuItem onClick={() => handleExport("pdf")}>
          Exportar como PDF
        </MenuItem>
        <MenuItem onClick={() => handleExport("qr")}>
          Exportar como PNG
        </MenuItem>
      </Menu>
    </Box>
    <ButtonsShare
      title={showfilter ? "Ocultar Reporte" : "Generar Reporte"}
      handleFunction={verfiltros}
      show={true}
      icon={showfilter ? <PlaylistRemoveIcon /> : <FormatListBulletedIcon />}
      row={undefined}
    />
  </Grid>
  
 {/* Nuevo botón de configuración */}
<Grid
  item
  xs={12}
  sm={6}
  md={8}
  lg={9}
  display="flex"
  justifyContent="flex-end"
  alignItems="center"
>
<Tooltip title={"Catálogos"}>
        <Button
          variant="contained"
          sx={{
            padding: "7px", // Ajusta el tamaño del botón
            backgroundColor: "#15212f",
            color: "white",
            minWidth: "40px",
            "&:hover": {
              backgroundColor: "#1C1C1C",
            },
          }}
          onMouseEnter={(event) => setAnchorElSettings(event.currentTarget)} // Abre el menú
        >
          <IconButton
            color="inherit"
            component="label"
            size="small"
          >
            <SettingsIcon />
          </IconButton>
        </Button>
      </Tooltip>
      <Menu
        anchorEl={anchorElSettings}
        open={Boolean(anchorElSettings)}
        onClose={() => setAnchorElSettings(null)} // Cierra el menú al hacer clic afuera
        MenuListProps={{
          onMouseEnter: () => setAnchorElSettings(anchorElSettings), // Mantiene el menú abierto si el mouse está dentro
          onMouseLeave: () => setAnchorElSettings(null), // Cierra el menú si el mouse sale
        }}
      >
        <MenuItem onClick={() => handleCatInstitucion("pdf")}>
          Catálogo de Institución
        </MenuItem>
        <MenuItem onClick={() => handleCatEscolaridad("qr")}>
		  Catálogo de Escolaridad
        </MenuItem>
      </Menu>
</Grid>


  {/* Tabla */}
  <Grid item xs={12}>
    <Box
      sx={{
        height: { xs: 300, sm: 400, md: 500 },
        width: "100%",
        overflowX: "auto",
      }}
    >
      <MUIXDataGridEstudiantes
        columns={columnsRel}
        rows={data}
        setRowSelected={setSelectionModel}
      />
    </Box>
  </Grid>
</Grid>

				{openCatInstitucion ? (
					<CatInstitucion
						//tipo={tipoOperacion}
						handleClose={handleClose}
						//dt={vrows}
					/>
				) : (
					""
				)}
				{openCatEscolaridad ? (
					<CatEscolaridad
						//tipo={tipoOperacion}
						handleClose={handleClose}
						//dt={vrows}
					/>
				) : (
					""
				)}

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
								"&:hover": {
									backgroundColor: "grey.300",
									color: "black",
								},
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
