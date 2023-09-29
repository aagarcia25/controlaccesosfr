import React, { useEffect, useState } from "react";
import TitleComponent from "../componentes/TitleComponent";
import { Box, Grid } from "@mui/material";
import MUIXDataGridSimple from "../componentes/MUIXDataGridSimple";
import ButtonsEdit from "../componentes/ButtonsEdit";
import ButtonsDeleted from "../componentes/ButtonsDeleted";
import Swal from "sweetalert2";
import { GridColDef } from "@mui/x-data-grid";
import { Toast } from "../../helpers/Toast";
import { CatalogosServices } from "../../services/catalogosServices";
import { getUser } from "../../services/localStorage";
import { USUARIORESPONSE } from "../../interfaces/UserInfo";
import ModalForm from "../componentes/ModalForm";
import ButtonsAdd from "../componentes/ButtonsAdd";

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
          NUMOPERACION: 3,
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
    console.log(v);
  };
  const handleEdit = (v: any) => {
    console.log(v);
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
      headerName: "Edificio",
      description: "Edificio",
      width: 200,
    },
  ];

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
      <ModalForm title={"Accesos de Edificio"} handleClose={handleClose}>
        <Grid container spacing={1} padding={0}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <ButtonsAdd handleOpen={handleOpen} agregar={true} />
            <MUIXDataGridSimple columns={columnsRel} rows={data} />
          </Grid>
        </Grid>
      </ModalForm>
    </div>
  );
};

export default EdificioAccesos;
