import React from "react";
import ModalForm from "../componentes/ModalForm";
import { Box, DialogTitle, Divider, Grid, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const VisitasModal = ({
  handleClose,
  obj,
}: {
  handleClose: Function;
  obj: any;
}) => {
  return (
    <>
      <ModalForm title={"Visita Generada QR"} handleClose={handleClose}>
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
            <Grid container item xs={12} sm={12} md={12} lg={12}>
              <Grid item xs={4} sm={4} md={4} lg={4}>
                Fecha
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4}>
                Entrada
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4}>
                Duración
              </Grid>
            </Grid>

            <Grid container item xs={12} sm={12} md={12} lg={12}>
              <Grid item xs={4} sm={4} md={4} lg={4}></Grid>
              <Grid item xs={4} sm={4} md={4} lg={4}>
                Vistante
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4}></Grid>
            </Grid>

            <Grid
              container
              sx={{
                "text-align": "center",
                "border-bottom": "2px solid rgba(175, 140, 85, 0.641)",
              }}
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
            >
              <Grid item xs={4} sm={4} md={4} lg={4}></Grid>
              <Grid item xs={4} sm={4} md={4} lg={4}>
                QR
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4}></Grid>
            </Grid>

            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              sx={{
                "text-align": "center",
              }}
            >
              <Grid item xs={3} sm={3} md={3} lg={3}>
                Elaborado por
              </Grid>
              <Grid item xs={3} sm={3} md={3} lg={3}>
                usuarios
              </Grid>
              <Grid item xs={3} sm={3} md={3} lg={3}>
                unidad adminsitrativa piso 4
              </Grid>
              <Grid item xs={3} sm={3} md={3} lg={3}>
                Fecha y hora elboracion
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ModalForm>
    </>
  );
};

export default VisitasModal;
