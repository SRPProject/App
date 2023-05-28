import { Typography, Button, Stepper, StepLabel, Step } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import "./index.scss";
import SelectOption from "./SelectOption";
import UploadFile from "./UploadFile";
import axiosObj from "../../api";
import FormData from "form-data";

const Student = () => {
  const degree = ["MSC", "BSC", "B.Tech", "M.Tech", "M.sc"];

  const batch = ["2021-2024", "2021-2025"];

  const regulation = ["R2021", "R2019"];

  const steps = ["Select Options", "Upload Excel", "Confirm"];

  const [activeStep, setActiveStep] = useState(0);

  const [url, setUrl] = useState("");

  const dRef = useRef({
    studentslist: null,
    facultyFacid: 7,
    distDepartmentDeptid: 1,
    regulationRegid: 1,
    degreeDegid: 1,
    batchId: 1,
  });

  useEffect(() => {
    (async function () {
      const endpoint = "/admin/getbulkStudentssheet";
      const resp = await axiosObj.get(endpoint);
      setUrl(resp.data.message);
      console.log(resp.data);
    })();
  }, []);

  return (
    <div className="student">
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <div>
        {activeStep == 0 && (
          <SelectOption
            setActiveStep={setActiveStep}
            degree={degree}
            batch={batch}
            regulation={regulation}
            dRef={dRef}
          />
        )}
        {activeStep == 1 && (
          <UploadFile dRef={dRef} url={url} setActiveStep={setActiveStep} />
        )}
        {activeStep == 2 && (
          <Confirm dRef={dRef} setActiveStep={setActiveStep} />
        )}
      </div>
    </div>
  );
};

const submit = async (arr: any) => {
  const endpoint = "admin/addBulkStudents";

  let data = new FormData();

  Object.keys(arr).map((el: any) => {
    console.log(el);
    data.append(el, arr[[el]]);
  });

  const resp = await axiosObj.post(endpoint, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  console.log(resp);
};

const Confirm = ({
  setActiveStep,
  dRef,
}: {
  setActiveStep: any;
  dRef: any;
}) => {
  return (
    <div className="container">
      <ul>
        <li>Make sure excel sheet format is valid</li>
        <li>Once students added , it is difficult to modify</li>
      </ul>
      <Typography>Are You sure of adding students?</Typography>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Button
          variant="contained"
          style={{ alignSelf: "flex-start" }}
          onClick={() => setActiveStep(1)}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          style={{ alignSelf: "flex-start" }}
          onClick={() => {
            submit(dRef.current);
          }}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default Student;
