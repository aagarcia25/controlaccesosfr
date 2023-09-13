import { Box, Grid, Hidden } from "@mui/material";
import { Blanco } from "../styles/imagen";

export default function Bienvenido({ user }: { user: any }) {
  return (
    <Hidden smDown>
      <Grid height="85%" width="100%">
        <Grid item alignContent="center">
          <Box
            key={Math.random()}
            display="flex"
            justifyContent="center"
            sx={{ height: "85vh", width: "100%" }}
          >
            <div className="containerCarrucelBienvenido"></div>
          </Box>
        </Grid>
      </Grid>
    </Hidden>
  );
}
