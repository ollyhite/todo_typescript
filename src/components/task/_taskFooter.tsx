import React, { FC, ReactElement } from "react";
import { Box, Button, FormControlLabel, Switch } from "@mui/material";
import { ITaskFooter } from "./interfaces/ITaskFooter";
import PropTypes from "prop-types";

export const TaskFooter: FC<ITaskFooter> = (props): ReactElement => {
  // Destructure props

  const {
    onStatusChange = (e) => console.log(e),
    onClick = (e) => console.log(e),
  } = props;

  //const [check, setCheck];

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mt={4}
    >
      <FormControlLabel
        label="In Progress"
        control={<Switch color="warning" onChange={(e) => onStatusChange(e)} />}
      />
      <Button
        variant="contained"
        color="success"
        size="small"
        sx={{ color: "#ffffff" }}
        onClick={onClick}
      >
        Mark Complete
      </Button>
    </Box>
  );
};

TaskFooter.propTypes = {
  onStatusChange: PropTypes.func,
  onClick: PropTypes.func,
};
