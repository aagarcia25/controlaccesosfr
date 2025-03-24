import { Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import SelectFrag from "../componentes/SelectFrag";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { USUARIORESPONSE } from "../../interfaces/UserInfo";
import { getUser } from "../../services/localStorage";
import SelectValues from "../../interfaces/Share";
import dayjs, { Dayjs } from "dayjs";
import { ShareService } from "../../services/ShareService";
import { CatalogosServices } from "../../services/catalogosServices";
import { Toast } from "../../helpers/Toast";
import Swal from "sweetalert2";
import TitleComponent from "../componentes/TitleComponent";
import CustomizedDate from "../componentes/CustomizedDate";
import { UserServices } from "../../services/UserServices";

export const VisitasEspeciales = ()=>{
let params = useParams();
  const navigate = useNavigate();
  const [open, setopen] = useState(false);
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const [id, setId] = useState("");
  const [idunidad, setidunidad] = useState("");
  const [ListUnidad, setListUnidad] = useState<SelectValues[]>([]);
  const [idvista, setidvista] = useState("");
  const [ListVisita, setListVisita] = useState<SelectValues[]>([]);
  const [idpiso, setidpiso] = useState("");
  const [piso, setPiso] = useState("");
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
  const [ext, setExt] = useState("");
  const [Correo, setCorreo] = useState(user.CorreoElectronico || "");
  const [CorreoVisitante, setCorreoVisitante] = useState("");

  const [idEdificio, setidEdificio] = useState("");
  const [ListEdificio, setListEdificio] = useState<SelectValues[]>([]);
  const [idAcceso, setidAcceso] = useState("");
  const [ListAcceso, setListAcceso] = useState<SelectValues[]>([]);
  const [fini, setFini] = useState<Dayjs | null>();
  const [checked, setChecked] = useState(false);
  const [Observaciones, setObservaciones] = useState("");

  
  



  


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

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
        setListDuracion(res.RESPONSE);
      } else if (operacion === 4) {
        setListVisita(res.RESPONSE);
      } else if (operacion === 5) {
        setListPiso(res.RESPONSE);
      } else if (operacion === 6) {
        setListUnidad(res.RESPONSE);
        setopen(false);
      } else if (operacion === 7) {
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

//   const handleFilteridPiso = (v: string) => {
//     setidpiso(v);
//   };

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

  const handleFilterEdificio = (v: string) => {
    setidEdificio(v);
    loadFilter(8, v);
  };

  const handleFilterAcceso = (v: string) => {
    setidAcceso(v);
  };

  const handleedit = (id: string) => {
    setopen(true);
    let data = {
      NUMOPERACION: 5,
      CHID: id,
    };

    CatalogosServices.visita_index(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Consulta Exitosa!",
        });
        setidvista(res.RESPONSE[0].IdTipoAcceso);
        setId(res.RESPONSE[0].id);
        handleFilterChange2(dayjs(res.RESPONSE[0].FechaVisita));
        handleFilterEdificio(res.RESPONSE[0].idEdificio);
        setidDuracion(res.RESPONSE[0].Duracion);
        setNombreVisitante(res.RESPONSE[0].NombreVisitante);
        setApellidoPVisitante(res.RESPONSE[0].ApellidoPVisitante);
        setApellidoMVisitante(res.RESPONSE[0].ApellidoMVisitante);
        setNombreReceptor(res.RESPONSE[0].NombreReceptor);
        setApellidoPReceptor(res.RESPONSE[0].ApellidoPReceptor);
        setApellidoMReceptor(res.RESPONSE[0].ApellidoMReceptor);
        handleFilteridTipo(res.RESPONSE[0].idTipoentidad);
        setidEntidad(res.RESPONSE[0].idEntidad);
        setidunidad(res.RESPONSE[0].IdEntidadReceptor);
        setproveedor(res.RESPONSE[0].Proveedor);
        setCorreo(res.RESPONSE[0].EmailNotificacion);
        setExt(res.RESPONSE[0].Extencion);
        // handleFilteridPiso(res.RESPONSE[0].PisoReceptor);
        setidAcceso(res.RESPONSE[0].idAcceso);
        setChecked(res.RESPONSE[0].Indefinido);
        setObservaciones(res.RESPONSE[0].Observaciones);
        setopen(false);
      } else {
        Swal.fire(res.STRMESSAGE, "¡Error!", "info");
        setopen(false);
      }
    });
  };

  const handledeleted = () => {
    let data = {
      NUMOPERACION: 3,
      CHID: id,
      CHUSER: user.Id,
    };

    Swal.fire({
      title: "¿Estas Seguro Eliminar Esta Cita?",
      icon: "question",
      showDenyButton: false,
      showCancelButton: false,
      confirmButtonText: "Aceptar",
      background: "EBEBEB",
    }).then((result) => {
      if (result.isConfirmed) {
        CatalogosServices.visita_index(data).then((res) => {
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "¡Registro Eliminado!",
            });
            handleClose();
          } else {
            Swal.fire(res.STRMESSAGE, "¡Error!", "info");
          }
        });
      }
    });
  };
  const handleSend = () => {
    let send = false;

    if (!idvista) {
      Swal.fire("Indique el Tipo de Acceso", "¡Error!", "info");
      send = false;
    }

    if (idvista === "f751513c-528e-11ee-b06d-3cd92b4d9bf4") {
      if (
        !NombreVisitante ||
        !ApellidoPVisitante ||
        //!NombreReceptor ||
        //!ApellidoPReceptor ||
        !idunidad ||
        !idpiso ||
        !idvista 
        //!idDuracion ||
       // !idEdificio ||
        //!idAcceso
      ) {
        Swal.fire("Favor de Completar los Campos con (*)", "¡Error!", "info");
        send = false;
        setopen(false);
      } else {
        send = true;
      }
    } else if (idvista === "fca60b42-528e-11ee-b06d-3cd92b4d9bf4") {
      if (
        !proveedor ||
        !NombreVisitante ||
        !ApellidoPVisitante ||
       // !NombreReceptor ||
        //!ApellidoPReceptor ||
        !idunidad ||
        (!idpiso ) ||
        !idvista 
        //!idDuracion ||
        //!idEdificio ||
        //!idAcceso
      ) {
        Swal.fire("Favor de Completar los Campos con (*)", "¡Error!", "info");
        send = false;
      } else {
        send = true;
      }
    }

    let tipooperacion = 0;
    if (params.id !== undefined) {
      tipooperacion = 2;
    } else {
      tipooperacion = 1;
    }

    let data = {
      CorreoUsuario: Correo,
      NUMOPERACION: tipooperacion,
      CHID: id,
      CHUSER: user.Id,
      ModificadoPor: user.Id,
      FechaVisita: fini?.format("YYYY-MM-DDTHH:mm:ssZ"),
      //Duracion: idDuracion,
      IdTipoAcceso: idvista,
      Proveedor: proveedor,
      NombreVisitante: NombreVisitante,
      ApellidoPVisitante: ApellidoPVisitante,
      //ApellidoMVisitante: ApellidoMVisitante,
      idTipoentidad: idTipo,
      idEntidad: idEntidad,
    //   NombreReceptor: NombreReceptor,
    //   ApellidoPReceptor: ApellidoPReceptor,
    //   ApellidoMReceptor: ApellidoMReceptor,
      idEntidadReceptor: idunidad,
      PisoReceptor: idpiso,
      EmailNotificacion: CorreoVisitante,

      //IdEdificio: idEdificio,
      //IdAcceso: idAcceso,
      Extencion: ext,
      Indefinido: checked,
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
          navigate("/inicio/agenda");
        } else {
          if (res.STRMESSAGE.includes("NOREPET")) {
            Swal.fire(
              "Ya existe un registro con esa hora y visitante",
              "¡Error!",
              "info"
            );
          } else {
            Swal.fire(res.STRMESSAGE, "¡Error!", "info");
          }

          setopen(false);
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

  useEffect(() => {
    UserServices.verificarEntidadEspecial("Piso",setidpiso,setPiso);
    loadFilter(1);
    loadFilter(3);
    loadFilter(4);
    loadFilter(5);
    loadFilter(6, user.IdEntidad);
    loadFilter(7, user.Id);
    if (params.id !== "" && params.id !== undefined) {
      setTimeout(() => {
        handleedit(params.id || "");
      }, 2000);
    }
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
            <Typography sx={{ fontFamily: "sans-serif" }}>
              *Tipo de Acceso:
            </Typography>
            <SelectFrag
              value={idvista}
              options={ListVisita}
              onInputChange={handleFilteridvisita}
              placeholder={"Seleccione.."}
              disabled={false}
            />
          </Grid>

          {idvista === "fca60b42-528e-11ee-b06d-3cd92b4d9bf4" ? (
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography variant="body1" gutterBottom>
                *Proveedor:
              </Typography>
              <TextField
                fullWidth
                size="small"
                required
                id="outlined-required"
                label=""
                defaultValue=""
                value={proveedor}
                onChange={(v) => setproveedor(v.target.value)}
                error={proveedor === "" ? true : false}
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
                {/* <Typography variant="subtitle2" style={{ color: "black" }}>
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
                  error={ApellidoMVisitante === "" ? true : false}
                /> */}
              </Grid>

              {idvista === "f751513c-528e-11ee-b06d-3cd92b4d9bf4" ? (
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
              ) : (
                ""
              )}
            </Grid>
          </Grid>

          {/* <Grid item xs={12} sm={12} md={12} lg={12}>
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
                  error={ApellidoMReceptor === "" ? true : false}
                />
              </Grid>
            </Grid>
          </Grid> */}

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
                  //id="outlined-required"
                  defaultValue=""
                  value={ext}
                  onChange={(v) => setExt(v.target.value)}
                  //error={ext === "" ? true : false}
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
              <CustomizedDate
                value={fini}
                label={"*Fecha Visita"}
                onchange={handleFilterChange2}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                *Correo para Notificación:
              </Typography>
              <TextField
                size="small"
                fullWidth
                id="outlined-required"
                defaultValue=""
                value={Correo}
                onChange={(v) => setCorreo(v.target.value)}
                error={Correo === "" ? true : false}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
            <Typography sx={{ fontFamily: "sans-serif" }}>
                Correo de Visitante para Notificación:
              </Typography>
              <TextField
                size="small"
                fullWidth
                id="outlined-required"
                defaultValue=""
                value={CorreoVisitante}
                onChange={(v) => setCorreoVisitante(v.target.value)}
                //error={CorreoVisitante === "" ? true : false}
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
            <Grid item xs={12} sm={4} md={4} lg={4}>
              {/* <Typography sx={{ fontFamily: "sans-serif" }}>
                *Edificio:
              </Typography>
              <SelectFrag
                value={idEdificio}
                options={ListEdificio}
                onInputChange={handleFilterEdificio}
                placeholder={"Seleccione.."}
                disabled={false}
              /> */}
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              {/* <Typography sx={{ fontFamily: "sans-serif" }}>
                *Acceso:
              </Typography>
              <SelectFrag
                value={idAcceso}
                options={ListAcceso}
                onInputChange={handleFilterAcceso}
                placeholder={"Seleccione.."}
                disabled={false}
              /> */}
            </Grid>

            <Grid item xs={12} sm={4} md={4} lg={4}>
              {/* <Typography sx={{ fontFamily: "sans-serif" }}>*Piso:</Typography>
              <SelectFrag
                value={idpiso}
                options={ListPiso}
                onInputChange={handleFilteridPiso}
                placeholder={"Seleccione.."}
                disabled={false}
              /> */}
              <Typography variant="subtitle2" style={{ color: "black" }}>
                  Piso:
                </Typography>
                <TextField
                  size="small"
                  fullWidth
                  id="outlined-required"
                  value={piso}
                  
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
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid item xs={1} sm={1} md={1} lg={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Sin Vigencia"
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
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography variant="subtitle2" style={{ color: "black" }}>
                Observaciones:
              </Typography>
              <TextField
                size="small"
                fullWidth
                multiline
                rows={4}
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
                {"Generar QR"}
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={3}>
              {params.id !== undefined ? (
                <Button className={"guardar"} onClick={() => handledeleted()}>
                  {"Eliminar Cita"}
                </Button>
              ) : (
                ""
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={2}></Grid>
            <Grid item xs={12} sm={12} md={12} lg={2}></Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
