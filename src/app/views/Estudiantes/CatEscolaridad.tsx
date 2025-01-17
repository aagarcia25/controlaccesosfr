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
import { CatEscolaridadModal } from "./CatEscolaridadModal";

export const CatEscolaridad = ({ handleClose }: { handleClose: Function }) => {
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
								"catalogo/Cat_Escolaridad/" +
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
			headerName: "Escolaridad",
			description: "Escolaridad",
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
						"catalogo/Cat_Escolaridad"
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
			//onClose={handleCloseCatInstitucion}
			fullScreen
			maxWidth={false}
			sx={{
				"& .MuiDialog-paper": {
					padding: 2,
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

			<DialogTitle
				sx={{
					fontWeight: "bold",
					textAlign: "center",
					fontSize: 24,
					color: "#A57F52",
				}}
			>
				Escolaridades
			</DialogTitle>
			
			<DialogContent sx={{ textAlign: "center", mb: 2 }}>
			<Box display="flex" justifyContent="flex-end" mb={2}>
				<ButtonsAdd handleOpen={handleOpen} agregar={true} />
			</Box>

			<Box
				sx={{
					height: "70vh",
					width: "100%",
				}}
			>
				<MUIXDataGrid
					columns={columnsRel}
					rows={datos}
					//setRowSelected={"setSelectionModel"}
				/>
			</Box>
			</DialogContent>

			{open ? (
				<CatEscolaridadModal
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
