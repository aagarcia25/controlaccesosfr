import { useEffect, useState } from "react";
import TitleComponent from "../componentes/TitleComponent"
import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import ButtonsAdd from "../componentes/ButtonsAdd";
import MUIXDataGridSimple from "../componentes/MUIXDataGridSimple";
import { GridColDef } from "@mui/x-data-grid";
import ButtonsEdit from "../componentes/ButtonsEdit";
import { CatalogosServices } from "../../services/catalogosServices";
import { Toast } from "../../helpers/Toast";
import Swal from "sweetalert2";
import { PERMISO, USUARIORESPONSE } from "../../interfaces/UserInfo";
import { getPermisos, getUser } from "../../services/localStorage";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { EstudiantesModal } from "./EstudiantesModal";
import { ButtonsDetail } from "../componentes/ButtonsDetail";
import ButtonsDeleted from "../componentes/ButtonsDeleted";
import { ButtonsImport } from "../componentes/ButtonsImport";

export const Estudiantes = () => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [editar, setEditar] = useState<boolean>(true);
    const [vrows, setVrows] = useState({});
    const user: USUARIORESPONSE = JSON.parse(String(getUser()));
    const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
    const [agregar, setAgregar] = useState<boolean>(false);
    const [show, setShow] = useState(false);

    const [openSlider, setOpenSlider] = useState(true);

    const [modo, setModo] = useState("");
    const [tipoOperacion, setTipoOperacion] = useState(0);

    const subirFoto = (v: any) => {
        
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
        //setOpen(true);

        CatalogosServices.Estudiante(data).then((res) => {
          

            if (res.SUCCESS) {
                // Toast.fire({
                //   icon: "success",
                //   title: "¡Consulta Exitosa!",
                // });
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
                    handleFunction={subirFoto}
                    show={true}
                    icon={<AddPhotoAlternateIcon />}
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
                    handleFunction={subirFoto}
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
    ];

    const handleClose = () => {
        setOpen(false);
        consulta();
        
      };

    useEffect(() => {
        permisos.map((item: PERMISO) => {
        
        });

        consulta();
    }, []);

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
							<Box sx={{ transform: "scale(0.8)", margin:0, padding:0 }}>
								<ButtonsAdd handleOpen={handleOpen} agregar={true} />
							</Box>
                            <Box sx={{ transform: "scale(0.8)", margin:0, padding:0 }}>
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
								<MUIXDataGridSimple columns={columnsRel} rows={data} />
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
				</Box>
			</>
		);
}