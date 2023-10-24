import { Button, Grid, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Toast } from "../../helpers/Toast";
import SelectValues from "../../interfaces/Share";
import { USUARIORESPONSE } from "../../interfaces/UserInfo";
import { ShareService } from "../../services/ShareService";
import { CatalogosServices } from "../../services/catalogosServices";
import { getUser } from "../../services/localStorage";
import Progress from "../Progress";
import ButtonsAdd from "../componentes/ButtonsAdd";
import ButtonsDeleted from "../componentes/ButtonsDeleted";
import MUIXDataGridSimple from "../componentes/MUIXDataGridSimple";
import ModalForm from "../componentes/ModalForm";
import SelectFrag from "../componentes/SelectFrag";

const EdificioUsuarios = ({
  handleClose,
  dt,
}: {
  handleClose: Function;
  dt: any;
}) => {
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openModal, setopenModal] = useState(false);

  const [idUsuario, setidUsuario] = useState("");
  const [ListUsuario, setListUsuario] = useState<SelectValues[]>([]);

  const handleDeleted = (v: any) => {
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
          NUMOPERACION: 11,
          CHID: v.data.row.id,
          CHUSER: user.Id,
        };

        CatalogosServices.Edificio_index(data).then((res) => {
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
  };

  const handleUsuario = (v: string) => {
    setidUsuario(v);
  };

  const close = () => {
    setopenModal(false);
  };
  const handleOpen = (v: any) => {
    setopenModal(true);
  };

  const handleSubmit = () => {
    let data = {
      NUMOPERACION: 10,
      CHUSER: user.Id,
      idUsuario: idUsuario,
      idEdificio: dt.id,
    };

    CatalogosServices.Edificio_index(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Registro Agregado!",
        });
        consulta();
        close();
      } else {
        Swal.fire("¡Error!", res.STRMESSAGE, "error");
      }
    });
  };

  const columnsRel: GridColDef[] = [
    {
      field: "id",
    },
    {
      field: "Operaciones",
      disableExport: true,
      headerName: "Operaciones",
      description: "Operaciones",
      sortable: false,
      width: 150,
      renderCell: (v: any) => {
        return (
          <>
            <ButtonsDeleted
              handleAccion={handleDeleted}
              row={v}
              show={true}
            ></ButtonsDeleted>
          </>
        );
      },
    },

    {
      field: "FechaCreacion",
      headerName: "Fecha de Creación",
      description: "Fecha de Creación",
      width: 200,
    },
    {
      field: "CreadoPor",
      headerName: "Creado Por",
      description: "Creado Por",
      width: 200,
    },
    {
      field: "ModificadoPor",
      headerName: "Modificado Por",
      description: "Modificado Por",
      width: 200,
    },
    {
      field: "idUsuario",
      headerName: "Usuario",
      description: "Usuario",
      width: 350,
    },
  ];

  const loadFilter = (operacion: number, id?: string) => {
    setOpen(true);
    let data = { NUMOPERACION: operacion, P_ID: id };
    ShareService.SelectIndex(data).then((res) => {
      if (operacion === 10) {
        setListUsuario(res.RESPONSE);
      }
    });
  };

  const consulta = () => {
    let data = {
      NUMOPERACION: 12,
      idEdificio: dt.id,
    };
    setOpen(true);
    CatalogosServices.Edificio_index(data).then((res) => {
      setData(res.RESPONSE);
      setOpen(false);
    });
  };

  useEffect(() => {
    consulta();
    loadFilter(10);
  }, []);

  return (
    <div>
      <Progress open={open}></Progress>
      <ModalForm title={"Usuarios Con Acceso"} handleClose={handleClose}>
        <Grid container spacing={1} padding={0}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <ButtonsAdd handleOpen={handleOpen} agregar={true} />
            <MUIXDataGridSimple columns={columnsRel} rows={data} />
          </Grid>
        </Grid>
      </ModalForm>

      {openModal ? (
        <ModalForm title={"Registrar Usuarios"} handleClose={close}>
          <Grid
            container
            direction="column"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Usuario:
              </Typography>
              <SelectFrag
                value={idUsuario}
                options={ListUsuario}
                onInputChange={handleUsuario}
                placeholder={"Seleccione.."}
                disabled={false}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Button className={"guardar"} onClick={() => handleSubmit()}>
                {"Guardar"}
              </Button>
            </Grid>
          </Grid>
        </ModalForm>
      ) : (
        ""
      )}
    </div>
  );
};

export default EdificioUsuarios;
