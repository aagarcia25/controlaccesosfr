import InsightsIcon from "@mui/icons-material/Insights";
import { Box, Grid, IconButton, Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { USUARIORESPONSE } from "../../interfaces/UserInfo";
import { CatalogosServices } from "../../services/catalogosServices";
import { getUser } from "../../services/localStorage";
import MUIXDataGridSimple from "../componentes/MUIXDataGridSimple";
import TitleComponent from "../componentes/TitleComponent";
import Trazabilidad from "../componentes/Trazabilidad";

const VisitasIndividual = () => {
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [verTrazabilidad, setVerTrazabilidad] = useState<boolean>(false);
  const [vrows, setVrows] = useState<{}>("");
  const handleclose = (data: any) => {
    setVerTrazabilidad(false);
  };

  const handleVerTazabilidad = (v: any) => {
    setVerTrazabilidad(true);
    setVrows(v.row);
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
      width: 80,
      renderCell: (v: any) => {
        return (
          <Box>
            <Tooltip title={"Ver Trazabilidad"}>
              <IconButton value="check" onClick={() => handleVerTazabilidad(v)}>
                <InsightsIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
    {
      field: "Express",
      headerName: "Generado",
      description: "ExpresGenerados",
      width: 120,
      renderCell: (v: any) => {
        return (
          <>
            {v.row.Express == 1 ? "Generado por Recepción" : "Generado con QR"}
          </>
        );
      },
    },
    {
      field: "FechaCreacion",
      headerName: "Fecha Creado",
      description: "Fecha Creado",
      width: 170,
    },
    {
      field: "CreadoPor",
      headerName: "Creado Por",
      description: "Creado Por",
      width: 250,
    },
    {
      field: "FechaVisita",
      headerName: "Fecha de Visita",
      description: "Fecha de Visita",
      width: 170,
    },
    {
      field: "FechaEntrada",
      headerName: "Registro de Entrada",
      description: "Registro de Entrada",
      width: 170,
    },
    {
      field: "FechaSalida",
      headerName: "Registro de Salida",
      description: "Registro de Salida",
      width: 170,
    },
    {
      field: "tiempovisita",
      headerName: "Duración de la Visita",
      description: "Duración de la Visita Expresada en Horas . Minutos",
      width: 150,
    },

    {
      field: "Proveedor",
      headerName: "Proveedor",
      description: "Proveedor",
      width: 200,
    },

    {
      field: "NombreVisitante",
      headerName: "Vistante Nombre",
      description: "Vistante Nombre",
      width: 200,
    },
    {
      field: "ApellidoPVisitante",
      headerName: "Visitante Apellido Paterno",
      description: "Visitante Apellido Paterno ",
      width: 200,
    },
    {
      field: "ApellidoMVisitante",
      headerName: "Visitante Apellido Materno",
      description: "Visitante Apellido Materno",
      width: 200,
    },

    {
      field: "NombreReceptor",
      headerName: "Receptor Nombre",
      description: "Receptor Nombre",
      width: 200,
    },
    {
      field: "ApellidoPReceptor",
      headerName: "Receptor Apellido Paterno",
      description: "Receptor Apellido Paterno",
      width: 200,
    },
    {
      field: "ApellidoMReceptor",
      headerName: "Receptor Apellido Materno",
      description: "Receptor Apellido Materno",
      width: 200,
    },
    {
      field: "entidadreceptor",
      headerName: "Unidad Administrativa",
      description: "Unidad Administrativa",
      width: 450,
    },
    {
      field: "pisoreceptorrr",
      headerName: "Piso de Visita",
      description: "Piso de Visita",
      width: 150,
    },
    {
      field: "Finalizado",
      headerName: "Finalizado",
      description: "Finalizado",
      width: 120,
      renderCell: (v: any) => {
        return (
          <>
            {v.row.Finalizado == 1 ? "Finalizado" : "En Espera de Validación"}
          </>
        );
      },
    },
    {
      field: "Cancelado",
      headerName: "Cancelado",
      description: "Cancelado",
      width: 120,
      renderCell: (v: any) => {
        return <>{v.row.Cancelado == 1 ? "Cancelado por Sistema" : ""}</>;
      },
    },
    {
      field: "Observaciones",
      headerName: "Observaciones",
      description: "Observaciones",
      width: 200,
    },
  ];

  const consulta = () => {
    let data = {
      NUMOPERACION: 22,
      CHID: user.Id,
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
      <TitleComponent title={"Historial de Visitas"} show={open} />
      <Grid container spacing={1} padding={0}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <div style={{ height: 500, width: "100%" }}>
            <MUIXDataGridSimple columns={columnsRel} rows={data} />
          </div>
        </Grid>
      </Grid>
      {verTrazabilidad ? (
        <Trazabilidad handleFunction={handleclose} obj={vrows} />
      ) : (
        ""
      )}
    </div>
  );
};

export default VisitasIndividual;
