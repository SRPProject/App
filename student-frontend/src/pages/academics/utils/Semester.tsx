import { Button, Tab, Tabs } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import CategoryWiseSubject from "./CategoryWiseSubject";
import axiosObj from "../../../api";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";

const types: { [key: number]: string } = {
  0: "COMPULSORY",
  1: "AUDIT",
  2: "ELECTIVES",
  3: "HUMANITIES",
};

/////////////////////
const getEndpoint = "/student/studentsem";
const updateEndpoint = "/student/updateSemMark";
/////////////////////

const fetchData = async (sem: number) => {
  const resp = await axiosObj.post(getEndpoint, { sem });

  if (resp.status != 200) {
    return {};
  }

  return resp.data.message;
};

const Semester = ({ sem }: { sem: number }) => {
  const [value, setValue] = useState(0);

  const [semData, setSemData] = useState({});

  const { data, isFetching } = useQuery([sem], () => {
    return fetchData(sem);
  });

  //[{ subjectSubid: 32, scoredgrade: 10, monthyrpass: "2020/1/1" }];

  const updatedValues = useRef(Object());

  ////////////////////takes care of handling updating data !!
  const updateHandler = (id: any, label: any, newValue: any, oldValue: any) => {
    const temp = updatedValues.current;

    if (!(id in temp)) {
      updatedValues.current[id] = Object.assign(
        {},
        {
          scoredgrade: oldValue.scoredgrade,
          monthyrpass: oldValue.monthyrpass,
          attempts: oldValue.attempts,
        }
      );
    }

    updatedValues.current[id][label] = newValue;

    let flag: boolean = false;

    Object.keys(updatedValues.current[id]).forEach((item) => {
      if (updatedValues.current[id][item] != oldValue[item]) {
        flag = true;
        return;
      }
    });

    if (flag) return true;

    delete updatedValues.current[id];

    return false;
  };

  useEffect(() => {
    if (!isFetching && data) {
      setSemData(data);
    }
  }, [isFetching, data]);

  //////////////////////////////////////////////
  const send = async () => {
    const temp = updatedValues.current;

    if (temp.length === 0) return;

    let data: any[] = [];

    Object.keys(temp).forEach((item: any) => {
      const obj = temp[item];
      data.push({ subjectSubid: Number(item), ...obj });
    });

    const resp = await axiosObj.post(updateEndpoint, {
      marks: JSON.stringify(data),
    });

    if (resp.status === 200) toast.success(resp.data.message);

    console.log(resp.data);
  };
  ///////////////////////////////////////////////////////
  return (
    <div style={{ padding: "2rem 0" }}>
      <Button variant="outlined" onClick={send}>
        Update Marks
      </Button>
      <Tabs
        onChange={(e: React.SyntheticEvent, val: number) => setValue(val)}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        value={value}
        sx={{ margin: "2rem 0", borderBottom: 1, borderColor: "divider" }}
      >
        {Object.keys(types).map((item: any) => {
          return <Tab value={item} label={String(types[item])}></Tab>;
        })}
      </Tabs>

      {isFetching ? (
        <Loader />
      ) : (
        <CategoryWiseSubject
          id={types[value]}
          data={semData}
          updatedValues={updatedValues}
          updateHandler={updateHandler}
        ></CategoryWiseSubject>
      )}
    </div>
  );
};

export default Semester;
