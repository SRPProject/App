import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  IconButton,
  Drawer,
  ListItemIcon,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Collapse,
} from "@mui/material";
import {
  MenuOutlined,
  ExpandLess,
  ExpandMore,
  StarBorder,
  Sports,
} from "@mui/icons-material";
import data from "../utils/data";

export const Sidebar = ({ isMobile }: { isMobile: Boolean }) => {
  const [open, setOpen] = useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  const styles = {
    margin: "1rem",
    borderRadius: "15px",
    minWidth: "max-content",
    width: isMobile ? "60vw" : "18vw",
  };

  const handleNavigation = (to: String) => {
    navigate(to);
  };

  return (
    <Paper sx={styles} elevation={isMobile ? 0 : 2}>
      <div className="logo">MY DIST</div>

      {data.map((el: any) => {
        if (el.title === "Extra Curricular") return <></>;

        return (
          <ListItem sx={{ margin: 0 }}>
            <ListItemButton
              sx={{
                padding: ".5rem 1rem",
                backgroundColor:
                  location.pathname === el.to ? "#3E8EDE" : "white",
                color: location.pathname === el.to && "white",
                borderRadius: "10px",
                "&:hover": { color: "black" },
              }}
              onClick={() => {
                handleNavigation(el.to);
              }}
            >
              <ListItemIcon>
                <el.icon sx={{ fontSize: "x-larger", color: "#ADD8E6 " }} />
              </ListItemIcon>
              <ListItemText>{el.title}</ListItemText>
              {el.title === "Extra Curricular" &&
                (open ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
          </ListItem>
        );
      })}

      <ListItem sx={{ margin: 0 }}>
        <ListItemButton
          sx={{
            padding: ".5rem 1rem",
            borderRadius: "10px",
            "&:hover": { color: "black" },
          }}
          onClick={() => {
            handleNavigation("/extra-curricular/Sports");
            setOpen((prev) => !prev);
          }}
        >
          <ListItemIcon>
            <Sports sx={{ fontSize: "x-larger", color: "#ADD8E6 " }} />
          </ListItemIcon>
          <ListItemText>Extra Curricular</ListItemText>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <div style={{ padding: "0 1rem", marginBottom: "2rem" }}>
          {["Sports", "Nptel", "Culturals", "Workshops"].map((el: any) => {
            return (
              <Link
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
                to={`/extra-curricular/${el}`}
              >
                <ListItemButton sx={{ padding: "0rem 1rem", margin: "0 2rem" ,borderRadius: "10px", 
                                      backgroundColor: location.pathname === `/extra-curricular/${el}` ? "#3E8EDE" : "white",
                                      color: location.pathname === `/extra-curricular/${el}` && "white","&:hover": { color: "black" } }}>
                  <ListItemText>{el}</ListItemText>
                </ListItemButton>
              </Link>
            );
          })}
        </div>
      </Collapse>
    </Paper>
  );
};

// for mobile
export const SideToggle = () => {
  const [open, setOpen] = useState<Boolean>(false);

  return (
    <div>
      <IconButton sx={{ margin: 0 }} onClick={() => setOpen((prev) => !prev)}>
        <MenuOutlined />
      </IconButton>

      <Drawer open={open} onClose={() => setOpen(false)}>
        <Sidebar isMobile={true} />
      </Drawer>
    </div>
  );
};
