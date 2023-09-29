import React, { useEffect, useState } from "react";
import Progress from "../Progress";
import MUIXDataGridSimple from "../componentes/MUIXDataGridSimple";
import { CatalogosServices } from "../../services/catalogosServices";
import { GridColDef } from "@mui/x-data-grid";
import { Grid, Typography } from "@mui/material";
import TitleComponent from "../componentes/TitleComponent";

const VisitasGeneral = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const columnsRel: GridColDef[] = [
    {
      field: "id",
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
      field: "FechaVisita",
      headerName: "Fecha de Visita",
      description: "Fecha de Visita",
      width: 200,
    },
    {
      field: "FechaEntrada",
      headerName: "Registro de Entrada",
      description: "Registro de Entrada",
      width: 200,
    },
    {
      field: "FechaSalida",
      headerName: "Registro de Salida",
      description: "Registro de Salida",
      width: 200,
    },
    {
      field: "tiempovisita",
      headerName: "Duración de la Visita",
      description: "Duración de la Visita Expresada en Horas",
      width: 200,
    },
    {
      field: "Visistante",
      headerName: "Visitante",
      description: "Visitante",
      sortable: false,
      width: 400,
      renderCell: (v) => {
        return (
          v.row.NombreVisitante +
          " " +
          v.row.ApellidoPVisitante +
          " " +
          v.row.ApellidoMVisitante
        );
      },
    },
    {
      field: "Proveedor",
      headerName: "Proveedor Visistante",
      description: "Proveedor Visistante",
      width: 200,
    },
    {
      field: "pisoreceptorrr",
      headerName: "Piso de Visita",
      description: "Piso de Visita",
      width: 200,
    },
    {
      field: "Personaavisitar",
      headerName: "Persona a Visitar",
      description: "Persona a Visitar",
      sortable: false,
      width: 400,
      renderCell: (v) => {
        return (
          v.row.NombreReceptor +
          " " +
          v.row.ApellidoPReceptor +
          " " +
          v.row.ApellidoMReceptor
        );
      },
    },
  ];

  const consulta = () => {
    let data = {
      NUMOPERACION: 9,
    };
    setOpen(true);
    CatalogosServices.visita_index(data).then((res) => {
      setData(res.RESPONSE);
      setOpen(false);
    });
  };

  useEffect(() => {
    consulta();
  }, []);

  return (
    <div>
      <TitleComponent title={"Reporte General de Visitas"} show={open} />
      <Grid container spacing={1} padding={0}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <MUIXDataGridSimple columns={columnsRel} rows={data} />
        </Grid>
      </Grid>
    </div>
  );
};

export default VisitasGeneral;
