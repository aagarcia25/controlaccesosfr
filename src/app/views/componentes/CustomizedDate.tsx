import Typography from "@mui/material/Typography";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
const CustomizedDate = ({
  value,
  label,
  onchange,
}: {
  value: any;
  label: string;
  onchange: Function;
}) => {
  const twoPM = dayjs().set("hour", 18);
  const sabado = dayjs().day(6);
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Typography sx={{ fontFamily: "sans-serif" }}>{label}:</Typography>
        <DateTimePicker
          orientation="portrait"
          value={value}
          onChange={(v) => onchange(v)}
        />
      </LocalizationProvider>
    </div>
  );
};

export default CustomizedDate;
