import { useState } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import Header from "../components/Header";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getExerciseInfo } from "../api/exerciseInfo";
import {
  LineChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function SearchExerciseWiseGraph() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const email = user.email;

  const [valueToBeSearched, setValueToBeSearched] = useState("");
  const [isFetched, setIsFetched] = useState();
  const [loadData, setLoadData] = useState(null);

  const green = tokens("dark").greenAccent[600];
  const red = tokens("dark").redAccent[600];

  const tickInterval = 5;
  const maxTick = 300;
  const tickValues = [];

  for (let i = 0; i <= maxTick; i += tickInterval) {
    tickValues.push(i);
  }
  /*
   [
    {
      date: "2023-08-06",
      id: 1223,
      notes: "",
      weight: "75",
      reps: "12",
      sets: "3",
    },

    {
      date: "2023-09-06",
      id: 1226,
      notes: "",
      weight: "65",
      reps: "10",
      sets: "4",
    },

    {
      date: "2023-09-08",
      id: 1232,
      notes: "",
      weight: "90",
      reps: "12",
      sets: "1",
    },
    {
      date: "2023-09-08",
      id: 1233,
      notes: "",
      weight: "80",
      reps: "15",
      sets: "2",
    },
  ]
*/
  const handleSearch = async (e) => {
    e.preventDefault();
    getExerciseInfo(email, valueToBeSearched)
      .then((response) => {
        console.log("response: ", response);
        const convertedData = response.flatMap((exercise) =>
          exercise[1].map((loadItem) => ({
            date: exercise[0],
            weight: parseFloat(loadItem.weight),
            reps: parseInt(loadItem.reps),
          }))
        );
        setLoadData(convertedData);
        {
          response.length > 0 ? "" : setIsFetched("Data Not Found!");
        }
        navigate("/searchExercise");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Box m="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="Search an Exercise Name"
            subtitle="To see it's progression"
          />
          {/* SEARCH BAR */}
          <Box
            display="flex"
            backgroundColor={colors.primary[400]}
            borderRadius="3px"
          >
            <InputBase
              required
              sx={{ ml: 2, flex: 1 }}
              placeholder="Search"
              value={valueToBeSearched}
              onChange={(e) => {
                setValueToBeSearched(e.target.value);
              }}
            />
            <IconButton
              type="button"
              sx={{ p: 1 }}
              onClick={(e) => {
                handleSearch(e);
              }}
            >
              <SearchIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
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
              marginBottom="20px"
            >
              {loadData && loadData.length > 0 ? valueToBeSearched : ""}
            </Typography>
          </Box>
        </Box>
        {loadData && loadData.length > 0 ? (
          <ResponsiveContainer width="100%" aspect={3}>
            <LineChart data={loadData} margin={{ right: 300 }}>
              <CartesianGrid horizontal={false} vertical={false} />
              <XAxis dataKey="date" interval={"preserveStartEnd"} />
              <YAxis domain={[0, 300]} ticks={tickValues} />
              <Legend />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="weight"
                stroke={green}
                activeDot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="reps"
                stroke={red}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <Typography
            variant="h5"
            fontWeight="600"
            color={colors.grey[100]}
            margin="10px"
          >
            {isFetched}
          </Typography>
        )}
      </Box>
    </>
  );
}
