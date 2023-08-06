import React, { Dispatch, SetStateAction, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  IconButton,
  Drawer,
  ListItemIcon,
  Button,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Avatar,
  Typography,
} from "@mui/material";
import { LogoutRounded, MenuOutlined } from "@mui/icons-material";
import data from "../utils/data";
import token from "../api/token";

export const Sidebar = ({
  isMobile,
  setQueryType,
  queryType,
}: {
  isMobile: Boolean;
  setQueryType: Dispatch<SetStateAction<String>>;
  queryType: String;
}) => {
  const location = useLocation();

  const styles = {
    margin: "1rem",
    borderRadius: "15px",
    minWidth: "max-content",
    width: isMobile ? "60vw" : "18vw",
  };
  
  return (
    <Paper sx={styles} elevation={isMobile ? 0 : 2}>
      <div className="logo">MY DIST</div>

      {data.map((el: any) => {
        return (
          <ListItem sx={{ margin: 0 }}>
            <ListItemButton
              sx={{
                padding: ".5rem 1rem",
                backgroundColor:
                  queryType === el.queryType ? "#3E8EDE" : "white",
                color: queryType === el.queryType ? "white" : "",
                borderRadius: "10px",
                "&:hover": { color: "black" },
              }}
              onClick={() => {
                setQueryType(el.queryType);
                
              }}
            >
              <ListItemIcon>
                <el.icon sx={{ fontSize: "x-larger", color: "#ADD8E6 " }} />
              </ListItemIcon>
              <ListItemText>{el.title}</ListItemText>
            </ListItemButton>
          </ListItem>
        );
      })}

      <ListItem
        sx={{
          display: "flex",

          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          size="small"
          disableElevation
          fullWidth
          variant="outlined"
          startIcon={<LogoutRounded />}
          onClick={() => {
            token.getService().clearToken();
            window.location.assign("/");
          }}
        >
          Logout
        </Button>
      </ListItem>
    </Paper>
  );
};

// for mobile
export const SideToggle = ({
  setQueryType,
  queryType,
}: {
  setQueryType: Dispatch<SetStateAction<String>>;
  queryType: String;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div>
      <IconButton sx={{ margin: 0 }} onClick={() => setOpen((prev) => !prev)}>
        <MenuOutlined />
      </IconButton>

      <Drawer open={open} onClose={() => setOpen(false)}>
        <Sidebar
          setQueryType={setQueryType}
          queryType={queryType}
          isMobile={true}
        />
      </Drawer>
    </div>
  );
};
