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

const TableVisita = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [registra, setRegistra] = useState(true);
  const [verTrazabilidad, setVerTrazabilidad] = useState<boolean>(false);
  const [vrows, setVrows] = useState<{}>("");
  const navigate = useNavigate();

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
              <IconButton value="check">
                <InsightsIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
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
    <div style={{ height: 300, width: "100%" }}>
      <MUIXDataGridSimple columns={columnsRel} rows={data} />
    </div>
  );
};

export default TableVisita;
