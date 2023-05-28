import { Typography, Card, TextField, Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { CustomContext } from "../../utils/Routes";
import axiosObj from "../../api";
import { toast } from "react-toastify";
// startyr , endyr

const endpoint = "admin/addSubjects";

const data = [
  {
    name: "subcode",
    type: "text",
    title: "Subject Code",
  },
  {
    name: "credit",
    type: "number",
    title: "Credit",
  },
  {
    name: "subname",
    type: "text",
    title: "Subject Name",
  },
  {
    name: "typeofsub",
    type: "number",
    title: "Type Of Subject",
  },
  {
    name: "semsubbelongs",
    type: "number",
    title: "Semester Number",
  },
];

const Subjects = () => {
  const { regulation, degree } = useContext(CustomContext);
  const [submitting, setSubmitting] = useState(false);
  const submit = async (event: any) => {
    event.preventDefault();

    let data = {
      distDepartmentDeptid: 1,
    };
    const names = [
      "subcode",
      "credit",
      "subname",
      "typeofsub",
      "regulationRegid",
      "degreeDegid",
      "semsubbelongs",
    ];

    names.map((el: any) => {
      data[[el]] = document.getElementById(el).value;
    });

    console.log(data);

    const resp = await axiosObj.post(endpoint, data);

    if (resp.status === 200) {
      toast.success("Subject Added Successfully");
    } else {
      toast.error(resp.data.message);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <Card
        sx={{
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <Typography variant="h5">Add Subject </Typography>
        <form
          style={{
            flexDirection: "column",
            display: "flex",
            gap: "1rem",
          }}
          onSubmit={async (event: any) => {
            setSubmitting(true);
            await submit(event);
            setSubmitting(false);
          }}
        >
          {data.map((el: any) => {
            return (
              <TextField
                type={el.type}
                id={el.name}
                placeholder={el.title}
                size="small"
                required
              />
            );
          })}

          <select id="degreeDegid">
            {degree &&
              degree.map((el: any) => {
                return <option value={el.id}>{el.name}</option>;
              })}
          </select>

          <select id="regulationRegid">
            {regulation &&
              regulation.map((el: any) => {
                return <option value={el.id}>{el.name}</option>;
              })}
          </select>

          <Button type="submit" disabled={submitting} variant="contained">
            {submitting ? "Please Wait" : "Add Batch"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Subjects;
