import { Button } from "@mui/material";
import { GridRowParams } from "@mui/x-data-grid";

const columns = [
  {
    field: "serialNo",
    headerName: "Sno",
    width: 50,
  },
  {
    field: "regnum",
    headerName: "Register No",
    width: 200,
  },
  {
    field: "mail",
    headerName: "Email",
    width: 200,
  },
  {
    field: "proofLink",
    headerName: "Proof Link",
    width: 300,
    renderCell: (params: Partial<GridRowParams>) => {
      return (
        <a target="_blank" href="hi.pdf">
          {params.row.proofLink}
        </a>
      );
    },
  },
  // {
  //   field: "createdAt",
  //   headerName: "Attached at",
  //   width: 200,
  // },
];

export default columns;
