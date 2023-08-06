import {
  Button,
  Paper,
  Typography,
  Stack,
  TextField,
  Container,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosObj from "../../api";
import { toast } from "react-toastify";
import axios from "axios";

////////////////////////////
const signUpDataEndpoint = "/auth/get-data"; // fetches faculty , degree batches

const signupEndpoint = "/auth/student/signup";
/////////////////////////////////
const Signup = () => {
  const [data, setData] = useState({
    faculty: [],
    batch: [],
  });

  const [faculty, setFaculty] = useState("");

  const [batch, setBatch] = useState("");

  const [sem, setSem] = useState(0);

  const [submitting, setSubmitting] = useState(false);

  const handleSignup = async (e: any) => {
    e.preventDefault();

    const values = ["name", "mail", "password", "retype-password", "regnum"];

    const formData = new FormData();

    formData.append("distFacultyFacultyId", faculty);

    formData.append("batchId", batch);

    formData.append("total_sem", sem);

    values.map((el: string) => {
      //  console.log(document.getElementById(el)!.value)
      formData.append(el, document.getElementById(el)!.value);
    });

    if (formData.get("password") != formData.get("retype-password")) {
      toast.error("Password Mismatch");
      return;
    }

    formData.append(
      "student-proof",
      document.getElementById("student-proof")!.files[0]
    );

    formData.delete("retype-password");

    const resp = await axiosObj.post(signupEndpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (resp.status === 200) {
      toast.success("Details Saved Please Wait for approval ");
    } else if (resp.status === 400) {
      toast.error(resp.data.message);
    }
  };

  useEffect(() => {
    (async function () {
      try {
        const resp = await axiosObj.get(signUpDataEndpoint);

        console.log(resp);

        if (resp.status === 200) {
          console.log(resp.data);
          setData(resp.data.data);
        }
      } catch (err: any) {
        toast.error(err);
      }
    })();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "150vh",
        width: "100vw",
      }}
    >
      <Paper
        sx={{
          width: "max-content",
          padding: "2rem 0",
          borderRadius: "10px",
        }}
      >
        <Container>
          <form onSubmit={handleSignup}>
            <Stack spacing={2}>
              <Typography sx={{ alignSelf: "center" }} variant="h5">
                Student Signup
              </Typography>

              <TextField
                label={"Roll Number"}
                type={"number"}
                variant="standard"
                id={"regnum"}
                required={true}
              />

              <TextField
                label={"Name"}
                type={"text"}
                variant="standard"
                id={"name"}
                required={true}
              />
              <TextField
                label={"Email"}
                type={"email"}
                variant="standard"
                id={"mail"}
                required={true}
              />

              <TextField
                label={"Password"}
                type={"password"}
                variant="standard"
                id={"password"}
                required={true}
              />

              <TextField
                label={"ReType Password"}
                type={"password"}
                variant="standard"
                id="retype-password"
                required={true}
              />

              <div style={{ padding: "1rem 0" }}>
                <TextField id="student-proof" type={"file"} required={true} />
                <Typography>College Id Card</Typography>
              </div>

              <div>
                <InputLabel
                  id="label"
                  variant="standard"
                  htmlFor="uncontrolled-native"
                >
                  Faculty Advisor
                </InputLabel>
                <Select
                  value={faculty}
                  size="small"
                  labelId="label"
                  required={true}
                >
                  {data.faculty &&
                    data.faculty.map((el: any) => {
                      return (
                        <MenuItem
                          value={el.facultyId}
                          onClick={() => setFaculty(el.facultyId)}
                        >
                          {el.name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </div>

              <div>
                <InputLabel
                  id="label"
                  variant="standard"
                  htmlFor="uncontrolled-native"
                >
                  Batch
                </InputLabel>
                <Select
                  value={batch}
                  size="small"
                  labelId="label"
                  required={true}
                >
                  {data.batch &&
                    data.batch.map((el: any) => {
                      return (
                        <MenuItem
                          value={el.id}
                          onClick={() => {
                            setBatch(el.id);
                          }}
                        >
                          {el.startyr}-{el.endyr}
                        </MenuItem>
                      );
                    })}
                </Select>
              </div>

              <Button
                style={{ marginTop: "2rem" }}
                disableElevation
                variant="contained"
                color="primary"
                type="submit"
                disabled={submitting}
              >
                {submitting ? "Please Wait .." : "signup"}
              </Button>
            </Stack>
            <Link to="/login">
              <Typography color="blue" variant="caption">
                Login Here
              </Typography>
            </Link>
          </form>
        </Container>
      </Paper>
    </div>
  );
};

export default Signup;
