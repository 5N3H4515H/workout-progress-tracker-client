import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { Box, useTheme, Button } from "@mui/material";
import Header from "../components/Header";
import { deleteORMInfo, getORMInfo } from "../api/ormInfo";
import { setORMData } from "../store/slice/ormSlice";
import DeleteIcon from "@mui/icons-material/Delete";

export default function OrmData() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const orm = useSelector((state) => state.orm.orm);
  const user = useSelector((state) => state.user.user);
  const email = user.email;

  // Sort data based on the creation date (createDateTime)
  //   const sortedData = [...data].sort((a, b) => a.createDateTime.localeCompare(b.createDateTime));

  const monthToNumber = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
  };

  const getMonthNumber = (monthName) => monthToNumber[monthName];

  const sortedData = orm
    ?.slice()
    ?.sort(
      (a, b) => getMonthNumber(a.timePeriod) - getMonthNumber(b.timePeriod)
    );

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "bodyWeight",
      headerName: "Body Weight",
      flex: 0.5,
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "timePeriod",
      headerName: "Time Period",
      flex: 0.5,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "squat1RM",
      headerName: "Squat",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "bench1RM",
      headerName: "Bench",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "deadLift1RM",
      headerName: "Dead Lift",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "createDateTime",
      headerName: "Create Date",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      // field: "actions",
      // headerName: "Actions",
      // headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Button
            sx={{
              backgroundColor: colors.redAccent[700],
              fontWeight: "bold",
              padding: "10px",
            }}
            onClick={(e) => handleDelete(e, params.row)}
          >
            <DeleteIcon
              sx={{
                fontSize: "20px",
                color: colors.grey[100],
              }}
            />
          </Button>
        );
      },
    },
  ];

  const handleDelete = (e, row) => {
    deleteORMInfo(row.id)
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const ormData = await getORMInfo(email);
      dispatch(setORMData(ormData));
    };
    fetchData();
  }, [dispatch, email]);

  return (
    <>
      <Box m="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="View One Rep Max Data" />
        </Box>
        <Box
          m="10px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${colors.grey[100]} !important`,
            },
          }}
        >
          {orm && (
            <DataGrid
              rows={sortedData}
              columns={columns}
              slots={{ Toolbar: GridToolbar }}
            />
          )}
        </Box>
      </Box>
    </>
  );
}
