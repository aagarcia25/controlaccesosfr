import { Box, Button, Collapse, Grid, IconButton, Menu, MenuItem, ToggleButton, Tooltip } from "@mui/material";
import ButtonsAdd from "../componentes/ButtonsAdd";
import { ButtonsImport } from "../componentes/ButtonsImport";
import QrCodeIcon from "@mui/icons-material/QrCode";
import ButtonsShare from "../componentes/ButtonsShare";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import TitleComponent from "../componentes/TitleComponent";
import { useEffect, useState } from "react";
import MUIXDataGridEstudiantes from "../componentes/MUIXDataGridEstudiantes";
import { GridColDef } from "@mui/x-data-grid";
import { PersonalModal } from "./PersonalModal";
import { CatalogosServices } from "../../services/catalogosServices";
import Swal from "sweetalert2";
import { PERMISO, USUARIORESPONSE } from "../../interfaces/UserInfo";
import { getPermisos, getUser } from "../../services/localStorage";
import ButtonsEdit from "../componentes/ButtonsEdit";
import { Toast } from "../../helpers/Toast";
import ButtonsDeleted from "../componentes/ButtonsDeleted";
import { ButtonsDetail } from "../componentes/ButtonsDetail";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

export const Personal = ()=>{
  const [openSlider, setOpenSlider] = useState(true);
	const [data, setData] = useState<any[]>([]);
	const [selectionModel, setSelectionModel] = useState<any[]>([]);
  const [modo, setModo] = useState("");
	const [tipoOperacion, setTipoOperacion] = useState(0);
	const [open, setOpen] = useState(false);
	const [vrows, setVrows] = useState({});
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
	const [editar, setEditar] = useState<boolean>(true);
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
	const navigate = useNavigate();

  
  const handleOpenExtenderFecha = (row: any) =>{}
    
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
                width: 200,
                renderCell: (v: any) => {
                    return (
                        <>
                            <ButtonsDetail
                                title={"Detalle del Estudiante"}
                                handleFunction={DetallePersonal}
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
                                handleFunction={handleAccion} // Abre el modal
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
                field: "Nombre",
                headerName: "Nombre(s)",
                description: "Nombre(s)",
                width: 200,
            },
            {
              field: "ApellidoPaterno",
              headerName: "Apellido Paterno",
              description: "Apellido Paterno",
              width: 200,
            },
            {
              field: "ApellidoMaterno",
              headerName: "Apellido Materno",
              description: "Apellido Materno",
              width: 200,
            },
            {
                field: "CorreoElectronico",
                headerName: "Correo Electronico",
                description: "Correo Electronico",
                width: 200,
            },
    
            {
                field: "CURP",
                headerName: "Unidad administrativa / Edificio / Piso",
                description: "Unidad administrativa",
                width: 300,
            },
            {
              field: "Reasignar Acceso",
              headerName: "Reasignar Acceso",
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
                    fontSize: "0.85rem",
                    textTransform: "uppercase",
                    border: "1px solid rgba(255,255,255,0.5)",
                    "&:hover": { backgroundColor: "grey.700", color: "white" },
                  }}
                >
                  REASIGNAR
                </Button>
              ),
            },
            
           
            
        ];

        const DetallePersonal = (v: any) => {
          //setDataGlobal(v);
          navigate("/inicio/DetallePersonal");
        };

        const handleOpen = (v: any) => {
          setTipoOperacion(1);
          setModo("Agregar Registro");
          setOpen(true);
          setVrows("");
        };
        const handleClose = () => {
          setOpen(false);
          consulta();
      
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
        
                  CatalogosServices.PersonalIndex(data).then((res) => {
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
        
            CatalogosServices.PersonalIndex(data).then((res) => {
              
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

        const noSelection = () =>{}

        useEffect(() => {
            permisos.map((item: PERMISO) => {
              // Aquí va la validación de permisos 
            });
        
            consulta();
          }, []);



    return (
		<>
			<Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
				<TitleComponent title={"Personal"} show={openSlider} />
		

            
          
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
    {/* <Box sx={{ padding: "4px 8px" }}>
      <ButtonsImport handleOpen={handleUpload} agregar={true} />
    </Box> */}
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
    {/* <Box sx={{ padding: "4px 8px" }}>
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
      
    </Box> */}
   
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

				

				{open ? (
					<PersonalModal
						tipo={tipoOperacion}
						handleClose={handleClose}
						dt={vrows}
					/>
				) : (
					""
				)}

				{/* Modal para subir foto */}
				{/* <Dialog
					open={openModal}
					onClose={() => setOpenModal(false)}
					maxWidth="xs"
					fullWidth
				>
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
				</Dialog> */}
			</Box>
		</>
	);
}