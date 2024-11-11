import { useEffect, useState } from "react";
import TitleComponent from "../componentes/TitleComponent"
import { Box, Grid, IconButton, Tooltip } from "@mui/material";
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

export const Estudiantes = () => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [editar, setEditar] = useState<boolean>(true);
    const [vrows, setVrows] = useState({});
    const user: USUARIORESPONSE = JSON.parse(String(getUser()));
    const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
    const [agregar, setAgregar] = useState<boolean>(false);

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
                            //consulta({ NUMOPERACION: 4 });
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
            width: 150,
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
            width: 200,
        },
        {
            field: "Nombre",
            headerName: "Nombre de estudiante",
            description: "Nombre de estudiante",
            width: 200,
        },
        {
            field: "UnidadAdministrativa",
            headerName: "Unidad administrativa",
            description: "Unidad administrativa",
            width: 170,
        },
        {
            field: "FechaInicio",
            headerName: "Fecha de inicio",
            description: "Fecha de inicio",
            width: 120,
        },
        {
            field: "FechaFin",
            headerName: "Fecha de fin",
            description: "Fecha de fin",
            width: 120,
        },
        {
            field: "Telefono",
            headerName: "Teléfono",
            description: "Teléfono",
            width: 170,
        },
        {
            field: "Sexo",
            headerName: "Sexo",
            description: "Sexo",
            width: 250,
        },
        {
            field: "Escolaridad",
            headerName: "Escolaridad",
            description: "Escolaridad",
            width: 170,
        },
        {
            field: "InstitucionEducativa",
            headerName: "Institución educativa",
            description: "Institución educativa",
            width: 170,
        },
        {
            field: "PersonaResponsable",
            headerName: "Persona responsable",
            description: "Persona responsable",
            width: 170,
        },
        {
            field: "NoGaffete",
            headerName: "Número de gaffete",
            description: "Número de gaffete",
            width: 150,
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

    return (<>
        <TitleComponent title={"Estudiantes"} show={openSlider} />
        <Grid container spacing={1} padding={0}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <div style={{ height: 500, width: "100%" }}>
                    <ButtonsAdd handleOpen={handleOpen} agregar={true} />
                    <MUIXDataGridSimple columns={columnsRel} rows={data} />
                </div>
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
    </>)
}