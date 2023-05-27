import React, { useEffect, useState } from "react";
import {
  Button,
  Select,
  Typography,
  Card,
  Skeleton,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  IconButton,
  InputAdornment,
  Collapse,
  Tabs,
  Tab,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import axiosObj from "../../api";
import Loader from "../../components/Loader";
import { FileUpload } from "@mui/icons-material";
import { toast } from "react-toastify";

const endpoint = "/student/studentsem";

const util = (obj: any) => {
  let temp = {
    "Core Subjects": [],
    "Professional Electives": [],
    "Open-Elective": [],
    Humanities: [],
    "Audit-course": [],
  };

  obj.map((el: any) => {
    switch (el.typeofsub) {
      case 1:
        temp["Core Subjects"].push(el);
        break;
      case 2:
        temp["Professional Electives"].push(el);
        break;
      case 3:
        temp["Humanities"].push(el);
        break;
      case 4:
        temp["Open-Elective"].push(el);
        break;
      case 5:
        temp["Audit-course"].push(el);
    }
  });

  return temp;
};

const Semester = ({
  sem,
  data,
  setData,
}: {
  sem: any;
  data: any;
  setData: any;
}) => {
  const [loading, setLoading] = useState(false);

  console.log(data);

  useEffect(() => {
    if (sem in data) {
    } else {
      //request for getting student sem marks
      (async () => {
        setLoading(true);

        const resp = await axiosObj.get(endpoint);

        const obj = resp.data.message;

        const normalized = util(obj); // spilt based on type of subjects

        setData((prev: any) => ({ ...prev, [sem]: normalized }));

        setLoading(false);
      })();
    }
  }, [sem]);

  return (
    <form className="semester">
      <div className="header">
        <div>
          <Typography variant="h5">Semester - {sem}</Typography>

          <Typography variant="caption">April 2022 - May 2022</Typography>
        </div>

        <Typography>
          GPA Obtained - <span style={{ fontWeight: "bolder" }}>9.8</span>
        </Typography>
      </div>

      <VerficationFile sem={sem} />

      <AddSubject />

      {loading ? (
        <Skeleton
          width="1000"
          height="100vh"
          variant="rectangular"
          animation="wave"
        ></Skeleton>
      ) : (
        data[sem] && <Container sem={sem} data={data[sem]} />
      )}
    </form>
  );
};

const updateMarks = async (updated: any) => {
  // transform to array

  let data = [];

  Object.keys(updated.current).map((el: any) => {
    data.push({ ...updated.current[el], subjectSubid: el });
  });

  const endpoint = "/student/updateSemMark";

  const resp = await axiosObj.post(endpoint, {
    marks: JSON.stringify(data),
  });

  if (resp.status == 200) {
    toast.success("Marks updated Successfully");
  }

  console.log(resp);
};

const Container = ({ data, sem }: { data: any; sem: number }) => {
  const [value, setValue] = useState(0);

  const [requestSent, setRequestSent] = useState(false);
  console.log(data);

  /*
        {
            "subject_code" : {
                "attempts" : 0 ,
                "monthy"
            }
        }

    */
  const updated = React.useRef({});

  const tabs = [
    "Core Subjects",
    "Professional Electives",
    "Open-Elective",
    "Humanities",
    "Audit-course",
  ];

  return (
    <div className="main">
      <Tabs
        onChange={(e, val) => setValue(val)}
        value={value}
        sx={{ display: "flex", flexDirection: "column" }}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
      >
        {tabs.map((el: string, index: number) => {
          return <Tab value={index} label={el} />;
        })}
      </Tabs>

      <Button
        style={{ width: "max-content" }}
        onClick={async () => {
          setRequestSent(true);
          await updateMarks(updated);
          setRequestSent(false);
        }}
        variant="contained"
        disabled={requestSent}
      >
        {requestSent ? "Please wait ..." : "Update Marks"}
      </Button>

      <div className="sub-types">
        <Typography style={{ margin: "0 1rem" }} variant="h5">
          {tabs[value]}
        </Typography>
        <SubjectType updated={updated} data={data[tabs[value]]}></SubjectType>
      </div>
    </div>
  );
};

const SubjectType = ({ data, updated }: { data: any; updated: any }) => {
  /*
        update the property of subject ;
        delete property from object if it reaches original value 
    */
  const updatedData = (
    subjectCode: string,
    key: string,
    value: string | number,
    original: any
  ) => {
    // scoredgrade , attempts , monthyrpass

    // create object if it is not found
    if (!(subjectCode in updated.current)) {
      updated.current[[subjectCode]] = Object.assign({}, original);
    }

    updated.current[[subjectCode]][key] = value;

    if (key === "monthyrpass") {
      if (value === "") {
        updated.current[[subjectCode]][key] = null;
      }
    }

    let obj = updated.current[[subjectCode]];

    // if updated values are same as original value remove this key from object "updated"

    if (
      obj.scoredgrade == original.scoredgrade &&
      obj.attempts == original.attempts &&
      obj.monthyrpass == original.monthyrpass
    ) {
      delete updated.current[[subjectCode]];
    }
  };

  if (data.length === 0) {
    return (
      <div>
        <Typography variant="h6" padding={"2rem 1rem"}>
          No Subjects Where Added
        </Typography>
      </div>
    );
  }

  return (
    <div>
      {
        // scoredgrade , attempts , monthyrpass
        data.map((el: any) => {
          const currDate = new Date().toISOString().split("T")[0];

          // for persisting values upon re-rendering
          let originalValues = {
            scoredgrade: el.scoredgrade,
            attempts: el.attempts,
            monthyrpass: !el.monthyrpass ? currDate : el.monthyrpass,
          };

          let updatedValues = {
            scoredgrade: null,
            attempts: null,
            monthyrpass: originalValues.monthyrpass,
          };

          // console.log(originalValues)

          if (el.subcode in updated.current) {
            updatedValues = updated.current[[el.subid]];
          }

          return (
            <div className="subjects">
              <Card sx={{ padding: "1rem" }}>
                <Typography variant="h6">
                  {el.subname}
                  <Typography variant="body1">{el.subcode}</Typography>
                </Typography>
                <Typography variant="caption">
                  Total Credit : {el.credit}
                </Typography>
                <select
                  style={{ display: "block" }}
                  onChange={(e: eny) => {
                    updatedData(
                      el.subid,
                      "scoredgrade",
                      e.target.value,
                      originalValues
                    );
                  }}
                >
                  <option selected disabled>
                    Select Grade Obtained
                  </option>
                  {[10, 9, 8, 7].map((item: any) => {
                    return (
                      <option
                        selected={
                          updatedValues.scoredgrade == item ||
                          item === el.scoredgrade
                        }
                      >
                        {item}
                      </option>
                    );
                  })}
                </select>
                <div>
                  <Typography margin="1rem 0" variant="caption">
                    Number of attempts{" "}
                  </Typography>
                  <br />
                  <input
                    type="number"
                    onChange={(e: eny) => {
                      updatedData(
                        el.subid,
                        "attempts",
                        Number(e.target.value),
                        originalValues
                      );
                    }}
                    defaultValue={
                      updatedValues.attempts
                        ? updatedValues.attempts
                        : el.attempts
                    }
                    style={{ padding: ".25rem" }}
                    min={0}
                    max={3}
                  ></input>
                </div>

                <div style={{ margin: "1rem 0" }}>
                  <Typography margin="1rem 0" variant="caption">
                    Month and Year Of passing
                  </Typography>
                  <br />
                  <input
                    defaultValue={
                      updatedValues.monthyrpass
                        ? updatedValues.monthyrpass
                        : originalValues.monthyrpass
                    }
                    type="date"
                    onChange={(e: eny) => {
                      updatedData(
                        el.subid,
                        "monthyrpass",
                        e.target.value,
                        originalValues
                      );
                    }}
                    style={{ padding: ".25rem" }}
                  ></input>
                </div>
              </Card>
            </div>
          );
        })
      }
    </div>
  );
};

const AddSubject = () => {
  return (
    <div className="sub-types">
      <Typography
        variant="h5"
        sx={{ textDecoration: "underline", padding: "1rem" }}
      >
        Add Subjects
      </Typography>
      <div>
        <Card sx={{ padding: "1rem" }}>
          <Typography variant="caption">
            {" "}
            **Not this is not applicable for core subjects**
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Enter Subject Code"
            size="small"
            sx={{ margin: "1rem 0" }}
          ></TextField>
          <Button size="small" variant="contained">
            Search
          </Button>
        </Card>
      </div>
      <div
        style={{
          padding: "2rem",
          backgroundColor: "aliceblue",
          borderRadius: "10px",
        }}
      >
        <Typography>Results</Typography>
        <div
          style={{
            display: "flex",
            gap: "2rem",
            justifyContent: "left",
            alignItems: "center",
            marginTop: "1rem",
          }}
        >
          <Typography>IT5017(Data-Structures)</Typography>
          <Typography>Professional Electives</Typography>
          <Button variant="contained" size="small">
            Add Subject
          </Button>
        </div>
      </div>
    </div>
  );
};

const saveFile = async (sem: any) => {
  const files = document.getElementById("file").files;

  if (files.length == 0) {
    toast.error("Choose file first");

    return;
  }
  const endpoint = "/student/uploadMarkSheet";

  const formData = new FormData();

  formData.append("semno", sem);
  formData.append("marksheet", files[0]);

  const resp = await axiosObj.post(endpoint, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (resp.status === 200) {
    toast.success("File has been uploaded successfully");
  } else if (resp.status === 400) {
    toast.error(resp.data.message);
  }
};

export const VerficationFile = ({ sem }: { sem: number }) => {
  const [submitting, setSubmitting] = useState(false);

  return (
    <div className="file-upload">
      <Typography>Verification File</Typography>
      <TextField
        inputProps={{ accept: "application/pdf" }}
        size="small"
        fullWidth
        type="file"
        sx={{ margin: "1rem 0" }}
        id="file"
      ></TextField>

      <Button
        endIcon={<FileUpload />}
        variant="contained"
        disableElevation
        type="button"
        disabled={submitting}
        onClick={async () => {
          setSubmitting(true);
          await saveFile(sem);
          setSubmitting(false);
        }}
      >
        Save File
      </Button>
      <br />
      <Typography variant="caption" style={{ margin: "2rem 0" }}>
        Note : Update Marks first if you have not
      </Typography>
    </div>
  );
};

/*

*/

export default Semester;
