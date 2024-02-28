import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Toast } from "../../helpers/Toast";
import SelectValues from "../../interfaces/Share";
import { USUARIORESPONSE } from "../../interfaces/UserInfo";
import { Visita } from "../../interfaces/Visitas";
import { ShareService } from "../../services/ShareService";
import { CatalogosServices } from "../../services/catalogosServices";
import { getUser } from "../../services/localStorage";
import { TooltipPersonalizado } from "../componentes/CustomizedTooltips";
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
  const [data, setData] = useState([]);

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
        console.log(res.RESPONSE);
        setListEdificio(res.RESPONSE);
        if ((res.RESPONSE.length = 1)) {
          handleFilterEdificio(res.RESPONSE[0].value);
        }
      } else if (operacion === 8) {
        setListAcceso(res.RESPONSE);
        if ((res.RESPONSE.length = 1)) {
          handleFilterAcceso(res.RESPONSE[0].value);
        }
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

  const handleRowDoubleClick = (v: any) => {
    console.log("Se dio click");
    console.log(v);
    let data = {
      NUMOPERACION: 17,
      NombreVisitante: v.NombreVisitante,
      ApellidoPVisitante: v.ApellidoPVisitante,
      ApellidoMVisitante: v.ApellidoMVisitante,
    };
    CatalogosServices.visita_index(data).then((res) => {
      console.log(res.RESPONSE[0]);
      setData([]);
      setNombreVisitante(res.RESPONSE[0].NombreVisitante);
      setApellidoPVisitante(res.RESPONSE[0].ApellidoPVisitante);
      setApellidoMVisitante(res.RESPONSE[0].ApellidoMVisitante);
      setidEntidad(res.RESPONSE[0].idEntidad);
      setNombreReceptor(res.RESPONSE[0].NombreReceptor);
      setApellidoPReceptor(res.RESPONSE[0].ApellidoPReceptor);
      setApellidoMReceptor(res.RESPONSE[0].ApellidoMReceptor);
      setidunidad(res.RESPONSE[0].IdEntidadReceptor);
      setidpiso(res.RESPONSE[0].PisoReceptor);
      setCorreo(res.RESPONSE[0].EmailNotificacion);
      handleFilteridTipo(res.RESPONSE[0].idTipoentidad);
      handleFilteridEntidad(res.RESPONSE[0].idEntidad);
      setExt(res.RESPONSE[0].Extencion);
      setObservaciones(res.RESPONSE[0].Observaciones);
    });
  };
  const cleardata = () => {
    setData([]);
    setApellidoPVisitante("");
    setApellidoMVisitante("");
    setidEntidad("");
    setNombreReceptor("");
    setApellidoPReceptor("");
    setApellidoMReceptor("");
    setidunidad("");
    setidpiso("");
    setCorreo("");
    handleFilteridTipo("");
    handleFilteridEntidad("");
    setExt("");
    setObservaciones("");
  };
  const handleSearch = (v: string) => {
    if (v !== "" && v != null) {
      let data = {
        NUMOPERACION: 16,
        NombreVisitante: v,
      };
      CatalogosServices.visita_index(data).then((res) => {
        setData(res.RESPONSE);
      });
      console.log(data);
    }
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
                  autoComplete="false"
                  fullWidth
                  size="small"
                  required
                  id="outlined-required"
                  defaultValue=""
                  value={NombreVisitante}
                  onChange={(v) => {
                    setNombreVisitante(v.target.value);
                    handleSearch(v.target.value);
                  }}
                  error={NombreVisitante === "" ? true : false}
                />
                {NombreVisitante === "" ? (
                  ""
                ) : data.length > 0 ? (
                  <TooltipPersonalizado
                    placement="left"
                    title={<React.Fragment>Datos Sugeridos</React.Fragment>}
                  >
                    <>
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        Doble click sobre el registro para copiar sus datos. o
                        Limpiar datos{" "}
                        <DeleteIcon
                          fontSize="small"
                          color="error"
                          onClick={() => cleardata()}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TableContainer
                          component={Paper}
                          style={{
                            position: "fixed",
                            zIndex: 2000,
                            height: 500,
                            overflowY: "auto",
                            width: 1200,
                          }}
                        >
                          <Table
                            sx={{ minWidth: 300 }}
                            size="small"
                            aria-label="a dense table"
                            stickyHeader
                          >
                            <TableHead>
                              <TableRow>
                                <TableCell>Nombre Visitante</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {data.map((item: Visita) => (
                                <TableRow
                                  key={item.id}
                                  onDoubleClick={() =>
                                    handleRowDoubleClick(item)
                                  }
                                >
                                  <TableCell component="th" scope="row">
                                    {item.NombreVisitante}{" "}
                                    {item.ApellidoPVisitante}{" "}
                                    {item.ApellidoMVisitante}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Grid>
                    </>
                  </TooltipPersonalizado>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={4}>
                <Typography variant="subtitle2" style={{ color: "black" }}>
                  *Apellido Paterno:
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  required
                  autoComplete="false"
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
                  autoComplete="false"
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
                  autoComplete="false"
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
                  autoComplete="false"
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
                  autoComplete="false"
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
                  autoComplete="false"
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
                autoComplete="false"
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
                autoComplete="false"
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
