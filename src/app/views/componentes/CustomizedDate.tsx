import Typography from "@mui/material/Typography";
import { MobileDateTimePicker, renderTimeViewClock } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
const CustomizedDate = ({
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
        <MobileDateTimePicker
          orientation="portrait"
          value={value}
          //ampm={false}
          onChange={(v) => onchange(v)}
          sx={{ width: "100%" }}
          slotProps={{ textField: { size: "small" } }}
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
            seconds: renderTimeViewClock,
          }}
        />
      </LocalizationProvider>
    </div>
  );
};

export default CustomizedDate;
