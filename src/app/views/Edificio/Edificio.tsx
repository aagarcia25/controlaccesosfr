import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import DoorBackIcon from "@mui/icons-material/DoorBack";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Toast } from "../../helpers/Toast";
import { USUARIORESPONSE } from "../../interfaces/UserInfo";
import { CatalogosServices } from "../../services/catalogosServices";
import { getUser } from "../../services/localStorage";
import ButtonsAdd from "../componentes/ButtonsAdd";
import MUIXDataGridSimple from "../componentes/MUIXDataGridSimple";
import ModalForm from "../componentes/ModalForm";
import TitleComponent from "../componentes/TitleComponent";
import EdificioAccesos from "./EdificioAccesos";
import EdificioUsuarios from "./EdificioUsuarios";
export const Edificio = () => {
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openEA, setopenEA] = useState(false);
  const [openEU, setopenEU] = useState(false);
  const [openModal, setopenModal] = useState(false);
  const [vrows, setVrows] = useState({});
  const [descripcion, setdescripcion] = useState("");
  const [calle, setcalle] = useState("");
  const [colonia, setcolonia] = useState("");
  const [municipio, setmunicipio] = useState("");
  const [estado, setestado] = useState("");
  const [cp, setcp] = useState("");
  const [id, setid] = useState("");

  const handleClose = () => {
    setopenEA(false);
    setopenEU(false);
    setopenModal(false);
  };

  const handleOpen = (v: any) => {
    setid("");
    setdescripcion("");
    setcalle("");
    setcolonia("");
    setmunicipio("");
    setestado("");
    setcp("");
    setopenModal(true);
  };
  const handleEdit = (v: any) => {
    console.log(v);
    setid(v.id);
    setdescripcion(v.row.Descripcion);
    setcalle(v.row.Calle);
    setcolonia(v.row.Colonia);
    setmunicipio(v.row.Municipio);
    setestado(v.row.Estado);
    setcp(v.row.CP);
    setopenModal(true);
  };
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
      width: 250,
      renderCell: (v: any) => {
        return (
          <Box>
            <Tooltip title={"Accesos Del Edificio"}>
              <IconButton value="check" onClick={() => handleEdit(v)}>
                <ModeEditOutlineIcon />
              </IconButton>
            </Tooltip>

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

  const handleSubmit = () => {
    setOpen(true);
    let data = {
      CHID: id,
      NUMOPERACION: id !== "" ? 2 : 1,
      CHUSER: user.Id,
      Descripcion: descripcion,
      Calle: calle,
      Colonia: colonia,
      Municipio: municipio,
      Estado: estado,
      CP: cp,
    };

    CatalogosServices.Edificio_index(data).then((res) => {
      setOpen(true);
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Registro Eliminado!",
        });
        handleClose();
        consulta();
        setOpen(false);
      } else {
        Swal.fire("¡Error!", res.STRMESSAGE, "error");
      }
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
      {openModal ? (
        <ModalForm title={"Registrar Edificio"} handleClose={handleClose}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Edificio:
              </Typography>
              <TextField
                size="small"
                fullWidth
                id="outlined-required"
                defaultValue=""
                value={descripcion}
                onChange={(v) => setdescripcion(v.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography sx={{ fontFamily: "sans-serif" }}>Calle:</Typography>
              <TextField
                size="small"
                fullWidth
                id="outlined-required"
                defaultValue=""
                value={calle}
                onChange={(v) => setcalle(v.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Colonia:
              </Typography>
              <TextField
                size="small"
                fullWidth
                id="outlined-required"
                defaultValue=""
                value={colonia}
                onChange={(v) => setcolonia(v.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Municipio:
              </Typography>
              <TextField
                size="small"
                fullWidth
                id="outlined-required"
                defaultValue=""
                value={municipio}
                onChange={(v) => setmunicipio(v.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography sx={{ fontFamily: "sans-serif" }}>Estado:</Typography>
              <TextField
                size="small"
                fullWidth
                id="outlined-required"
                defaultValue=""
                value={estado}
                onChange={(v) => setestado(v.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Código Postal:
              </Typography>
              <TextField
                size="small"
                fullWidth
                id="outlined-required"
                defaultValue=""
                value={cp}
                onChange={(v) => setcp(v.target.value)}
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
      {openEU ? <EdificioUsuarios handleClose={handleClose} dt={vrows} /> : ""}
      {openEA ? <EdificioAccesos handleClose={handleClose} dt={vrows} /> : ""}
    </div>
  );
};
