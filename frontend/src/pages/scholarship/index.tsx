import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  Collapse,
  Dialog,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import { toast } from "react-toastify";
import axiosObj from "../../api";

const data = [
  {
    title: "Scholarship name",
    name: "name",
    type: "text",
  },
  {
    title: "Received Year",
    name: "ryear",
    type: "date",
  },
  {
    title: "Amount Received",
    name: "amount",
    type: "number",
  },
  {
    title: "Scholarship Proof",
    name: "scholarshipproof",
    type: "file",
  },
];

const styles = {
  card: {
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
  },
};

const endpoint = "/student/addscholarhip";

const Scholarships = () => {
  const [open, setOpen] = useState(false);

  const submit = async () => {
    let submitData = new FormData();

    data.map((el: any) => {
      let id = el.name;

      if (el.type === "file") {
        submitData.append(id, document.getElementById(id)!.files[0]);
        console.log(el);
      } else {
        submitData.append(id, document.getElementById(id)!.value);
      }
    });

    console.log([...submitData]);

    const resp = await axiosObj.post(endpoint, submitData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(resp);
  };

  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        endIcon={<AddOutlined></AddOutlined>}
      >
        Add a Scholarship
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <form
          onSubmit={async (event) => {
            event.preventDefault();

            await submit();

            setOpen(false);
          }}
        >
          <Card sx={styles.card}>
            <Typography variant="h5">Add Scholarship Details</Typography>

            {data.map((el: any) => {
              return (
                <TextField
                  multiline={el.multiline ? true : false}
                  required
                  style={{ margin: "1rem 0" }}
                  type={el.type}
                  placeholder={el.title}
                  id={el.name}
                  variant="standard"
                  helperText={el.title}
                ></TextField>
              );
            })}

            <Button
              type="submit"
              disableElevation
              variant="contained"
              onClick={submit}
            >
              Save
            </Button>
          </Card>
        </form>
      </Dialog>
    </div>
  );
};

export default Scholarships;
