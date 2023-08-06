import { Typography, Button, Stepper, StepLabel, Step } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import "./index.scss";
import SelectOption from "./SelectOption";
import UploadFile from "./UploadFile";
import axiosObj from "../../api";
import FormData from "form-data";
import { toast } from "react-toastify";

const Student = () => {

  const steps = ["Select Options", "Upload Excel", "Confirm"];

  const [activeStep, setActiveStep] = useState(0);

  const dRef = useRef({
    studentslist: null,
    facultyFacid: 7,
    distDepartmentDeptid: 1,
    regulationRegid: 1,
    degreeDegid: 1,
    batchId: 1,
  });


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
            dRef={dRef}
          />
        )}
        {activeStep == 1 && (
          <UploadFile dRef={dRef}  setActiveStep={setActiveStep} />
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

  if (resp.status === 200) {
    toast.success("Students added successfully");

    setTimeout(() => {
      window.location = "/";
    }, [5000]);
  } else {
    toast.error(resp.data.message);
  }
};

const Confirm = ({
  setActiveStep,
  dRef,
}: {
  setActiveStep: any;
  dRef: any;
}) => {
  const [submitting, setSubmitting] = useState(false);

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <Typography variant="h5">Are You sure of adding students?</Typography>
        <Typography variant="caption">
          Make sure excel sheet format is valid
        </Typography>
        <Typography variant="caption">
          Once students added , it is difficult to modify
        </Typography>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Button
          variant="contained"
          style={{ alignSelf: "flex-start" }}
          onClick={() => setActiveStep(1)}
        >
          Previous
        </Button>
        <Button
          disabled={submitting}
          variant="contained"
          style={{ alignSelf: "flex-start" }}
          onClick={async () => {
            setSubmitting(true);
            await submit(dRef.current);
            setSubmitting(false);
          }}
        >
          {submitting ? "Please wait.." : "Confirm"}
        </Button>
      </div>
    </div>
  );
};

export default Student;
