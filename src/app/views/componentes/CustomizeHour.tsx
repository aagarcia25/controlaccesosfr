import Typography from "@mui/material/Typography";
import { MobileTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const CustomizeHour = ({
  value,
  label,
  onchange,
}: {
  value: any;
  label: string;
  onchange: Function;
}) => {
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Typography sx={{ fontFamily: "sans-serif" }}>{label}:</Typography>
        <MobileTimePicker
          openTo="hours"
          value={value}
          onChange={(v) => onchange(v)}
        />
      </LocalizationProvider>
    </div>
  );
};

export default CustomizeHour;
