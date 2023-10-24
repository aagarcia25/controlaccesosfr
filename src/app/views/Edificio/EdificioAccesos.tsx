import { Button, Grid, TextField, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Toast } from "../../helpers/Toast";
import { USUARIORESPONSE } from "../../interfaces/UserInfo";
import { CatalogosServices } from "../../services/catalogosServices";
import { getUser } from "../../services/localStorage";
import Progress from "../Progress";
import ButtonsAdd from "../componentes/ButtonsAdd";
import ButtonsDeleted from "../componentes/ButtonsDeleted";
import ButtonsEdit from "../componentes/ButtonsEdit";
import MUIXDataGridSimple from "../componentes/MUIXDataGridSimple";
import ModalForm from "../componentes/ModalForm";

const EdificioAccesos = ({
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
  const [acceso, setacceso] = useState("");
  const [id, setid] = useState("");
  const close = () => {
    setopenModal(false);
  };

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
          NUMOPERACION: 7,
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

  const handleOpen = (v: any) => {
    setopenModal(true);
  };
  const handleEdit = (v: any) => {
    console.log(v.data);
    setid(v.data.id);
    setacceso(v.data.row.Descripcion);
    setopenModal(true);
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
            <ButtonsEdit
              handleAccion={handleEdit}
              row={v}
              show={true}
            ></ButtonsEdit>
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
      field: "Descripcion",
      headerName: "Acceso",
      description: "Acceso",
      width: 200,
    },
  ];

  const handleSubmit = () => {
    let data = {
      NUMOPERACION: 5,
      CHUSER: user.Id,
      Descripcion: acceso,
      idEdificio: dt.id,
      CHID: id,
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

  const consulta = () => {
    let data = {
      NUMOPERACION: 9,
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
  }, []);

  return (
    <div>
      <Progress open={open}></Progress>
      <ModalForm title={"Accesos de Edificio"} handleClose={handleClose}>
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
              <Typography sx={{ fontFamily: "sans-serif" }}>Acceso:</Typography>
              <TextField
                size="small"
                fullWidth
                id="outlined-required"
                defaultValue=""
                value={acceso}
                onChange={(v) => setacceso(v.target.value)}
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

export default EdificioAccesos;
