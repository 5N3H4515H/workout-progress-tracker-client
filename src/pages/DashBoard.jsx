import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import Header from "../components/Header";
import EditIcon from "@mui/icons-material/Edit";
import ORMLineChart from "../components/ORMLineChart";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

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
              Add Daily Progress{/* {`${user.firstName} ${user.lastName}`} */}
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
        backgroundColor={colors.primary[400]}
      >
        <Box
          mt="25px"
          p="0 30px"
          display="flex"
          height="20px"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography
              variant="h5"
              fontWeight="600"
              color={colors.grey[100]}
              marginBottom="10px"
            >
              One Rep Max
            </Typography>
          </Box>
          {/* <Box>
            <IconButton>
              <EditIcon
                sx={{
                  fontSize: "20px",
                  color: colors.greenAccent[500],
                  mr: "5px",
                }}
              />
              Edit
            </IconButton>
          </Box> */}
        </Box>
        <ORMLineChart />
      </Box>
    </>
  );
}
