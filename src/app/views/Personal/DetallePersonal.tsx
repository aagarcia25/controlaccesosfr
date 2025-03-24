import { Avatar, Box, Button, Divider, Grid, Tooltip, Typography } from "@mui/material"

export const DetallePersonal = ({

}:{

})=>{
    return(
        <Box padding={4}>
        {/* Título */}
        <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ color: "#A57F52", mb: 4 }}
        >
            Detalle de Estudiante
        </Typography>

        {/* Encabezado con foto, nombre y botón de QR */}
        <Grid
            container
            alignItems="top"
            spacing={2}
            justifyContent="space-between"
            sx={{ mb: 4 }}
        >
            <Grid item xs={12} sm={1} md={1}>
                <Avatar
                    src={"URLruta"}
                    alt="Foto de Estudiante"
                    sx={{
                        width: 120,
                        height: 120,
                        mx: 0, 
                        borderRadius: 0, 
                        overflow: "hidden", 
                        "& img": {
                          objectFit: "cover", 
                          objectPosition: "top", 
                        },
                    }}
                />
            

            </Grid>
            {/* Información del Estudiante */}
            <Grid
                item
                xs={12}
                sm={6}
                md={7}
                sx={{ textAlign: { xs: "center", sm: "left" } }}
                marginLeft={2}
            >
                {" "}
                {/* Reduce el marginLeft para acercar el texto a la imagen */}
                <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", color: "#A57F52" }}
                >
                    {/* {dataGlobal.row.Nombre} */}
                </Typography>
                <Typography sx={{ color: "#333", fontSize: "1.4rem" }}>
                    {/* Horas Acumuladas: {dataGlobal.row.HorasTotales} */}
                </Typography>
                <Typography sx={{ color: "#333", fontSize: "1.4rem" }}>
                    {/* Periodo: {formatFecha(dataGlobal.row.FechaInicio)} -{" "}
                    {formatFecha(dataGlobal.row.FechaFin)} */}
                </Typography>
            </Grid>
            <Grid
                item
                display="flow"
                xs={12}
                sm={3}
                md={3}
                textAlign={{ xs: "center", sm: "right" }}
            >
                <Grid>
                    {/* <Tooltip
                        title={
                            dataGlobal.row.EstadoQR === "1"
                                ? "Descarga QR en PDF"
                                : "No se ha generado QR"
                        }
                    > */}
                        <span>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "black",
                                    width: { xs: "100%", sm: "auto" },
                                    marginBottom: 2, // Espaciado vertical entre botones
                                    color: "white", // Esto debería funcionar sin problemas
                                    "&:hover": {
                                        backgroundColor: "grey.300",
                                        color: "black",
                                    },
                                    px: 3,
                                }}
                               // startIcon={<DownloadIcon />}
                                //onClick={descargaQR} // Asegúrate de pasar la función correctamente
                                // disabled={
                                //     dataGlobal.row.EstadoQR === "1" ? false : true
                                // }
                            >
                                DESCARGAR QR
                            </Button>
                        </span>
                    {/* </Tooltip> */}
                </Grid>
                <Grid>
                    {/* <Tooltip
                        title={
                            dataGlobal.row.EstadoQR === "1"
                                ? "Reenviar QR por Correo"
                                : "No se Reenviar QR por Correo"
                        }
                    > */}
                        <span>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "black",
                                    width: { xs: "100%", sm: "auto" },
                                    color: "white", // Esto debería funcionar sin problemas
                                    "&:hover": {
                                        backgroundColor: "grey.300",
                                        color: "black",
                                    },
                                    px: 3,
                                }}
                                // startIcon={<ForwardToInboxIcon />}
                                // onClick={reenviarCorreoQR} // Asegúrate de pasar la función correctamente
                                // disabled={
                                //     dataGlobal.row.EstadoQR === "1" ? false : true
                                // }
                            >
                                REENVIAR QR
                            </Button>
                        </span>
                    {/* </Tooltip> */}
                </Grid>
            </Grid>
        </Grid>

        {/* Sección de Información Básica */}
        <Section title="Información Básica">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography sx={{ fontSize: "1.3rem" }}>
                        <strong>Tipo de Estudiante:</strong>{" "}
                        {/* {dataGlobal.row.TipoEstudiante} */}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography sx={{ fontSize: "1.3rem" }}>
                        <strong>Número de Gafete:</strong>{" "}
                        {/* {dataGlobal.row.NoGaffete} */}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography sx={{ fontSize: "1.3rem" }}>
                        {/* <strong>Teléfono:</strong> {dataGlobal.row.Telefono} */}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography sx={{ fontSize: "1.3rem" }}>
                        {/* <strong>Género:</strong> {dataGlobal.row.Sexo} */}
                    </Typography>
                </Grid>
            </Grid>
        </Section>

        {/* Sección de Información Académica */}
        <Section title="Información Académica">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography sx={{ fontSize: "1.3rem" }}>
                        {/* <strong>Escolaridad:</strong> {dataGlobal.row.Escolaridad} */}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Typography sx={{ fontSize: "1.3rem" }}>
                        <strong>Instituto Educativo:</strong>{" "}
                        {/* {dataGlobal.row.InstitucionEducativa} */}
                    </Typography>
                </Grid>
            </Grid>
        </Section>

        {/* Sección de Información Administrativa */}
        <Section title="Información Administrativa">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} display={"flex"}>
                    <Typography
                        sx={{ fontWeight: "bold", fontSize: "1.3rem" }}
                        paddingRight={1}
                    >
                        Unidad Administrativa:
                    </Typography>
                    <Typography sx={{ fontSize: "1.3rem" }}>
                        {" "}
                        {/* {dataGlobal.row.UnidadAdministrativa} */}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Typography sx={{ fontSize: "1.3rem" }}>
                        <strong>Persona Responsable:</strong>{" "}
                        {/* {dataGlobal.row.PersonaResponsable} */}
                    </Typography>
                </Grid>
            </Grid>
        </Section>

        {/* Sección de Horario y Asistencia */}
        <Section title="Horario y Asistencia">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} display={"flex"}>
                    <Typography
                        sx={{ fontWeight: "bold", fontSize: "1.3rem" }}
                        paddingRight={1}
                    >
                        Frecuencia de Asistencia:
                    </Typography>
                    <Typography sx={{ fontSize: "1.3rem" }}>
                        {/* {dataGlobal.row.Frecuencia} */}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} display={"flex"}>
                    <Typography
                        sx={{ fontWeight: "bold", fontSize: "1.3rem" }}
                        paddingRight={1}
                    >
                        Horario:
                    </Typography>
                    <Typography sx={{ fontSize: "1.3rem" }}>
                        {/* {dataGlobal.row.HorarioDesde} -{" "}
                        {dataGlobal.row.HorarioHasta} */}
                    </Typography>
                </Grid>
            </Grid>
        </Section>

        {/* Botón de Cerrar */}
        <Grid
            item
            xs={12}
            sm={12}
            sx={{ display: "flex", justifyContent: "flex-end" }}
        >
            <Button
                variant="contained"
                sx={{
                    backgroundColor: "#A57F52",
                    color: "white",
                    fontSize: "1.2rem", // Aumenta el tamaño del texto del botón
                    padding: "10px 10px", // Aumenta el tamaño del botón
                    width: { xs: "100%", sm: "auto" }, // 100% del ancho en móviles
                    maxWidth: "500px", // Define un ancho máximo para pantallas más grandes
                    "&:hover": { backgroundColor: "grey.300", color: "black" },
                }}
                // onClick={() => handleClose()}
            >
                CERRAR
            </Button>
        </Grid>
    </Box>
    )
    
}
const Section = ({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) => (
	<Box sx={{ mb: 3 }}>
		<Grid
			container
			alignItems="center"
			spacing={1}
			sx={{ mb: 1, marginTop: 2 }}
		>
			<Grid item xs={12} sm="auto" >
				<Typography variant="body1" sx={{ fontWeight: "bold", color: "#A57F52", fontSize: "1.5rem"  }}>
					• {title}
				</Typography>
			</Grid>
			<Grid item xs>
				<Divider sx={{ borderColor: "#B0B0B0" }} />
			</Grid>
			<Grid item xs={12} sm={12}>
				{children}
			</Grid>
		</Grid>
	</Box>
);