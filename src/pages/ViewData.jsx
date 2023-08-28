import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { Box, Button, useTheme } from "@mui/material";
import Header from "../components/Header";
import { getProgressInfo } from "../api/progressInfo";
import { setProgress } from "../store/slice/progressSlice";
import { useNavigate } from "react-router-dom";

export default function ViewData() {
  const user = useSelector((state) => state.user.user);
  const email = user.email;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const progress = useSelector((state) => state.progress.progress);
  const [selectedProgress, setSelectedProgress] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const progressData = await getProgressInfo(email);
      dispatch(setProgress(progressData));
    };
    fetchData();
  }, [dispatch, email]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "bodyPart", headerName: "Body Part", flex: 0.5 },
    { field: "createDateTime", headerName: "Create Date", flex: 0.5 },
    { field: "updateDateTime", headerName: "Update Date", flex: 0.5 },
  ];

  const handleRowClick = (params) => {
    const selectedRow = progress.find((row) => row.id === params.id);
    if (selectedRow) {
      console.log("Selected Row ID:", selectedRow.id);
      navigate(`/progress/${selectedRow.id}`);
    } else {
      console.error("Selected row not found!");
    }
    // setSelectedProgress(selectedRow);
  };

  return (
    <>
      <Box m="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="View Data" />

          <Box>
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              {`${user.firstName} ${user.lastName}`}
            </Button>
          </Box>
        </Box>
        <Box
          m="40px 0 0 0"
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
          {progress && (
            <div>
              <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={progress}
                  columns={columns}
                  slots={{ Toolbar: GridToolbar }}
                  onRowClick={handleRowClick}
                />
              </div>
            </div>
          )}
        </Box>
      </Box>
    </>
  );
}

// Sort data based on the creation date (createDateTime)
// const sortedData = [...data].sort((a, b) => a.createDateTime.localeCompare(b.createDateTime));

// const columns = [
//   { field: "id", headerName: "ID", flex: 0.5 },
//   { field: "weight", headerName: "Weight" },
//   {
//     field: "reps",
//     headerName: "Reps",
//     flex: 1,
//     type: "number",
//     headerAlign: "left",
//     align: "left",
//   },
//   {
//     field: "sets",
//     headerName: "Sets",
//     type: "number",
//     headerAlign: "left",
//     align: "left",
//   },
//  ];

// {selectedProgress && (
//   <div>
//     {/* Display the selected progress details */}
//     <h2>{selectedProgress.bodyPart}</h2>
//     {/* Render child data here */}
//     {selectedProgress.exerciseNames.map((exercise) => (
//       <div key={exercise.id}>
//         <h3>{exercise.exerciseName}</h3>
//         {/* Render exercise loads here */}
//         {exercise.exerciseLoads.map((load) => (
//           <div key={load.id}>
//             <p>Weight: {load.weight}</p>
//             <p>Reps: {load.reps}</p>
//             <p>Sets: {load.sets}</p>
//           </div>
//         ))}
//       </div>
//     ))}
//   </div>
// )}
{
  /* <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                progress: {JSON.stringify(progress)}
              </Typography>
            </Box>
          </Box>
        </Box> */
}
