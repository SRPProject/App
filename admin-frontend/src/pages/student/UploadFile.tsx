import { Button, TextField } from "@mui/material";
import { useState, useEffect, memo, useContext } from "react";
import axiosObj from "../../api";
import fs from "fs";
import { CustomContext } from "../../utils/Routes";

const UploadFile = ({
  setActiveStep,

  dRef,
}: {
  dRef: any;
  setActiveStep: any;
  url: any;
}) => {
  const [uploaded, setUploaded] = useState(false);
  const { url } = useContext(CustomContext);

  return (
    <div className="container">
      <a href={url}>Download Sample Excel file</a>

      <TextField
        onChange={(e: any) => {
          dRef.current["studentslist"] = e.target.files[0];
          console.log(dRef);
          setUploaded(true);
        }}
        inputProps={{
          accept:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }}
        type="file"
      ></TextField>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Button
          variant="contained"
          style={{ alignSelf: "flex-start" }}
          onClick={() => setActiveStep(0)}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          style={{ alignSelf: "flex-start" }}
          onClick={() => setActiveStep(2)}
          disabled={!uploaded}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default UploadFile;
