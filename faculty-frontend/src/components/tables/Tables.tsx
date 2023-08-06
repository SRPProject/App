import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosObj from "../../api";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import {
  Button,
  Chip,
  MenuItem,
  Select,
  Skeleton,
  Typography,
} from "@mui/material";
import { Done, PendingRounded } from "@mui/icons-material";
import { DataGrid, GridRowParams } from "@mui/x-data-grid";
import { queryClient } from "../../main";
import Popup from "./Popup";
import GetColumns from "./Columns";
import ENDPOINTS from "../../api/endpoints";
import { toast } from "react-toastify";

interface configVariables {
  queryType: String;
  isRejected: Boolean;
  status: Boolean;
  id: Number[] | String[];
}

//////////////////////
// this helper function decorates data according to table columns after api fetch

//decorates data differently based on queryType
const transform = (data: any[], queryType: String): any[] => {
  let students: any[] = [];
  if (queryType === "ACADEMICS") {
    console.log(data);
    Object.keys(data).map((key: String, serialNo: number) => {
      students.push({
        serialNo: serialNo + 1,
        id: data[key]["verifyId"],
        mail: "",
        regnum: "",
        proofLink: data[key]["proofLink"],
      });
    });
    console.log(students);
    return students;
  }

  if (!data.length) return [];

  data.forEach((student: any, serialNo: number) => {
    students.push({
      serialNo: serialNo + 1,
      id: student["student_verification"].id,
      mail: student.mail,
      regnum: student.regnum,
      proofLink: student["student_verification"].proofLink,
    });
  });

  return students;
};
/////////////////////////////

