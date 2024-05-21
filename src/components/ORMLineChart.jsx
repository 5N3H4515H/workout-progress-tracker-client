import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { setORMData } from "../store/slice/ormSlice";
import { getORMInfo } from "../api/ormInfo";
import { tokens } from "../theme";
import { Box, Typography, useTheme } from "@mui/material";

export default function ORMLineChart() {
  const user = useSelector((state) => state.user.user);
  const email = user.email;
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const ormData = await getORMInfo(email);
      dispatch(setORMData(ormData));
    };
    fetchData();
  }, [dispatch, email]);

  const data = useSelector((state) => state.orm.orm);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const green = tokens("dark").greenAccent[600];
  const red = tokens("dark").redAccent[600];
  const blue = tokens("dark").blueAccent[600];
  const primary = tokens("dark").primary[900];

  const tickInterval = 25;
  const maxTick = 300;
  const tickValues = [];

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

  const sortedData = data
    ?.slice()
    ?.sort(
      (a, b) => getMonthNumber(a.timePeriod) - getMonthNumber(b.timePeriod)
    );

  for (let i = 0; i <= maxTick; i += tickInterval) {
    tickValues.push(i);
  }

  return (
    <>
      {data && (
        <>
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
                One Rep Max
              </Typography>
            </Box>
          </Box>
          <ResponsiveContainer width="100%" aspect={3}>
            <LineChart
              data={sortedData}
              margin={{ right: 300, bottom: 20, top: 20 }}
            >
              <CartesianGrid horizontal={false} vertical={false} />
              <XAxis dataKey="timePeriod" interval={"preserveStartEnd"} />
              <YAxis domain={[0, 300]} ticks={tickValues} />
              <Legend />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="bench1RM"
                stroke={green}
                activeDot={{ r: 4 }}
                name="bench"
              />
              <Line
                type="monotone"
                dataKey="deadLift1RM"
                stroke={red}
                activeDot={{ r: 4 }}
                name="deadLift"
              />
              <Line
                type="monotone"
                dataKey="squat1RM"
                stroke={blue}
                activeDot={{ r: 4 }}
                name="squat"
              />
              <Line
                type="monotone"
                dataKey="bodyWeight"
                stroke={primary}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </>
      )}
    </>
  );
}
