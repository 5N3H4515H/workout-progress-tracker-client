import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../theme";
import Header from "../components/Header";
import ORMLineChart from "../components/ORMLineChart";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import SearchExerciseWiseGraph from "./SearchExerciseWiseGraph";

export default function DashBoard() {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      <Box m="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="DASHBOARD"
            subtitle="Welcome to Workout-Progress-Tracker"
          />

          <Box>
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                margin: "10px",
              }}
              onClick={() => {
                navigate("/addNew");
              }}
            >
              <AddIcon sx={{ mr: "10px" }} />
              Add Daily Progress
            </Button>
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
              onClick={() => {
                navigate("/addORM");
              }}
            >
              <AddIcon sx={{ mr: "10px" }} />
              Add One Rep Max
            </Button>
          </Box>
        </Box>
      </Box>
      {/* ROW 1 */}
      <Box
        gridColumn="span 8"
        gridRow="span 2"
        pt="10px"
        backgroundColor={colors.primary[400]}
      >
        <ORMLineChart />
      </Box>
      <Box mt="10px" mb="10px" backgroundColor={colors.primary[400]}>
        <SearchExerciseWiseGraph />
      </Box>
    </>
  );
}
