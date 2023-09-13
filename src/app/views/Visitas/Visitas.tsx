import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SelectValues from "../../interfaces/Share";
import ModalForm from "../componentes/ModalForm";
import SelectFrag from "../componentes/SelectFrag";

const Visitas = () => {
  const navigate = useNavigate();
  const [idTipo, setidTipo] = useState("");
  const [ListIdTipo, setListIdTipo] = useState<SelectValues[]>([]);

  const handleFilteridTipo = (v: string) => {
    setidTipo(v);
  };

  const handleSend = () => {
    Swal.fire("Favor de Completar los Campos", "¡Error!", "info");
  };

  const handleClose = () => {
    navigate("/");
  };

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
                  value={idTipo}
                  options={ListIdTipo}
                  onInputChange={handleFilteridTipo}
                  placeholder={"Seleccione.."}
                  disabled={false}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography sx={{ fontFamily: "sans-serif" }}>
                  Proveedor:
                </Typography>
                <SelectFrag
                  value={idTipo}
                  options={ListIdTipo}
                  onInputChange={handleFilteridTipo}
                  placeholder={"Seleccione.."}
                  disabled={false}
                />
              </Grid>

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
                    />
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
                    <TextField
                      fullWidth
                      size="small"
                      required
                      id="outlined-required"
                      label="Nombre(s)"
                      defaultValue=""
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
                      value={idTipo}
                      options={ListIdTipo}
                      onInputChange={handleFilteridTipo}
                      placeholder={"Seleccione.."}
                      disabled={false}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <Typography sx={{ fontFamily: "sans-serif" }}>
                      Piso:
                    </Typography>
                    <SelectFrag
                      value={idTipo}
                      options={ListIdTipo}
                      onInputChange={handleFilteridTipo}
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
                  <TextField
                    fullWidth
                    required
                    id="outlined-required"
                    label="Nombre(s)"
                    defaultValue=""
                  />
                </Grid>
                <Grid item xs={12} sm={3} md={3} lg={3}>
                  <TextField
                    fullWidth
                    required
                    id="outlined-required"
                    label="Apellido Paterno"
                    defaultValue=""
                  />
                </Grid>
                <Grid item xs={12} sm={3} md={3} lg={3}></Grid>
                <Grid item xs={12} sm={3} md={3} lg={3}>
                  <TextField
                    fullWidth
                    required
                    id="outlined-required"
                    label="Apellido Materno"
                    defaultValue=""
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
    </>
  );
};

export default Visitas;
