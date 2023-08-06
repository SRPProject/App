import React, { useState, useEffect, createContext } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { useMediaQuery } from "react-responsive";
import Navbar from "../components/Navbar";
import Data from "./data.js";
import Login from "../pages/login/index.js";
import { ForgotPassword, SetPassword } from "../pages/password/index.js";
import axiosObj from "../api";
{
  /* refer App.scss for styling */
}

export const CustomContext = createContext({
  degree: {},
  regulation: {},
  batch: {},
  setBatch: () => {},
  setRegulation: () => {},
  setDegree: () => {},
  url: String,
  setPushRequest: () => {},
});

export const Auth = () => {
  const isMobile = useMediaQuery({
    query: "(max-width:768px)",
  });

  const [degree, setDegree] = useState(null);
  const [regulation, setRegulation] = useState(null);
  const [batch, setBatch] = useState(null);
  const [url, setUrl] = useState("");

  const [pushRequest, setPushRequest] = useState(-1);

  //1 reulation , 2 : batch ,3 : degree
  useEffect(() => {
    (async function () {
      const regulation = "admin/getRegulations",
        batch = "admin/getBatches",
        degree = "admin/getDegrees";
      console.log(pushRequest);
      let resp = {};
      // regulation {regid,regyear} => { id,name }
      if (pushRequest == -1 || pushRequest == 1) {
        resp = await axiosObj.get(regulation);

        console.log(resp);
        if (resp.status == 200) {
          const data = resp.data.message;

          let temp = [];

          data.map((el: any) => {
            let obj = {};
            obj["id"] = el["regid"];
            obj["name"] = el["regyear"];
            temp.push(obj);
          });

          setRegulation(temp);
        } else {
          setRegulation([]);
        }
      }

      // batch {id,startyr,endyr}
      if (pushRequest == -1 || pushRequest == 2) {
        resp = await axiosObj.get(batch);
        if (resp.status == 200) {
          const data = resp.data.message;

          let temp = [];

          data.map((el: any) => {
            let obj = {};
            obj["id"] = el["id"];
            obj["name"] = el["startyr"] + " - " + el["endyr"];
            temp.push(obj);
          });
          console.log(temp);
          setBatch(temp);
        } else {
          setBatch([]);
        }
      }

      if (pushRequest == -1 || pushRequest == 3) {
        resp = await axiosObj.get(degree);

        console.log(resp);
        if (resp.status == 200) {
          const data = resp.data.message;

          let temp = [];

          data.map((el: any) => {
            let obj = {};
            obj["id"] = el["degid"];
            obj["name"] = el["degname"];
            temp.push(obj);
          });

          setDegree(temp);
        } else {
          setDegree([]);
        }
      }
      //degree  {degid,degname}

      if (pushRequest == -1) {
        const endpoint = "/admin/getbulkStudentssheet";
        resp = await axiosObj.get(endpoint);
        setUrl(resp.data.message);
      }
    })();
  }, [pushRequest]);

  return (
    <CustomContext.Provider
      value={{
        degree,
        setDegree,
        batch,
        setBatch,
        regulation,
        setRegulation,
        url,
        setPushRequest,
      }}
    >
      <div className="main">
        <BrowserRouter>
          {/* don't show sidebar for desktop */}
          {!isMobile && <Sidebar isMobile={false} />}{" "}
          <div className="body" style={{ marginTop: isMobile ? "20vh" : "0" }}>
            <Navbar isMobile={isMobile} />{" "}
            {/* isMobile is passed so as to make custom styling for mobile */}
            <Routes>
              {Data.map((el: any) => {
                const El = el.element;
                return <Route path={el.to + "/*"} element={<El />}></Route>;
              })}
              <Route
                path="*"
                element={<Navigate to="/manage-student" />}
              ></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </CustomContext.Provider>
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
