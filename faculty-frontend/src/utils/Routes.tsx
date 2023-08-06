import { useState } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar.js";
import { useMediaQuery } from "react-responsive";
import Navbar from "../components/Navbar.js";
import Login from "../pages/login/index.js";
import { SetPassword } from "../pages/password/index.js";
import Table from "../components/tables/Tables.js";
import Loader from "../components/Loader.js";
import { Alert, Typography } from "@mui/material";

// send data along with proof link
// set sem wise data for academicd
// finish set-password and forgot-password for faculty
// now ,time for student , finish all extrac-cuuricular

{
  /* refer App.scss for styling */
}

export const Auth = () => {
  const [batchId, setBatchId] = useState(null);

  const [semCount, setSemCount] = useState(1);

  const [queryType, setQueryType] = useState<String>("LOGIN");

  const isMobile = useMediaQuery({
    query: "(max-width:768px)",
  });

  return (
    // <CustomContext.Provider>
    <div className="main">
      <BrowserRouter>
        {/* don't show sidebar for desktop */}
        {!isMobile && (
          <Sidebar
            setQueryType={setQueryType}
            isMobile={false}
            queryType={queryType}
          />
        )}{" "}
        <div className="body" style={{ marginTop: isMobile ? "20vh" : "0" }}>
          <Navbar
            setBatchId={setBatchId}
            batchId={batchId}
            isMobile={isMobile}
            setSemCount={setSemCount}
            queryType={queryType}
            setQueryType={setQueryType}
          />{" "}
          {/* isMobile is passed so as to make custom styling for mobile */}
          {batchId == -1 ? (
            <Alert sx={{ width: "max-content" }} severity="error">
              No students have been under you :(
            </Alert>
          ) : batchId ? (
            <Table
              batchId={batchId}
              semCount={semCount}
              setSemCount={setSemCount}
              queryType={queryType}
            ></Table>
          ) : (
            <Loader />
          )}
        </div>
      </BrowserRouter>
    </div>
    //</CustomContext.Provider>
  );
};

export const UnAuth = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/set-password" element={<SetPassword />}></Route>
        <Route path="*" element={<Navigate to="/login" />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
