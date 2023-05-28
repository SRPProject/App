import {
  Typography,
  Button,
  Stepper,
  StepLabel,
  Step,
  Card,
  MenuList,
  MenuItem,
  Icon,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import "./index.scss";
import { DoneRounded } from "@mui/icons-material";

const Student = () => {
  const degree = ["MSC", "BSC", "B.Tech", "M.Tech", "M.sc"];

  const batch = ["2021-2024", "2021-2025"];

  const steps = ["Select Options", "Upload Excel", "Confirm"];

  const [activeStep, setActiveStep] = useState(0);

  console.log(activeStep);

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
          />
        )}
        {activeStep == 1 && <UploadFile setActiveStep={setActiveStep} />}
        {activeStep == 2 && <Confirm setActiveStep={setActiveStep} />}
      </div>
    </div>
  );
};

const SelectOption = ({
  setActiveStep,
  batch,
  degree,
}: {
  setActiveStep: any;
  batch: any;
  degree: any;
}) => {
  const [selectedDegree, setSelectedDegree] = useState(0);
  const [selectedBatch, setSelectedBatch] = useState(0);
  return (
    <div className="container">
      <Card sx={{ padding: "2rem" }}>
        <Typography variant="h5">Select Degree</Typography>
        <MenuList>
          {degree.map((el: any, index: any) => {
            const temp = index == selectedDegree;

            return (
              <MenuItem
                style={{
                  backgroundColor: temp && "aliceblue",
                  display: "flex",
                  flexDirection: "row",
                  gap: "1rem",
                  alignItems: "center",
                }}
                onClick={() => {
                  setSelectedDegree(index);
                }}
              >
                {temp && (
                  <Icon>
                    <DoneRounded />
                  </Icon>
                )}

                {el}
              </MenuItem>
            );
          })}
        </MenuList>
      </Card>

      <Card sx={{ padding: "2rem" }}>
        <Typography variant="h5">Select Batch</Typography>
        <MenuList>
          {batch.map((el: any, index: any) => {
            const temp = index == selectedBatch;

            return (
              <MenuItem
                style={{
                  backgroundColor: temp && "aliceblue",
                  display: "flex",
                  flexDirection: "row",
                  gap: "1rem",
                  alignItems: "center",
                }}
                onClick={() => {
                  setSelectedBatch(index);
                }}
              >
                {temp && (
                  <Icon>
                    <DoneRounded />
                  </Icon>
                )}

                {el}
              </MenuItem>
            );
          })}
        </MenuList>
      </Card>

      <Button
        variant="contained"
        style={{ alignSelf: "flex-start" }}
        onClick={() => setActiveStep(1)}
      >
        Next
      </Button>
    </div>
  );
};

const UploadFile = ({ setActiveStep }: { setActiveStep: any }) => {
  return (
    <div className="container">
      <a>Download Sample Excel file</a>

      <TextField
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
        >
          Next
        </Button>
      </div>
    </div>
  );
};

const Confirm = ({ setActiveStep }: { setActiveStep: any }) => {
  return (
    <div className="container">
      <ul>
        <li>Make sure excel sheet format is valid</li>
        <li>Once students added , it is difficult to modify</li>
      </ul>
      <Typography>Are You sure?</Typography>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Button
          variant="contained"
          style={{ alignSelf: "flex-start" }}
          onClick={() => setActiveStep(1)}
        >
          Previous
        </Button>
        <Button variant="contained" style={{ alignSelf: "flex-start" }}>
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default Student;
