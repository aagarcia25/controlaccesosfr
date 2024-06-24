import InsightsIcon from "@mui/icons-material/Insights";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Box, Grid, IconButton, Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PERMISO, USUARIORESPONSE } from "../../interfaces/UserInfo";
import { Iroles } from "../../interfaces/menu";
import { CatalogosServices } from "../../services/catalogosServices";
import { getPermisos, getRoles, getUser } from "../../services/localStorage";
import MUIXDataGridSimple from "../componentes/MUIXDataGridSimple";
import TitleComponent from "../componentes/TitleComponent";
import Trazabilidad from "../componentes/Trazabilidad";
const VisitasGeneralSinVigencia = () => {
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const list: Iroles[] = JSON.parse(String(getRoles()));
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [registra, setRegistra] = useState(true);
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
            <Tooltip title={"Ver"}>
              <IconButton
                value="check"
                onClick={() => navigate("/inicio/view/" + v.id)}
              >
                <RemoveRedEyeIcon />
              </IconButton>
            </Tooltip>
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
      width: 250,
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
      field: "Observaciones",
      headerName: "Observaciones",
      description: "Observaciones",
      width: 200,
    },
  ];

  function verificarRol(menusList: Iroles[], rol: string): boolean {
    for (const menu of menusList) {
      if (menu.ControlInterno === rol) {
        return true;
      }
    }
    return false;
  }
  const consulta = () => {
    let data = {
      NUMOPERACION: 23,
      IDENTIDAD: user.IdEntidad,
      ROL: verificarRol(list, "ADMINSICA"),
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
      <TitleComponent title={"Códigos QR Sin Vigencia"} show={open} />
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

export default VisitasGeneralSinVigencia;
