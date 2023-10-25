import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import DoorBackIcon from "@mui/icons-material/DoorBack";
import { Box, Grid, IconButton, Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { CatalogosServices } from "../../services/catalogosServices";
import ButtonsAdd from "../componentes/ButtonsAdd";
import MUIXDataGridSimple from "../componentes/MUIXDataGridSimple";
import TitleComponent from "../componentes/TitleComponent";
import EdificioAccesos from "./EdificioAccesos";
import EdificioUsuarios from "./EdificioUsuarios";
export const Edificio = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openEA, setopenEA] = useState(false);
  const [openEU, setopenEU] = useState(false);
  const [vrows, setVrows] = useState({});

  const handleClose = () => {
    setopenEA(false);
    setopenEU(false);
  };

  const handleOpen = (v: any) => {};
  const handleAccesos = (v: any) => {
    setVrows(v.row);
    setopenEA(true);
  };
  const handlePersonal = (v: any) => {
    setVrows(v.row);
    setopenEU(true);
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
      width: 200,
      renderCell: (v: any) => {
        return (
          <Box>
            <Tooltip title={"Accesos Del Edificio"}>
              <IconButton value="check" onClick={() => handleAccesos(v)}>
                <DoorBackIcon />
              </IconButton>
            </Tooltip>
            <Tooltip
              title={"Personal Autorizado Para Generar Visitas al Edificio"}
            >
              <IconButton value="check" onClick={() => handlePersonal(v)}>
                <AccessibilityNewIcon />
              </IconButton>
            </Tooltip>
          </Box>
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
    {
      field: "Calle",
      headerName: "Calle",
      description: "Calle",
      width: 200,
    },

    {
      field: "Colonia",
      headerName: "Colonia",
      description: "Colonia",
      width: 200,
    },
    {
      field: "CP",
      headerName: "Código Postal",
      description: "Código Postal",
      width: 200,
    },
    {
      field: "Municipio",
      headerName: "Municipio",
      description: "Municipio",
      width: 200,
    },
    {
      field: "Estado",
      headerName: "Estado",
      description: "Estado",
      width: 200,
    },
  ];

  const consulta = () => {
    let data = {
      NUMOPERACION: 4,
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
      <TitleComponent title={" Catálogo de Edificios"} show={open} />

      <Grid container spacing={1} padding={0}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <ButtonsAdd handleOpen={handleOpen} agregar={true} />
          <div style={{ height: 400, width: "100%" }}>
            <MUIXDataGridSimple columns={columnsRel} rows={data} />
          </div>
        </Grid>
      </Grid>
      {openEU ? <EdificioUsuarios handleClose={handleClose} dt={vrows} /> : ""}
      {openEA ? <EdificioAccesos handleClose={handleClose} dt={vrows} /> : ""}
    </div>
  );
};
