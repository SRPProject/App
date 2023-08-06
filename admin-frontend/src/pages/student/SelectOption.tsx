import { DoneRounded } from "@mui/icons-material";
import {
  Button,
  Card,
  Icon,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import { useState, useContext } from "react";
import { CustomContext } from "../../utils/Routes";

const SelectOption = ({
  setActiveStep,
  dRef,
}: {
  setActiveStep: any;
  batch: any;
  degree: any;
  regulation: any;
  dRef: any;
}) => {
  const { batch, degree, regulation } = useContext(CustomContext);

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
        val={selectedDegree}
        setVal={setSelectedDegree}
        dRef={dRef}
        arr={degree}
        id="degreeDegid"
      />

      <Container
        name="Regulation"
        val={selectedRegulation}
        setVal={setSelectedRegulation}
        dRef={dRef}
        arr={regulation}
        id="regulationRegid"
      />

      <Container
        name="Batch"
        val={selectedBatch}
        setVal={setSelectedBatch}
        dRef={dRef}
        arr={batch}
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
          {arr &&
            arr.map((el: any) => {
              const temp = el["id"] == val;

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
                    dRef.current[[id]] = el["id"];
                    setVal(el["id"]);
                  }}
                >
                  {temp && (
                    <Icon>
                      <DoneRounded />
                    </Icon>
                  )}

                  {el["name"]}
                </MenuItem>
              );
            })}
        </MenuList>
      </Card>
    </div>
  );
};

export default SelectOption;
