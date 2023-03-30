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
  innerref : any 
};

const inputStyle = {
  padding:"10px 20px",
  borderRadius:"5px",
  outline : "none",
  boxShadow :"rgba(0, 0, 0, 0.16) 0px 1px 4px",
  border:"none",
}

function CustomInput({ title, type, innerref }:Type) {
  
  const [error, changeError] = React.useState(null);
  
  return (
    <FormControl style={{ margin: "5px 0 20px 0" }}>
      
      <span style={{ marginBottom: "13px" ,textTransform:"capitalize"}}>{title}</span>
      
      <input
        required={true}
        type={type}
        placeholder={`Enter your ${title}`}
        ref = {innerref}
        style={inputStyle}
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
