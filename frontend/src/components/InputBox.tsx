import React from "react";
import {
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";

interface Type {
  title : string ,
  type: string,
  data:any ,
  changeData:Function 
};

function CustomInput({ title, type, data, changeData }:Type) {
  const [error, changeError] = React.useState(null);
  
  return (
    <FormControl style={{ margin: "5px 0 20px 0" }}>
      <span style={{ marginBottom: "13px" }}>{title}</span>
      <TextField
        required={true}
        type={type}
        error={error != null ? true : false}
        value={data}
        placeholder={`Enter your ${title}`}
        onChange={(e) => {
          changeData(e.target.value);
        }}
        size="small"
      />

      {error && (
        <FormHelperText sx={{ color: "red" }}>
          {"Invalid Password"}
        </FormHelperText>
      )}
    </FormControl>
  );
}

export default React.memo(CustomInput);