//// main table
const Table = ({
  queryType,
  batchId,
  semCount,
  setSemCount,
}: {
  queryType: String;
  batchId: number | null;
  semCount: any;
  setSemCount: Dispatch<SetStateAction<number>>;
}) => {
  const [pendingRows, setPendingRows] = useState([]);

  const [acceptedRows, setAcceptedRows] = useState([]);

  const [selectedRows, setSelectedRows] = useState([]);

  // 0 : pending , 1: accepted
  const [mode, setMode] = useState(false);

  const displayData = useRef(null);

  const [dialogOpen, setDialogOpen] = useState(false);

  // only usefuly for academics component
  const [currentSem, setCurrentSem] = useState(1);

  const columns = [
    ...GetColumns,
    {
      field: "viewMore",
      headerName: "view Details",
      renderCell: (params: Partial<GridRowParams>) => {
        return (
          <Button
            onClick={() => {
              setDialogOpen(true);
            }}
          >
            View More
          </Button>
        );
      },
    },
  ];

  const fetchData = async () => {
    let endpoint;

    // change endpoint according to component
    if (queryType === "LOGIN") {
      endpoint = ENDPOINTS.GET_STUDENTS_AUTH;
    } else if (queryType === "ACADEMICS") {
      endpoint = ENDPOINTS.GET_STUDENTS_SEMESTER;
    } else {
      endpoint = ENDPOINTS.GET_STUDENTS_EXTRACURRICULAR;
    }

    const resp = await axiosObj.post(endpoint, {
      batchId: batchId,
      type: queryType,
      status: mode,
      sem: currentSem,
    });

    if (resp.status == 400) {
      toast.error(resp.data.message);
      return null;
    }

    return resp.data;
  };

  const { data, isFetching } = useQuery(
    [queryType, mode, batchId, currentSem],
    () => fetchData(),
    {
      staleTime: Infinity,
    }
  );
  /////////////////////////////////////////////////////////////
  const updateRows = useMutation({
    mutationFn: ({ id, queryType, isRejected, status }: configVariables) => {
      let endpoint;

      if (queryType === "LOGIN") {
        endpoint = ENDPOINTS.VERIFY_STUDENTS_AUTH;
      } else if (queryType === "ACADEMICS") {
        endpoint = ENDPOINTS.VERIFY_STUDENTS_SEMESTER;
      } else {
        endpoint = ENDPOINTS.VERIFY_STUDENTS_EXTRACURRICULAR;
      }

      return axiosObj.post(endpoint, { id, queryType, isRejected, status });
    },
    onSuccess: (data) => {
      toast.success(data.data.message);

      queryClient.invalidateQueries([queryType, true, batchId, currentSem]);

      queryClient.invalidateQueries([queryType, false, batchId, currentSem]);
    },
  });
  /////////////////////////////////////////////////
  // intial fetch !!
  useEffect(() => {
    if (data) {
      if (!data.message) {
        setPendingRows([]);
        setAcceptedRows([]);
        return;
      }

      if (!mode) setPendingRows(transform(data.message, queryType));
      else setAcceptedRows(transform(data.message, queryType));
    }
  }, [data]);

  // useEffect(() => {
  //   console.log(client.getQueryData([queryType, mode, batchId, currentSem]));
  // }, [queryType]);

  return (
    <div
      style={{
        gap: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
      }}
    >
      {/* ------------------------------------------------------------- */}

      <Popup
        open={dialogOpen}
        setOpen={setDialogOpen}
        data={displayData.current}
      />

      <div style={{ display: "flex", gap: "2rem" }}>
        {[
          { type: "warning", mode: false, title: "Pending" },
          { type: "success", mode: true, title: "Accepted" },
        ].map((el: any) => {
          return (
            <Chip
              color={el.type}
              variant={mode == el.mode ? "filled" : "outlined"}
              icon={mode == el.mode ? <Done /> : <></>}
              onClick={() => setMode((mode) => !mode)}
              label={el.title}
              sx={{ cursor: "pointer" }}
            />
          );
        })}
      </div>

      {/* ------------------------------------------------------------- */}

      {queryType === "ACADEMICS" && (
        <div>
          <Typography> Total Semesters - {semCount}</Typography>
          <br></br>

          <Select value={currentSem}>
            {Array.from(Array(semCount).keys()).map((item: number) => {
              return (
                <MenuItem
                  onClick={(e) => {
                    setCurrentSem(item + 1);
                  }}
                  value={item + 1}
                >
                  Semester - {item + 1}
                </MenuItem>
              );
            })}
          </Select>
        </div>
      )}

      {/* ------------------------------------------------------------- */}

      <div style={{ display: "flex", alignSelf: "flex-start", gap: "2rem" }}>
        <Button
          disableElevation
          color="error"
          disabled={selectedRows.length == 0}
          variant="contained"
          onClick={() => {
            updateRows.mutate({
              id: selectedRows,
              status: true,
              isRejected: true,
              queryType,
            });
          }}
        >
          Reject
        </Button>
        {!mode && (
          <Button
            disableElevation
            disabled={selectedRows.length == 0}
            variant="contained"
            onClick={() => {
              let temp = [];
              updateRows.mutate({
                id: selectedRows,
                status: true,
                isRejected: false,
                queryType,
              });
            }}
            color="success"
          >
            Accept
          </Button>
        )}
      </div>

      {/* ------------------------------------------------------------- */}

      {/*  table starts */}
      {!isFetching ? (
        <DataGrid
          columns={columns}
          rows={mode ? acceptedRows : pendingRows}
          checkboxSelection
          showColumnVerticalBorder
          disableRowSelectionOnClick
          hideFooterPagination
          onRowSelectionModelChange={(data: any) => {
            setSelectedRows(data);
          }}
        ></DataGrid>
      ) : (
        <Skeleton
          variant="rectangular"
          sx={{ height: "100%", width: "100%" }}
        ></Skeleton>
      )}

      <Typography>
        {mode
          ? acceptedRows.length === 0 && "No Data found"
          : pendingRows.length == 0 && "No Data found"}
      </Typography>
    </div>
  );
};

////////////////// transform data

export default Table;
