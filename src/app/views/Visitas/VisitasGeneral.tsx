import InsightsIcon from "@mui/icons-material/Insights";
import { Box, Grid, IconButton, Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Toast } from "../../helpers/Toast";
import { PERMISO, USUARIORESPONSE } from "../../interfaces/UserInfo";
import { CatalogosServices } from "../../services/catalogosServices";
import { getPermisos, getUser } from "../../services/localStorage";
import ButtonsAdd from "../componentes/ButtonsAdd";
import MUIXDataGridSimple from "../componentes/MUIXDataGridSimple";
import TitleComponent from "../componentes/TitleComponent";
import Trazabilidad from "../componentes/Trazabilidad";

const VisitasGeneral = () => {
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [registra, setRegistra] = useState(false);
  const [openModal, setopenModal] = useState(false);
  const [verTrazabilidad, setVerTrazabilidad] = useState<boolean>(false);
  const [vrows, setVrows] = useState<{}>("");
  const navigate = useNavigate();
  const handleclose = (data: any) => {
    setVerTrazabilidad(false);
  };

  const handleVerTazabilidad = (v: any) => {
    setVerTrazabilidad(true);
    setVrows(v.row);
  };

  const handleOpen = (v: any) => {
    navigate("/inicio/visitasFlex");
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
      width: 100,
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
      field: "FechaCreacion",
      headerName: "Fecha Creado",
      description: "Fecha Creado",
      width: 170,
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
      description: "Duración de la Visita Expresada en Horas",
      width: 150,
    },
    {
      field: "Visistante",
      headerName: "Visitante",
      description: "Visitante",
      sortable: false,
      width: 400,
      renderCell: (v) => {
        return v.row.NombreVisitante != null
          ? v.row.NombreVisitante +
              " " +
              v.row.ApellidoPVisitante +
              " " +
              v.row.ApellidoMVisitante
          : v.row.Proveedor;
      },
    },
    {
      field: "pisoreceptorrr",
      headerName: "Piso de Visita",
      description: "Piso de Visita",
      width: 150,
    },
    {
      field: "Personaavisitar",
      headerName: "Persona a Visitar",
      description: "Persona a Visitar",
      sortable: false,
      width: 300,
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

    {
      field: "entidadreceptor",
      headerName: "Unidad Administrativa",
      description: "Unidad Administrativa",
      width: 400,
    },
  ];

  const handleSubmit = () => {
    let data = {
      NUMOPERACION: 1,
      CHUSER: user.Id,
    };

    CatalogosServices.visita_index(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Registro Agregado!",
        });
        consulta();
      } else {
        Swal.fire("¡Error!", res.STRMESSAGE, "error");
      }
    });
  };

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
    permisos.map((item: PERMISO) => {
      if (String(item.menu) === "VISITAS") {
        if (String(item.ControlInterno) === "REGISTRA") {
          setRegistra(true);
        }
      }
    });

    consulta();
  }, []);

  return (
    <div>
      <TitleComponent title={"Reporte General de Visitas"} show={open} />
      <Grid container spacing={1} padding={0}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <div style={{ height: 500, width: "100%" }}>
            <ButtonsAdd handleOpen={handleOpen} agregar={registra} />
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

export default VisitasGeneral;
