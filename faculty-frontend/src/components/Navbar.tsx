import React, {
  useState,
  useContext,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { SideToggle } from "./Sidebar";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Typography,
  Breadcrumbs,
  Avatar,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { LogoutRounded } from "@mui/icons-material";
import { CustomContext } from "../utils/Context";
import Token from "../api/token";
import { useQuery } from "@tanstack/react-query";
import axiosObj from "../api";
import ENDPOINTS from "../api/endpoints";

const Navbar = React.memo(
  ({
    isMobile,
    setBatchId,
    batchId,
    setSemCount,
    queryType,
    setQueryType,
  }: {
    setQueryType: Dispatch<SetStateAction<String>>;
    queryType: String;
    isMobile: Boolean;
    setBatchId: any;
    batchId: number | null;
    setSemCount: any;
  }) => {
    const [page, setPage] = useState("");

    const ctx = useContext(CustomContext);

    const location = useLocation();

    const handleLogout = () => {
      let token = Token.getService();

      token.clearToken();
      window.location.assign("/");
    };

    var pathnames = window.location.pathname.substring(1).split("/");

    useEffect(() => {
      let tempUrl = window.location.pathname;

      if (tempUrl === "/") pathnames = [];
      else pathnames = tempUrl.substring(1).split("/");
    }, [location]);

    const style = {
      position: isMobile ? "fixed" : "relative",
      padding: ".5rem 1rem",
      borderRadius: isMobile ? "0" : "10px",
      backgroundColor: "white",
      paddingLeft: "0",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: isMobile ? "1rem" : "2rem",
    };

    const fetchData = async () => {
      const endpoint = ENDPOINTS.GET_BATCHES;

      const resp = await axiosObj(endpoint);

      console.log(resp);

      return resp.data.message;
    };

    //get all bacthes handled by staff
    const { data, isFetched } = useQuery(["Batches"], fetchData, {
      staleTime: Infinity,
    });

    useEffect(() => {
      if (isFetched) {
        if (data.length) {
          setSemCount(data[0]["degree.noofsems"]);
          setBatchId(data[0].id);
        } else setBatchId(-1);
      }
    }, [data]);

    return (
      <Div>
        <AppBar sx={style} elevation={isMobile ? 1 : 0}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {isMobile && (
              <SideToggle setQueryType={setQueryType} queryType={queryType} />
            )}

            <div style={{ margin: 0 }}>
              <Typography
                sx={{
                  color: "#3E8EDE",
                  textTransform: "capitalize",
                  fontWeight: "bolder",
                }}
                variant={isMobile ? "h6" : "h5"}
                gutterBottom
              >
                {pathnames.at(-1)}
              </Typography>

              <Breadcrumbs aria-label="breadcrumb">
                <Link to="/">Home</Link>

                <Typography
                  sx={{ textTransform: "capitalize" }}
                  color="text.primary"
                >
                  {page}
                </Typography>
              </Breadcrumbs>
            </div>
          </div>

          {/* user photo || user name || logout button */}

          {/* Batch selection */}
          <Select size="small" value={String(batchId)} defaultValue={"1"}>
            <MenuItem disabled value="1">
              Select Batch
            </MenuItem>
            {data &&
              data.map((item: any) => {
                return (
                  <MenuItem
                    value={item["id"]}
                    onClick={() => {
                      setBatchId(item["id"]);
                      setSemCount(item["degree.noofsems"]);
                    }}
                  >
                    {item["degree.degname"]}({item["startyr"]}-{item["endyr"]})
                  </MenuItem>
                );
              })}
          </Select>
        </AppBar>
      </Div>
    );
  }
);

const Div = ({ children }: { children: any }) => {
  return <div>{children}</div>;
};

export default Navbar;
