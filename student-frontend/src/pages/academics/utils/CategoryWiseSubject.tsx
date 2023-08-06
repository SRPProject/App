import { Card, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
/*
{"id":1,"scoredgrade":0,"attempts":0,"monthyrpass":null,"semester_no":1,"createdAt":"2023-07-24T06:10:16.110Z","updatedAt":"2023-07-24T06:10:16.110Z","subjectSubid":9,"studentStId":1,"subject.subid":9,"subject.credit":0,"subject.subcode":"IT5045","subject.subname":"IT__1",
*/

const grades = [
  ["O", 10],
  ["A+", 9],
  ["A", 8],
  ["B+", 7],
  ["B", 6],
  ["C", 5],
  ["P", 4],
];

const CategoryWiseSubject = ({
  data,
  id,
  updatedValues,
  updateHandler,
}: {
  data: any;
  id: string;
  updatedValues: any;
  updateHandler: any;
}) => {
  return (
    <div>
      {data && data[id] ? (
        data[id].map((item: any) => {
          // persist value across rendering!!
          const temp = updatedValues.current[item["subject.subid"]];

          const [change, setChange] = useState(temp != undefined);

          return (
            <Card
              elevation={3}
              sx={{
                padding: "1rem ",
                margin: "1rem 0",
                backgroundColor: change ? "#E2FFFF" : "",
              }}
            >
              <Typography variant="h6">
                {item["subject.subname"]}
                <Typography variant="body1">
                  {item["subject.subcode"]}
                </Typography>
              </Typography>
              {/* --------------------------------------------- */}
              <div style={{ margin: "1rem 0" }}>
                <Typography margin="1rem 0" variant="caption">
                  Number of attempts
                </Typography>
                <br />
                <TextField
                  type="number"
                  defaultValue={
                    temp && temp["attempts"]
                      ? temp["attempts"]
                      : item["attempts"]
                  }
                  size="small"
                  onChange={(e: any) => {
                    const change = updateHandler(
                      item["subject.subid"],
                      "attempts",
                      e.target.value,
                      item
                    );
                    setChange(change);
                  }}
                ></TextField>
              </div>
              {/* --------------------------------------------- */}
              <div style={{ margin: "1rem 0" }}>
                <Typography margin="1rem 0" variant="caption">
                  Grade Obtained
                </Typography>
                <br />
                <Select
                  size={"small"}
                  defaultValue={
                    temp && temp["scoredgrade"]
                      ? temp["scoredgrade"]
                      : item["scoredgrade"]
                  }
                  onChange={(e) => {
                    const change = updateHandler(
                      item["subject.subid"],
                      "scoredgrade",
                      e.target.value,
                      item
                    );
                    setChange(change);
                  }}
                >
                  {grades.map((grade: (number | string)[]) => {
                    return <MenuItem value={grade[1]}>{grade[0]}</MenuItem>;
                  })}
                </Select>
              </div>
              {/* --------------------------------------------- */}
              <div style={{ margin: "1rem 0" }}>
                <Typography margin="1rem 0" variant="caption">
                  Month and Year Of passing
                </Typography>
                <br />
                <input
                  onChange={(e) => {
                    const change = updateHandler(
                      item["subject.subid"],
                      "monthyrpass",
                      e.target.value,
                      item
                    );
                    setChange(change);
                  }}
                  defaultValue={
                    temp && temp["monthyrpass"]
                      ? temp["monthyrpass"]
                      : item["monthyrpass"]
                  }
                  style={{ padding: ".25rem" }}
                  type="month"
                ></input>
              </div>
              {/* --------------------------------------------- */}
            </Card>
          );
        })
      ) : (
        <Typography sx={{ margin: "2rem" }}>No Subjects Found</Typography>
      )}
    </div>
  );
};

export default CategoryWiseSubject;
