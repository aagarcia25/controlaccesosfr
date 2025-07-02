import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	IconButton,
	Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import MUIXDataGridEstudiantes from "../componentes/MUIXDataGridEstudiantes";
import { GridColDef } from "@mui/x-data-grid";
import MUIXDataGrid from "../MUIXDataGrid";
import axios from "axios";
import Swal from "sweetalert2";
import { log } from "console";
import ButtonsAdd from "../componentes/ButtonsAdd";
import { CatInstitucionModal } from "./CatInstitucionModal";
import ButtonsEdit from "../componentes/ButtonsEdit";
import { USUARIORESPONSE } from "../../interfaces/UserInfo";
import { getUser } from "../../services/localStorage";
import { Toast } from "../../helpers/Toast";
import ButtonsDeleted from "../componentes/ButtonsDeleted";

export const CatInstitucion = ({ handleClose }: { handleClose: Function }) => {
	//const [openCatInstitucion, setOpenCatInstitucion] = useState(true);
	const [datos, setDatos] = useState<any[]>([]);
	const [open, setOpen] = useState(false);
	const [modo, setModo] = useState("");
	const [tipoOperacion, setTipoOperacion] = useState(0);
	const [vrows, setVrows] = useState({});
	const [editar, setEditar] = useState<boolean>(true);
	const user: USUARIORESPONSE = JSON.parse(String(getUser()));

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
						id: v.data.row.id,
						CHUSER: user.Id,
					};

					axios
						.delete(
							process.env.REACT_APP_APPLICATION_BASE_URL +
								"catalogo/Cat_Institucion_Educativa/" +
								v.data.row.id
							//data
						)
						.then((response) => {
							if (response.data.SUCCESS) {
								Toast.fire({
									icon: "success",
									title: "¡Registro Eliminado!",
								});
								consulta();
							} else {
								Swal.fire("¡Error!", response.data.STRMESSAGE, "error");
							}
						});
				} else if (result.isDenied) {
					Swal.fire("No se realizaron cambios", "", "info");
				}
			});
		}
	};

	// const handleCloseCatInstitucion = () => {
	//     setOpenCatInstitucion(false);
	//     //setNewFechaFin("");
	// };
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
			minWidth: 30,
			flex: 1,
			renderCell: (v: any) => {
				return (
					<>
						{editar ? (
							<ButtonsEdit
								handleAccion={handleAccion}
								row={v}
								show={true}
							></ButtonsEdit>
						) : (
							""
						)}
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
			field: "Nombre",
			headerName: "Institución educativa",
			description: "Institución educativa",
			minWidth: 80,
			flex: 1,
		},
	];
	const consulta = () => {
		// let data = {
		// 	NUMOPERACION: 4,
		// };
		try {
			//let header = getHeaderInfoReporte();
			axios
				.get(
					process.env.REACT_APP_APPLICATION_BASE_URL +
						"catalogo/Cat_Institucion_Educativa"
					//params
					// { responseType: "blob" }
				)
				.then((response) => {
					let Datos: any[] = response?.data?.RESPONSE;
					console.log("response", Datos);

					setDatos(Datos);
					console.log("response", Datos);
					//console.log("res.RESPONSE", res.RESPONSE);
				})
				.catch((error) => {
					//setOpenSlider(false);
					//Swal.fire("¡Error!", res.STRMESSAGE, "error");
				});
		} catch (err: any) {
			//setOpenSlider(false);
		}
	};
	const handleOpen = (v: any) => {
		setTipoOperacion(1);
		setModo("Agregar Registro");
		setOpen(true);
		setVrows("");
	};
	useEffect(() => {
		consulta();
	}, []);

	useEffect(() => {
		//();
		console.log("handleClose", handleClose);
	}, [datos]);
	return (
		<Dialog
			open={true}
			fullScreen
			sx={{
				"& .MuiDialog-paper": {
					width: "100%", // Asegura el ancho completo
					height: "100%", // Altura completa
					margin: 0, // Sin márgenes
					padding: 0, // Sin padding
					display: "flex",
					flexDirection: "column",
				},
			}}
		>
			{/* Botón de cierre en la parte superior derecha */}
			<IconButton
				aria-label="close"
				onClick={() => handleClose()}
				sx={{
					position: "absolute",
					right: 8,
					top: 8,
					color: (theme) => theme.palette.grey[500],
				}}
			>
				<CloseIcon />
			</IconButton>
			
			<Box
			    sx={{
					width: "100%", // Ancho total
					height: "100%", // Alto total
					display: "flex",
					flexDirection: "column",
					padding: 0,
					margin: 0,
				}}
			>

			<DialogTitle
				sx={{
					fontWeight: "bold",
					textAlign: "center",
					fontSize: "2rem",
					color: "#A57F52",
					marginTop: 2,
				}}
			>
				Instituciones
			</DialogTitle>

			<DialogContent 
        sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 2, // Ajuste del padding del contenido
        }}>

			<Grid
                  container
				  alignItems="center"
				  justifyContent="flex-end"
				  sx={{ marginBottom: 2 }}
			>
				 
					<ButtonsAdd handleOpen={handleOpen} agregar={true} />
				 
			</Grid>
			<Grid container paddingBottom={2}>
				<Box
                sx={{
                    flex: 1, // Asegura que la tabla ocupe todo el espacio vertical disponible
                    width: "100%", // Ocupa todo el ancho
                    overflow: "auto", // Permite scroll si es necesario
                }}
				>
					<MUIXDataGrid
						columns={columnsRel}
						rows={datos}
						//setRowSelected={"setSelectionModel"}
					/>
				</Box>
			</Grid>
			</DialogContent>
			</Box>
			{open ? (
				<CatInstitucionModal
					tipo={tipoOperacion}
					handleClose={handleClose}
					dt={vrows}
				/>
			) : (
				""
			)}

		</Dialog>
	);
};
