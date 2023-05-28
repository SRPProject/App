import { DoneRounded } from "@mui/icons-material";
import {
  Button,
  Card,
  Icon,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import { useState } from "react";

const SelectOption = ({
  setActiveStep,
  batch,
  degree,
  regulation,
  dRef,
}: {
  setActiveStep: any;
  batch: any;
  degree: any;
  regulation: any;
  dRef: any;
}) => {
  const [selectedDegree, setSelectedDegree] = useState(
    dRef.current.degreeDegid
  );
  const [selectedBatch, setSelectedBatch] = useState(dRef.current.batchId);

  const [selectedRegulation, setSelectedRegulation] = useState(
    dRef.current.regulationRegid
  );

  return (
    <div className="container">
      <Container
        name="Degree"
        arr={degree}
        val={selectedDegree}
        setVal={setSelectedDegree}
        dRef={dRef}
        id="degreeDegid"
      />

      <Container
        name="Regulation"
        arr={batch}
        val={selectedRegulation}
        setVal={setSelectedRegulation}
        dRef={dRef}
        id="regulationRegid"
      />

      <Container
        name="Batch"
        arr={regulation}
        val={selectedBatch}
        setVal={setSelectedBatch}
        dRef={dRef}
        id="batchId"
      />

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

const Container = ({
  name,
  val,
  setVal,
  arr,
  id,
  dRef,
}: {
  dRef: any;
  name: any;
  val: any;
  setVal: any;
  arr: any;
  id: String;
}) => {
  return (
    <div>
      <Card sx={{ padding: "2rem" }}>
        <Typography variant="h5">Select {name}</Typography>
        <MenuList>
          {arr.map((el: any, index: any) => {
            const temp = index == val;

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
                  dRef.current[[id]] = index;
                  setVal(index);
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
    </div>
  );
};

export default SelectOption;
