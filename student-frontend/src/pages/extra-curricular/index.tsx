import { Routes, Route, Navigate } from "react-router-dom";
import React, { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosObj from "../../api";
import {
  Button,
  Dialog,
  Card,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import { AddOutlined, Label } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";

const styles = {
  card: {
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
  },
};

const data = [
  {
    title: "Name Of Event",
    name: "event_name",
    type: "text",
  },
  {
    title: "Date of accomplishment",
    name: "date",
    type: "date",
  },
  {
    title: "Description",
    name: "description",
    type: "text",
    multiline: true,
  },
  {
    title: "Certificates",
    name: "certificates",
    type: "file",
  },
];

const fetchData = async (endpoint: string) => {
  const resp = await axiosObj.get(endpoint);
  console.log(resp.data);
  return resp.data.message;
};

const ExtraCurricular = ({
  queryType,
  getter,
  title,
  schema,
  setter = "hi",
}: {
  queryType: String;
  getter: string;
  title: String;
  setter: string;
  schema: any;
}) => {
  const { data, isFetching } = useQuery(
    [queryType],
    () => {
      return fetchData(getter);
    },
    {
      staleTime: Infinity,
    }
  );

  const ref = useRef({});

  const [open, setOpen] = useState(false);

  useEffect(() => {
    schema.map((item: any) => {
      ref.current[item.label] = null;
    });
    ref.current["proof"] = null;
    console.log(ref.current);
  }, []);

  return (
    <div>
      <Button
        endIcon={<AddOutlined></AddOutlined>}
        onClick={() => setOpen((prev) => !prev)}
        variant="outlined"
      >
        {title}
      </Button>

      {data && JSON.stringify(data)}

      <Dialog open={open} onClose={() => setOpen(false)}>
        <form
          onSubmit={async (event) => {
            event.preventDefault();

            setOpen(false);
          }}
        >
          <Card sx={styles.card}>
            <Typography variant="h5">Add Details</Typography>
            {schema &&
              schema.map((item: any) => {
                if (item.type == "select")
                  return (
                    <div
                      style={{
                        margin: ".5rem 0",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography variant="caption">{item.label}</Typography>
                      <Select
                        size="small"
                        onChange={(e: BaseSyntheticEvent) => {
                          ref.current[item.label] = e.target.value;
                        }}
                      >
                        {item.options.map((temp: any) => {
                          return (
                            <MenuItem value={temp.value}>{temp.label}</MenuItem>
                          );
                        })}
                      </Select>
                    </div>
                  );
                return (
                  <div
                    style={{
                      margin: ".5rem 0",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography variant="caption">{item.label}</Typography>
                    <TextField
                      onChange={(e: BaseSyntheticEvent) => {
                        ref.current[item.label] = e.target.value;
                      }}
                      type={item.type}
                      size="small"
                      placeholder={item.label}
                    ></TextField>
                  </div>
                );
              })}

            <div
              style={{
                margin: ".5rem 0",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="caption">Proof</Typography>
              <TextField
                type="file"
                size="small"
                onChange={(event: BaseSyntheticEvent) => {
                  ref.current["proof"] = event.target.files[0];
                }}
              ></TextField>
            </div>

            <Button
              sx={{ margin: "1rem 0" }}
              type="submit"
              disableElevation
              variant="contained"
              onClick={async () => {
                const data = new FormData();
                Object.keys(ref.current).map((item: String) => {
                  data.append(item, ref.current[item]);
                });
                console.log(data);
                const resp = await axiosObj.post(
                  "/student/addinterndetails",
                  data
                );
                console.log(resp);
              }}
            >
              Save
            </Button>
          </Card>
        </form>
      </Dialog>
    </div>
  );
};

export default ExtraCurricular;
