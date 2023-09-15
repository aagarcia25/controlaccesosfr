import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Toast } from "../../helpers/Toast";
import SelectValues from "../../interfaces/Share";
import { USUARIORESPONSE } from "../../interfaces/UserInfo";
import { ShareService } from "../../services/ShareService";
import { CatalogosServices } from "../../services/catalogosServices";
import { getUser } from "../../services/localStorage";
import CustomizedDate from "../componentes/CustomizedDate";
import ModalForm from "../componentes/ModalForm";
import SelectFrag from "../componentes/SelectFrag";
import VisitasModal from "./VisitasModal";

const Visitas = () => {
  const navigate = useNavigate();
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const [vrows, setVrows] = useState({});
  const [id, setId] = useState("");
  const [idunidad, setidunidad] = useState("");
  const [ListUnidad, setListUnidad] = useState<SelectValues[]>([]);
  const [idvista, setidvista] = useState("");
  const [ListVisita, setListVisita] = useState<SelectValues[]>([]);
  const [idpiso, setidpiso] = useState("");
  const [ListPiso, setListPiso] = useState<SelectValues[]>([]);
  const [idTipo, setidTipo] = useState("");
  const [ListIdTipo, setListIdTipo] = useState<SelectValues[]>([]);
  const [idEntidad, setidEntidad] = useState("");
  const [ListEntidad, setListEntidad] = useState<SelectValues[]>([]);
  const [idDuracion, setidDuracion] = useState("");
  const [ListDuracion, setListDuracion] = useState<SelectValues[]>([]);
  const [proveedor, setproveedor] = useState("");
  const [NombreVisitante, setNombreVisitante] = useState("");
  const [ApellidoPVisitante, setApellidoPVisitante] = useState("");
  const [ApellidoMVisitante, setApellidoMVisitante] = useState("");
  const [NombreReceptor, setNombreReceptor] = useState("");
  const [ApellidoPReceptor, setApellidoPReceptor] = useState("");
  const [ApellidoMReceptor, setApellidoMReceptor] = useState("");
  const [openModal, setopenModal] = useState(false);

  const [fini, setFini] = useState<Dayjs | null>();

  const handleFilteridunidad = (v: string) => {
    setidunidad(v);
  };

  const handleFilteridPiso = (v: string) => {
    setidpiso(v);
  };

  const handleFilteridDuracion = (v: string) => {
    setidDuracion(v);
  };

  const handleFilteridEntidad = (v: string) => {
    setidEntidad(v);
  };

  const handleFilteridTipo = (v: string) => {
    setidTipo(v);
    loadFilter(2, v);
  };

  const handleSend = () => {
    let send = false;
    if (!idvista) {
      Swal.fire("Indique el Tipo de Acceso", "¡Error!", "info");
      send = false;
    }

    if (idvista == "f751513c-528e-11ee-b06d-3cd92b4d9bf4") {
      if (
        !NombreVisitante ||
        !ApellidoPVisitante ||
        !NombreReceptor ||
        !ApellidoMReceptor ||
        !idunidad ||
        !idpiso ||
        !idvista ||
        !idDuracion
      ) {
        Swal.fire("Favor de Completar los Campos", "¡Error!", "info");
        send = false;
      } else {
        send = true;
      }
    } else if (idvista == "fca60b42-528e-11ee-b06d-3cd92b4d9bf4") {
      if (
        !proveedor ||
        !NombreVisitante ||
        !ApellidoPVisitante ||
        !NombreReceptor ||
        !ApellidoMReceptor ||
        !idunidad ||
        !idpiso ||
        !idvista ||
        !idDuracion
      ) {
        Swal.fire("Favor de Completar los Campos", "¡Error!", "info");
        send = false;
      } else {
        send = true;
      }
    }

    let data = {
      NUMOPERACION: 1,
      CHID: id,
      CHUSER: user.Id,
      ModificadoPor: user.Id,
      FechaVisita: fini?.format("YYYY-MM-DDTHH:mm:ssZ"),
      Duracion: idDuracion,
      IdTipoAcceso: idvista,
      Proveedor: proveedor,
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
    };

    if (send) {
      CatalogosServices.visita_index(data).then((res) => {
        if (res.SUCCESS) {
          Toast.fire({
            icon: "success",
            title: "¡Registro Agregado!",
          });
          console.log("Registro Guardado");
          console.log(res.RESPONSE);
          setVrows(res.RESPONSE);
          setId(res.RESPONSE.id);
          //  handleClose();
          setopenModal(true);
        } else {
          Swal.fire(res.STRMESSAGE, "¡Error!", "info");
        }
      });
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  const handleFilteridvisita = (v: any) => {
    setidvista(v);
  };

  const handleFilterChange2 = (v: any) => {
    setFini(v);
  };

  const loadFilter = (operacion: number, id?: string) => {
    let data = { NUMOPERACION: operacion, P_ID: id };
    ShareService.SelectIndex(data).then((res) => {
      if (operacion === 1) {
        setListIdTipo(res.RESPONSE);
      } else if (operacion === 2) {
        setListEntidad(res.RESPONSE);
      } else if (operacion === 3) {
        setListDuracion(res.RESPONSE);
      } else if (operacion === 4) {
        setListVisita(res.RESPONSE);
      } else if (operacion === 5) {
        setListPiso(res.RESPONSE);
      } else if (operacion === 6) {
        setListUnidad(res.RESPONSE);
      }
    });
  };

  useEffect(() => {
    loadFilter(1);
    loadFilter(3);
    loadFilter(4);
    loadFilter(5);
    loadFilter(6);
  }, []);

  return (
    <>
      <ModalForm title={"Generación de Visita QR"} handleClose={handleClose}>
        <Box boxShadow={3}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
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
              sx={{ padding: "2%" }}
            >
              <Grid item xs={12} sm={12} md={12} lg={12}>
                Completa la información
                <Divider key={Math.random()} absolute />
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography sx={{ fontFamily: "sans-serif" }}>
                  Tipo de Acceso:
                </Typography>
                <SelectFrag
                  value={idvista}
                  options={ListVisita}
                  onInputChange={handleFilteridvisita}
                  placeholder={"Seleccione.."}
                  disabled={false}
                />
              </Grid>

              {idvista == "fca60b42-528e-11ee-b06d-3cd92b4d9bf4" ? (
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    fullWidth
                    size="small"
                    required
                    id="outlined-required"
                    label="Proveedor"
                    defaultValue=""
                    value={proveedor}
                    onChange={(v) => setproveedor(v.target.value)}
                    error={proveedor == "" ? true : false}
                  />
                </Grid>
              ) : (
                ""
              )}

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
                    <TextField
                      fullWidth
                      size="small"
                      required
                      id="outlined-required"
                      label="Nombre(s)"
                      defaultValue=""
                      value={NombreVisitante}
                      onChange={(v) => setNombreVisitante(v.target.value)}
                      error={NombreVisitante == "" ? true : false}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <TextField
                      fullWidth
                      size="small"
                      required
                      id="outlined-required"
                      label="Apellido Paterno"
                      defaultValue=""
                      value={ApellidoPVisitante}
                      onChange={(v) => setApellidoPVisitante(v.target.value)}
                      error={ApellidoPVisitante == "" ? true : false}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <TextField
                      fullWidth
                      size="small"
                      required
                      id="outlined-required"
                      label="Apellido Materno"
                      defaultValue=""
                      value={ApellidoMVisitante}
                      onChange={(v) => setApellidoMVisitante(v.target.value)}
                      error={ApellidoMVisitante == "" ? true : false}
                    />
                  </Grid>

                  {idvista == "f751513c-528e-11ee-b06d-3cd92b4d9bf4" ? (
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
                          Origen:
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
                          Área:
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
                  ) : (
                    ""
                  )}
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
                    <TextField
                      fullWidth
                      size="small"
                      required
                      id="outlined-required"
                      label="Nombre(s)"
                      defaultValue=""
                      value={NombreReceptor}
                      onChange={(v) => setNombreReceptor(v.target.value)}
                      error={NombreReceptor == "" ? true : false}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <TextField
                      fullWidth
                      size="small"
                      required
                      id="outlined-required"
                      label="Apellido Paterno"
                      defaultValue=""
                      value={ApellidoPReceptor}
                      onChange={(v) => setApellidoPReceptor(v.target.value)}
                      error={ApellidoPReceptor == "" ? true : false}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <TextField
                      size="small"
                      fullWidth
                      required
                      id="outlined-required"
                      label="Apellido Materno"
                      defaultValue=""
                      value={ApellidoMReceptor}
                      onChange={(v) => setApellidoMReceptor(v.target.value)}
                      error={ApellidoMReceptor == "" ? true : false}
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
                  <Grid item xs={12} sm={8} md={8} lg={8}>
                    <Typography sx={{ fontFamily: "sans-serif" }}>
                      Unidad Administrativa:
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
                    <Typography sx={{ fontFamily: "sans-serif" }}>
                      Piso:
                    </Typography>
                    <SelectFrag
                      value={idpiso}
                      options={ListPiso}
                      onInputChange={handleFilteridPiso}
                      placeholder={"Seleccione.."}
                      disabled={false}
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
                <Grid item xs={12} sm={3} md={3} lg={3}>
                  <CustomizedDate
                    value={fini}
                    label={"Fecha Vista"}
                    onchange={handleFilterChange2}
                  />
                </Grid>
                <Grid item xs={12} sm={3} md={3} lg={3}></Grid>
                <Grid item xs={12} sm={3} md={3} lg={3}></Grid>
                <Grid item xs={12} sm={3} md={3} lg={3}>
                  <Typography sx={{ fontFamily: "sans-serif" }}>
                    Duración:
                  </Typography>
                  <SelectFrag
                    value={idDuracion}
                    options={ListDuracion}
                    onInputChange={handleFilteridDuracion}
                    placeholder={"Seleccione.."}
                    disabled={false}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item alignItems="left" justifyContent="left" xs={2}>
              <Button className={"guardar"} onClick={() => handleSend()}>
                {"Generar QR"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </ModalForm>
      {openModal ? (
        <VisitasModal handleClose={handleClose} id={id} tipo={0} />
      ) : (
        ""
      )}
    </>
  );
};

export default Visitas;
