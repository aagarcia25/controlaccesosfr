import { Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Toast } from "../../helpers/Toast";
import SelectValues from "../../interfaces/Share";
import { USUARIORESPONSE } from "../../interfaces/UserInfo";
import { ShareService } from "../../services/ShareService";
import { CatalogosServices } from "../../services/catalogosServices";
import { getUser } from "../../services/localStorage";
import SelectFrag from "../componentes/SelectFrag";
import TitleComponent from "../componentes/TitleComponent";

const VisitasFlex = () => {
  const navigate = useNavigate();
  const [open, setopen] = useState(false);
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const [id, setId] = useState("");
  const [idunidad, setidunidad] = useState("");
  const [ListUnidad, setListUnidad] = useState<SelectValues[]>([]);
  const [idpiso, setidpiso] = useState("");
  const [ListPiso, setListPiso] = useState<SelectValues[]>([]);
  const [idTipo, setidTipo] = useState("");
  const [ListIdTipo, setListIdTipo] = useState<SelectValues[]>([]);
  const [idEntidad, setidEntidad] = useState("");
  const [ListEntidad, setListEntidad] = useState<SelectValues[]>([]);
  const [NombreVisitante, setNombreVisitante] = useState("");
  const [ApellidoPVisitante, setApellidoPVisitante] = useState("");
  const [ApellidoMVisitante, setApellidoMVisitante] = useState("");
  const [NombreReceptor, setNombreReceptor] = useState("");
  const [ApellidoPReceptor, setApellidoPReceptor] = useState("");
  const [ApellidoMReceptor, setApellidoMReceptor] = useState("");
  const [ext, setExt] = useState("");
  const [Correo, setCorreo] = useState("");
  const [idEdificio, setidEdificio] = useState("");
  const [ListEdificio, setListEdificio] = useState<SelectValues[]>([]);
  const [idAcceso, setidAcceso] = useState("");
  const [ListAcceso, setListAcceso] = useState<SelectValues[]>([]);
  const [Observaciones, setObservaciones] = useState("");

  const loadFilter = (operacion: number, id?: string) => {
    setopen(true);
    let data = { NUMOPERACION: operacion, P_ID: id };
    ShareService.SelectIndex(data).then((res) => {
      if (operacion === 1) {
        setListIdTipo(res.RESPONSE);
      } else if (operacion === 2) {
        setListEntidad(res.RESPONSE);
        setopen(false);
      } else if (operacion === 3) {
      } else if (operacion === 4) {
      } else if (operacion === 5) {
        setListPiso(res.RESPONSE);
      } else if (operacion === 11) {
        setListUnidad(res.RESPONSE);
        setopen(false);
      } else if (operacion === 7) {
        setListEdificio(res.RESPONSE);
      } else if (operacion === 8) {
        setListAcceso(res.RESPONSE);
        setopen(false);
      }
    });
  };

  const handleFilteridunidad = (v: string) => {
    setidunidad(v);
  };

  const handleFilteridPiso = (v: string) => {
    setidpiso(v);
  };

  const handleFilteridEntidad = (v: string) => {
    setidEntidad(v);
  };

  const handleFilteridTipo = (v: string) => {
    setidTipo(v);
    loadFilter(2, v);
  };

  const handleFilterEdificio = (v: string) => {
    setidEdificio(v);
    loadFilter(8, v);
  };

  const handleFilterAcceso = (v: string) => {
    setidAcceso(v);
  };

  const handleSend = () => {
    let send = false;

    if (
      !NombreVisitante ||
      !ApellidoPVisitante ||
      !NombreReceptor ||
      !ApellidoPReceptor ||
      !idunidad ||
      !idpiso ||
      !idEdificio ||
      !idAcceso
    ) {
      Swal.fire("Favor de Completar los Campos con (*)", "¡Error!", "info");
      send = false;
      setopen(false);
    } else {
      send = true;
    }

    let data = {
      NUMOPERACION: 15,
      CHID: id,
      CHUSER: user.Id,
      ModificadoPor: user.Id,
      IdTipoAcceso: "f751513c-528e-11ee-b06d-3cd92b4d9bf4",
      NombreVisitante: NombreVisitante,
      ApellidoPVisitante: ApellidoPVisitante,
      ApellidoMVisitante: ApellidoMVisitante,
      idTipoentidad: idTipo,
      idEntidad: idEntidad,
      NombreReceptor: NombreReceptor,
      ApellidoPReceptor: ApellidoPReceptor,
      ApellidoMReceptor: ApellidoMReceptor,
      idEntidadReceptor: idunidad,
      PisoReceptor: idpiso,
      EmailNotificacion: Correo,
      IdEdificio: idEdificio,
      IdAcceso: idAcceso,
      Extencion: ext,
      Observaciones: Observaciones,
    };

    if (send) {
      setopen(true);
      CatalogosServices.visita_index(data).then((res) => {
        if (res.SUCCESS) {
          Toast.fire({
            icon: "success",
            title: "¡Registro Agregado!",
          });
          setId(res.RESPONSE.id);
          setopen(false);
          navigate("/inicio/visitasGNRL");
        } else {
          Swal.fire(res.STRMESSAGE, "¡Error!", "info");
          setopen(false);
        }
      });
    }
  };

  useEffect(() => {
    loadFilter(1);
    loadFilter(5);
    loadFilter(11);
    loadFilter(7, user.Id);
  }, []);

  return (
    <>
      <TitleComponent title={"Generar Visita"} show={open} />
      <Typography
        sx={{
          fontFamily: "sans-serif",
          textAlign: "center",
          fontSize: "20px",
        }}
      >
        Completa la información
      </Typography>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          container
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ padding: "2%" }}
        >
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography variant="body1" gutterBottom>
              Visitante:
            </Typography>
            <Grid
              container
              item
              spacing={1}
              xs={12}
              sm={12}
              md={12}
              lg={12}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12} sm={4} md={4} lg={4}>
                <Typography variant="subtitle2" style={{ color: "black" }}>
                  *Nombre(s):
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  required
                  id="outlined-required"
                  defaultValue=""
                  value={NombreVisitante}
                  onChange={(v) => setNombreVisitante(v.target.value)}
                  error={NombreVisitante === "" ? true : false}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={4}>
                <Typography variant="subtitle2" style={{ color: "black" }}>
                  *Apellido Paterno:
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  required
                  id="outlined-required"
                  defaultValue=""
                  value={ApellidoPVisitante}
                  onChange={(v) => setApellidoPVisitante(v.target.value)}
                  error={ApellidoPVisitante === "" ? true : false}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={4}>
                <Typography variant="subtitle2" style={{ color: "black" }}>
                  Apellido Materno:
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  required
                  id="outlined-required"
                  defaultValue=""
                  value={ApellidoMVisitante}
                  onChange={(v) => setApellidoMVisitante(v.target.value)}
                />
              </Grid>

              <Grid
                container
                item
                spacing={1}
                xs={12}
                sm={12}
                md={12}
                lg={12}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={12} sm={8} md={8} lg={8}>
                  <Typography sx={{ fontFamily: "sans-serif" }}>
                    *Origen:
                  </Typography>
                  <SelectFrag
                    value={idTipo}
                    options={ListIdTipo}
                    onInputChange={handleFilteridTipo}
                    placeholder={"Seleccione.."}
                    disabled={false}
                  />
                </Grid>

                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <Typography sx={{ fontFamily: "sans-serif" }}>
                    *Área:
                  </Typography>
                  <SelectFrag
                    value={idEntidad}
                    options={ListEntidad}
                    onInputChange={handleFilteridEntidad}
                    placeholder={"Seleccione.."}
                    disabled={false}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography sx={{ fontFamily: "sans-serif" }}>
              Persona a Visitar:
            </Typography>

            <Grid
              container
              item
              spacing={1}
              xs={12}
              sm={12}
              md={12}
              lg={12}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12} sm={4} md={4} lg={4}>
                <Typography variant="subtitle2" style={{ color: "black" }}>
                  *Nombre(s):
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  required
                  id="outlined-required"
                  defaultValue=""
                  value={NombreReceptor}
                  onChange={(v) => setNombreReceptor(v.target.value)}
                  error={NombreReceptor === "" ? true : false}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={4}>
                <Typography variant="subtitle2" style={{ color: "black" }}>
                  *Apellido Paterno:
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  required
                  id="outlined-required"
                  defaultValue=""
                  value={ApellidoPReceptor}
                  onChange={(v) => setApellidoPReceptor(v.target.value)}
                  error={ApellidoPReceptor === "" ? true : false}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={4}>
                <Typography variant="subtitle2" style={{ color: "black" }}>
                  Apellido Materno:
                </Typography>
                <TextField
                  size="small"
                  fullWidth
                  required
                  id="outlined-required"
                  defaultValue=""
                  value={ApellidoMReceptor}
                  onChange={(v) => setApellidoMReceptor(v.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12} spacing={1}>
            <Typography sx={{ fontFamily: "sans-serif" }}>
              Datos de Visita:
            </Typography>

            <Grid
              container
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={1}
            >
              <Grid item xs={12} sm={8} md={8} lg={8}>
                <Typography sx={{ fontFamily: "sans-serif" }}>
                  *Unidad Administrativa:
                </Typography>
                <SelectFrag
                  value={idunidad}
                  options={ListUnidad}
                  onInputChange={handleFilteridunidad}
                  placeholder={"Seleccione.."}
                  disabled={false}
                />
              </Grid>

              <Grid item xs={12} sm={4} md={4} lg={4}>
                <Typography variant="subtitle2" style={{ color: "black" }}>
                  Extensión:
                </Typography>
                <TextField
                  size="small"
                  fullWidth
                  id="outlined-required"
                  defaultValue=""
                  value={ext}
                  onChange={(v) => setExt(v.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid
            container
            item
            spacing={1}
            xs={12}
            sm={12}
            md={12}
            lg={12}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                *Edificio:
              </Typography>
              <SelectFrag
                value={idEdificio}
                options={ListEdificio}
                onInputChange={handleFilterEdificio}
                placeholder={"Seleccione.."}
                disabled={false}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                *Acceso:
              </Typography>
              <SelectFrag
                value={idAcceso}
                options={ListAcceso}
                onInputChange={handleFilterAcceso}
                placeholder={"Seleccione.."}
                disabled={false}
              />
            </Grid>

            <Grid item xs={12} sm={4} md={4} lg={4}>
              <Typography sx={{ fontFamily: "sans-serif" }}>*Piso:</Typography>
              <SelectFrag
                value={idpiso}
                options={ListPiso}
                onInputChange={handleFilteridPiso}
                placeholder={"Seleccione.."}
                disabled={false}
              />
            </Grid>
          </Grid>

          <Grid
            container
            item
            spacing={1}
            xs={12}
            sm={12}
            md={12}
            lg={12}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={3} sm={3} md={3} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Correo para Notificación:
              </Typography>
              <TextField
                size="small"
                fullWidth
                id="outlined-required"
                defaultValue=""
                value={Correo}
                onChange={(v) => setCorreo(v.target.value)}
              />
            </Grid>
            <Grid item xs={9} sm={9} md={9} lg={9}>
              <Typography variant="subtitle2" style={{ color: "black" }}>
                Observaciones:
              </Typography>
              <TextField
                size="small"
                fullWidth
                multiline
                rows={3}
                id="outlined-required"
                defaultValue=""
                value={Observaciones}
                onChange={(v) => setObservaciones(v.target.value)}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={4} md={4} lg={4}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            spacing={2}
            sx={{
              "text-align": "center",
            }}
          >
            <Grid item xs={12} sm={12} md={12} lg={2}></Grid>
            <Grid item xs={12} sm={12} md={12} lg={3}>
              <Button className={"guardar"} onClick={() => handleSend()}>
                {"Guardar Información"}
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={3}></Grid>
            <Grid item xs={12} sm={12} md={12} lg={2}></Grid>
            <Grid item xs={12} sm={12} md={12} lg={2}></Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default VisitasFlex;
