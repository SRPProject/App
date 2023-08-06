import {
  TextField,
  Button,
  Checkbox,
  Stack,
  Paper,
  Typography,
  Collapse,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import axiosObj from "../../api";
import { toast } from "react-toastify";
import { ForgotPassword } from "../password";
import Token from "../../api/token";
import ENDPOINTS from "../../api/endpoints";
import token from "../../api/token";

const Login = () => {
  const [mail, setMail] = useState("");

  const [password, setPassword] = useState("");

  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = async () => {
    const endpoint = ENDPOINTS.LOGIN;

    const resp = await axiosObj.post(endpoint, { mail, password });

    if (resp.status === 400) {
      toast.error(resp.data.message);
    } else if (resp.status == 200) {
      token.getService().setToken(resp.data.accessToken);
      window.location.assign("/");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
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
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setSubmitting(true);
              await handleSubmit();
              setSubmitting(false);
            }}
          >
            <Stack spacing={2}>
              <Typography sx={{ alignSelf: "center" }} variant="h5">
                Faculty Login
              </Typography>

              <TextField
                id="mail"
                label={"Email"}
                type={"email"}
                variant="standard"
                name={"mail"}
                required={true}
                value={mail}
                onChange={() => {
                  setMail(String(document.getElementById("mail")!.value));
                }}
              />

              <TextField
                id="password"
                label={"Password"}
                type={"password"}
                variant="standard"
                name={"password"}
                required={true}
                value={password}
                onChange={() => {
                  setPassword(
                    String(document.getElementById("password")!.value)
                  );
                }}
              />

              <Button
                style={{ marginTop: "2rem" }}
                disableElevation
                variant="contained"
                color="primary"
                type="submit"
                disabled={submitting}
              >
                {submitting ? "Submitting" : "Login"}
              </Button>

              <div>
                <div>
                  <Checkbox required></Checkbox>
                  <Typography variant="caption">
                    {" "}
                    Accept terms and conditions{" "}
                  </Typography>
                </div>
              </div>
            </Stack>
          </form>

          <ForgotPassword />
        </Container>
      </Paper>
    </div>
  );
};

export default Login;
