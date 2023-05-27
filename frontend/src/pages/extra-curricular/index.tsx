import { Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosObj from "../../api";
import { Button, Dialog, Card ,TextField ,Typography} from "@mui/material";
import { AddOutlined } from "@mui/icons-material";

const ExtraCurricular = () => {
  return (
    <div>
      <Routes>
        {["Sports", "Nptel", "Culturals", "Workshops"].map((el) => {
          return <Route path={el} element={<Custom name={el} />}></Route>;
        })}
        <Route path="*" element={<Navigate to="/dashboard" />}></Route>
      </Routes>
    </div>
  );
};

const styles = {
  card: {
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
  },
};

const data = [
    {
        "title" : "Name Of Event" ,
        "name" : "event_name" ,
        "type" : "text"
    },{
        "title" : "Date of accomplishment" ,
        "name" :"date",
        "type" :"date"
    },
    {
        "title" : "Description" ,
        "name" :"description",
        "type" :"text" ,
        "multiline" : true 
    },
    {
        "title" : "Certificates" ,
        "name" :"certificates",
        "type" :"file" ,
    }
]

const Custom = ({ name = "Sports" }: { name: String }) => {
  const [open, setOpen] = useState(false);


  //fetch previously uploaded
  useEffect(() => {
    // (async function () {
    //     const endpoint = "/student/extracurricular"
    //     const resp = await axiosObj.get(endpoint)
    //     setData(resp.data.message)
    // })();
  }, []);

  return (
    <div>
      <Button endIcon={<AddOutlined></AddOutlined>} 
              onClick ={()=>setOpen(prev=>!prev)}
      >
        Add {name} participation
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <form
          onSubmit={async (event) => {
            event.preventDefault();

            setOpen(false);
          }}
        >
          <Card sx={styles.card}>
            <Typography variant="h5">Add Details</Typography>

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

            <Button type="submit" disableElevation variant="contained">
              Save
            </Button>
          </Card>
        </form>
      </Dialog>
    </div>
  );
};

export default ExtraCurricular;
