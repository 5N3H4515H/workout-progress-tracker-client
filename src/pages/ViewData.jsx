import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { Box, useTheme } from "@mui/material";
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
    if (params) {
      navigate(`/progress/${params.id}`);
    } else {
      console.error("Selected row not found!");
    }
  };

  return (
    <>
      <Box m="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="View Data" />
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
