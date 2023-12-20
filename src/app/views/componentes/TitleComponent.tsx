import { Grid, Typography } from '@mui/material';
import Progress from '../Progress';

const TitleComponent = ({ title, show }: { title: string; show: boolean }) => {
  return (
    <Grid container alignItems="center"
      justifyContent="center">
      <Progress open={show} />
      <Grid item md={12} >
        <Typography variant="h3">{title}</Typography>
      </Grid>
    </Grid>
  );
};

export default TitleComponent;
