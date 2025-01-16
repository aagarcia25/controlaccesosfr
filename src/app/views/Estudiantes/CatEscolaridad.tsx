import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Typography } from "@mui/material"
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


export const CatEscolaridad = (
	{
handleClose,

}:{
handleClose: Function;

}
) =>{
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
						process.env.REACT_APP_APPLICATION_BASE_URL + "catalogo/Cat_Escolaridad/"+v.data.row.id,
						//data
					  )
                      .then((response) =>  {
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
						process.env.REACT_APP_APPLICATION_BASE_URL + "catalogo/Cat_Escolaridad",
						//params
						// { responseType: "blob" }
					  )
					  .then((response) => {	let Datos :any[]=response?.data?.RESPONSE;
						console.log("response",Datos);
						
					
						setDatos(Datos);
						console.log("response",Datos);
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
					console.log("handleClose",handleClose);
					
				}, [datos]);
    return(
        <Dialog
  open={true}
  //onClose={handleCloseCatInstitucion}
  fullWidth
  maxWidth={false}
  sx={{
    '& .MuiDialog-paper': {
      width: '90vw', // Ajusta al 90% del ancho de la ventana
      height: '70vh', // Ajusta al 80% de la altura de la ventana
    },
  }}
>
	
					{/* Botón de cierre en la parte superior derecha */}
					<IconButton
						aria-label="close"
						onClick={()=>handleClose()}
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
						{/* <Typography sx={{ mb: 2, fontWeight: "bold" }}>
							Fecha de Fin Actual: {selectedRow?.FechaFin || "N/A"}
						</Typography> */}
						
					</DialogContent>
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
  </Grid>
					<Grid item xs={12}>
    <Box
      sx={{
        height: { xs: 300, sm: 400, md: 500 },
        width: "80%",
        overflowX: "auto",
      }}
    >
      <MUIXDataGrid
        columns={columnsRel}
        rows={datos}
        //setRowSelected={"setSelectionModel"}
      /> 
    </Box>
  </Grid>
  {open ? (
					<CatEscolaridadModal
						tipo={tipoOperacion}
						handleClose={handleClose}
						dt={vrows}
					/>
				) : (
					""
				)}

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
							onClick={()=>{handleClose()} }
							sx={{
								backgroundColor: "black",
								color: "white",
								"&:hover": {
									backgroundColor: "grey.300",
									color: "black",
								},
							}}
						>
							Cerrar
						</Button>
					</DialogActions>
				</Dialog>
    )
}