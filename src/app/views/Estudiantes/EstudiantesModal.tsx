import { useEffect, useState } from "react";
import ModalForm from "../componentes/ModalForm";
import { log } from "console";
import Progress from "../Progress";
import { Box, Grid, TextField, Typography } from "@mui/material";
import SelectFrag from "../componentes/SelectFrag";
import SelectValues from "../../interfaces/Share";
import CustomizedDate from "../componentes/CustomizedDate";
import dayjs, { Dayjs } from "dayjs";

export const EstudiantesModal = ({
    tipo,
    dt,
    handleClose,

}:{
    tipo: number;
    dt: any;
    handleClose: Function;

})=>{
  const [show, setShow] = useState(false);
  const [tipoEstudiante, setTipoEstudiante] = useState("");
  const [ListTipoEstudiante, setListTipoEstudiante] = useState<SelectValues[]>([]);
  const [genero, setGenero] = useState("");
  const [ListGenero, setListGenero] = useState<SelectValues[]>([]);
  const [unidadAdmin, setUnidadAdmin] = useState("");
  const [ListUnidadAdmin, setListUnidadAdmin] = useState<SelectValues[]>([]);
  const [NoGaffete, setNoGaffete] = useState("");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [escolaridad, setEscolaridad] = useState("");
  const [instituto, setInstituto] = useState("");
  const [responsable, setResponsable] = useState("");
  const [fInicio, setFInicio] = useState<Dayjs | null>();
  const [fFin, setFFin] = useState<Dayjs | null>();

 


  const handleFilterChangeTipoEstudiante = (v: string) => {
    setTipoEstudiante(v);
  };
  const handleFilterChangeGenero = (v: string) => {
    setGenero(v);
  };
  const handleFilterChangeUnidadAdmin = (v: string) => {
    setUnidadAdmin(v);
  };
  const handleFilterChangeFInicio = (v: any) => {
    setFInicio(v);
  };
  const handleFilterChangeFFin = (v: any) => {
    setFFin(v);
  };
    
    useEffect(() => {
       
        console.log("dt",dt);
        

    }, []);
    return(
        <>
    <ModalForm
        title={tipo === 1 ? "Agregar Registro" : "Editar Registro"}
        handleClose={handleClose}
    >
    <Progress open={show}></Progress>
        <Box boxShadow={3}>
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
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Tipo de Estudiante:
              </Typography>
              <SelectFrag
                value={tipoEstudiante}
                options={ListTipoEstudiante}
                onInputChange={handleFilterChangeTipoEstudiante}
                placeholder={"Seleccione.."}
                disabled={false}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Género:
              </Typography>
              <SelectFrag
                value={genero}
                options={ListGenero}
                onInputChange={handleFilterChangeGenero}
                placeholder={"Seleccione.."}
                disabled={false}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Typography sx={{ fontFamily: "sans-serif" }}>
                Unidad Administrativa:
              </Typography>
              <SelectFrag
                value={unidadAdmin}
                options={ListUnidadAdmin}
                onInputChange={handleFilterChangeUnidadAdmin}
                placeholder={"Seleccione.."}
                disabled={false} />
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
                required
                margin="dense"
                id="NoGaffete"
                label="Número de Gaffete"
                value={NoGaffete}
                type="text"
                fullWidth
                variant="standard"
                onChange={(v) => setNoGaffete(v.target.value)}
                error={NoGaffete === "" ? true : false}
                InputProps={{
                  readOnly: tipo === 1 ? false : true,
                }}
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
            sx={{ padding: "2%" }}
          >
            <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
                required
                margin="dense"
                id="nombre"
                label="Nombre Completo"
                value={nombre}
                type="text"
                fullWidth
                variant="standard"
                onChange={(v) => setNombre(v.target.value)}
                error={nombre === "" ? true : false}
                InputProps={{
                  readOnly: tipo === 1 ? false : true,
                }}
                disabled={false}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
                required
                margin="dense"
                id="telefono"
                label="Teléfono"
                value={telefono}
                type="text"
                fullWidth
                variant="standard"
                onChange={(v) => setTelefono(v.target.value)}
                error={telefono === "" ? true : false}
                InputProps={{
                  readOnly: tipo === 1 ? false : true,
                }}
                disabled={false}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
                required
                margin="dense"
                id="escolaridad"
                label="Escolaridad"
                value={escolaridad}
                type="text"
                fullWidth
                variant="standard"
                onChange={(v) => setEscolaridad(v.target.value)}
                error={escolaridad === "" ? true : false}
                InputProps={{ 
                  readOnly: tipo === 1 ? false : true,
                }}
                disabled={false}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
                required
                margin="dense"
                id="instituto"
                label="Instituto Educativo"
                value={instituto}
                type="text"
                fullWidth
                variant="standard"
                onChange={(v) => setInstituto(v.target.value)}
                error={instituto === "" ? true : false}
                InputProps={{
                  readOnly: tipo === 1 ? false : true,
                }}
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
            sx={{ padding: "2%" }}
          >
            <Grid item xs={12} sm={6} md={4} lg={3}>
            <TextField
                required
                margin="dense"
                id="responsable"
                label="Persona Responsable"
                value={responsable}
                type="text"
                fullWidth
                variant="standard"
                onChange={(v) => setResponsable(v.target.value)}
                error={responsable === "" ? true : false}
                InputProps={{
                  readOnly: tipo === 1 ? false : true,
                }}
                disabled={false}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomizedDate
                      value={fInicio}
                      label={"Fecha de Vigencia (Inicio)"}
                      onchange={handleFilterChangeFInicio}
                    />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
            <CustomizedDate
                      value={fFin}
                      label={"Fecha de Vigencia (Fin)"}
                      onchange={handleFilterChangeFFin}
                    />
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
           
            </Grid>
          </Grid>
        </Box>

      </ModalForm>
    </>
    )
    

}