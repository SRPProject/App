import { Typography, Card, TextField, Button, Skeleton } from "@mui/material";
import React, { useContext, useState } from "react";
import { CustomContext } from "../../utils/Routes";
import axiosObj from "../../api";
import { toast } from "react-toastify";
// startyr , endyr

const endpoint = "admin/addBatches";

const Batch = () => {
  const { batch, setPushRequest } = useContext(CustomContext);
  const [submitting, setSubmitting] = useState(false);
  const submit = async (event: any) => {
    event.preventDefault();
    let data = {
      startyr: document.getElementById("startyr").value,
      endyr: document.getElementById("endyr").value,
    };

    const resp = await axiosObj.post(endpoint, data);

    if (resp.status === 200) {
      toast.success("Batch Added Successfully");
      setPushRequest(-3);
      setTimeout(() => {
        setPushRequest(2);
      }, 1000);
    } else {
      toast.error(resp.data.message);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <Card sx={{ padding: "1rem" }}>
        <Typography>List of all Batches</Typography>
        {batch !== null ? (
          batch.map((el: any) => {
            return (
              <div
                style={{
                  margin: "1rem 0",
                  backgroundColor: "aliceblue",
                  padding: "1rem",
                  borderRadius: "5px",
                }}
              >
                {el.name}
              </div>
            );
          })
        ) : (
          <Skeleton />
        )}
      </Card>
      <Card
        sx={{
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <Typography variant="h5">Add Batch </Typography>
        <form
          style={{ display: "flex", alignItems: "center", gap: "1rem" }}
          onSubmit={async (event: any) => {
            setSubmitting(true);
            await submit(event);
            setSubmitting(false);
          }}
        >
          <TextField
            type="number"
            required
            name="startyr"
            id="startyr"
            size="small"
            placeholder="Select Start Year"
          ></TextField>

          <TextField
            type="number"
            name="endyr"
            id="endyr"
            required
            placeholder="Select End Year"
            size="small"
          ></TextField>
          <Button type="submit" disabled={submitting} variant="contained">
            {submitting ? "Please Wait" : "Add Batch"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Batch;
