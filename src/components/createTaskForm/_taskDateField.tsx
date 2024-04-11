import React, { FC, ReactElement } from "react";
import PropTypes from "prop-types";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { TextField } from "@mui/material";
import { IDateField } from "./interfaces/IDateField";

export const TaskDateField: FC<IDateField> = (props): ReactElement => {
  const {
    value = new Date(),
    disabled = false,
    onChange = (date) => {
      console.log("TaskDate", date);
    },
  } = props;
  //   const [date, setDate] = useState<Date | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        label="Task Date"
        // inputFormat="dd/MM/yyyy"
        format="MM/dd/yyyy"
        value={value}
        disabled={disabled}
        // onChange={(newValue) => setDate(newValue)}
        onChange={onChange}
        // renderInput={(params: any) => <TextField {...params} />}
        slotProps={{ textField: { variant: "outlined" } }}
      />
    </LocalizationProvider>
  );
};

TaskDateField.propTypes = {
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  value: PropTypes.instanceOf(Date),
};
