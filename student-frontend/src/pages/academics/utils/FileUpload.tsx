import { useQuery } from "@tanstack/react-query";
import axiosObj from "../../../api";
import { Button, Card, Chip, TextField, Typography } from "@mui/material";
import { useRef } from "react";
import { toast } from "react-toastify";

//get verrifcation status !!
const getMarkSheetEndpoint = "/student/marksheets";
const updateMarksheetEndpoint = "/student/uploadMarkSheet";

const fetchData = async ({ sem }: { sem: Number }) => {
  const resp = await axiosObj.post(getMarkSheetEndpoint, { semester_no: sem });

  return resp.data.message;
};

const FileUpload = ({ sem }: { sem: Number }) => {
  const { data, isFetching, refetch } = useQuery(
    ["FILE_UPLOAD", sem],
    () => {
      return fetchData({ sem });
    },
    { staleTime: Infinity }
  );

  return (
    <div>
      <Card sx={{ padding: "1rem", margin: "2rem 0" }} elevation={3}>
        <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
          Marksheet
        </Typography>
        <UpdateUpload data={data} refetch={refetch} sem={sem}></UpdateUpload>
      </Card>
    </div>
  );
};

/*
"student_verification.status": false,
"student_verification.isRejected": false,
"student_verification.proofLink": "student-proof/1690709414170_1semester_1 
*/

const UpdateUpload = ({
  data,
  sem,
  refetch,
}: {
  data: any;
  sem: Number;
  refetch: any;
}) => {
  const ref = useRef({ file: "" });

  const handler = async () => {
    const form = new FormData();

    if (ref.current.file === "") {
      toast.error("Empty File");
      return;
    }

    form.append("proof", ref.current.file);
    form.append("semester_no", String(sem));

    const resp = await axiosObj.post(updateMarksheetEndpoint, form);

    if (resp.status === 200) {
      toast.success("File uploaded");
      refetch();
    } else {
      toast.error(resp.data.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "2rem",
      }}
    >
      <TextField
        type="file"
        onChange={(e: any) => {
          ref.current.file = e.target.files[0];
        }}
      ></TextField>

      {data &&
        (data["student_verification.status"] ? (
          <Chip
            label={
              data["student_verification.isRejected"]
                ? "Rejected , Upload new"
                : "Accepted"
            }
            color={
              data["student_verification.isRejected"] ? "error" : "success"
            }
          ></Chip>
        ) : (
          <Chip label="Verification Pending" color="primary"></Chip>
        ))}

      {data && <a href={data["student_verification.proofLink"]}>File Link</a>}

      <Button variant="outlined" onClick={handler}>
        {data ? "Update " : "Upload "}Marksheet
      </Button>
    </div>
  );
};

export default FileUpload;
