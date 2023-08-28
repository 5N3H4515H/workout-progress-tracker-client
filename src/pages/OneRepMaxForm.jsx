import { Box, useTheme, Button, TextField } from "@mui/material";
import { tokens } from "../theme";
import { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { createORMInfo } from "../api/ormInfo";
import MenuItem from "@mui/material/MenuItem";
import { useSelector } from "react-redux";

const OneRepMaxForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const email = user.email;
  const [bodyWeight, setBodyWeight] = useState("");
  const [timePeriod, setTimePeriod] = useState("");
  const [squat1RM, setSquat1RM] = useState("");
  const [bench1RM, setBench1RM] = useState("");
  const [deadLift1RM, setDeadLift1RM] = useState("");

  //   const {
  //     register,
  //     handleSubmit,
  //     setValue,
  //     formState: { errors },
  //   } = useForm({
  //     defaultValues: {
  //       bodyWeight: "",
  //       timePeriod: "",
  //       squat1RM: "",
  //       bench1RM: "",
  //       deadLift1RM: "",
  //     },
  //   });
  const months = [
    {
      value: "January",
      label: "January",
    },
    {
      value: "February",
      label: "February",
    },
    {
      value: "March",
      label: "March",
    },
    {
      value: "April",
      label: "April",
    },
    {
      value: "May",
      label: "May",
    },
    {
      value: "June",
      label: "June",
    },
    {
      value: "July",
      label: "July",
    },
    {
      value: "August",
      label: "August",
    },
    {
      value: "September",
      label: "September",
    },
    {
      value: "October",
      label: "October",
    },
    {
      value: "November",
      label: "November",
    },
    {
      value: "December",
      label: "December",
    },
  ];

  const formSubmit = (e) => {
    e.preventDefault();
    const orm = { bodyWeight, timePeriod, squat1RM, bench1RM, deadLift1RM };
    console.log(email, orm);
    createORMInfo(email, orm)
      .then((response) => {
        console.log(response);
        navigate("/viewORM");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {/* <form
        // onSubmit={handleSubmit(formSubmit)}
        style={{ position: "relative" }}
      >
        <Box m="20px">
          <Header
            display="flex"
            title="Congratulations Beast!!!"
            subtitle="Add your new PR"
          />
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
            margin: "10px",
          }}
          noValidate
          autoComplete="off"
        >
          <Box>
            <TextField
              required
              id="outlined-required"
              label="Body Weight"
              variant="outlined"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
                focused={!!errors.bodyWeight}
                {...register("bodyWeight", { required: "Required" })}
                error={!!errors.bodyWeight}
                helperText={errors.bodyWeight && errors.bodyWeight.message}
              onChange={(e) => {
                setBodyWeight("bodyWeight", e.target.value);
              }}
            />

            <TextField
              required
              id="outlined-required"
              label="Time Period"
              variant="outlined"
                focused={!!errors.timePeriod}
                {...register("timePeriod", { required: "Required" })}
                error={!!errors.timePeriod}
                helperText={errors.timePeriod && errors.timePeriod.message}
              onChange={(e) => {
                setTimePeriod("timePeriod", e.target.value);
              }}
            />
            <TextField
              required
              id="outlined-required"
              label="Squat"
              variant="outlined"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
                focused={!!errors.squat1RM}
                {...register("squat1RM", { required: "Required" })}
                error={!!errors.squat1RM}
                helperText={errors.squat1RM && errors.squat1RM.message}
              
              onChange={(e) => {
                setSquat1RM("squat1RM", e.target.value);
              }}
            />
            <TextField
              required
              id="outlined-required"
              label="Bench"
              variant="outlined"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
                focused={!!errors.bench1RM}
                {...register("bench1RM", { required: "Required" })}
                error={!!errors.bench1RM}
                helperText={errors.bench1RM && errors.bench1RM.message}
              
              onChange={(e) => {
                setBench1RM("bench1RM", e.target.value);
              }}
            />
            <TextField
              required
              id="outlined-required"
              label="Dead Lift"
              variant="outlined"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
                focused={!!errors.deadLift1RM}
                {...register("deadLift1RM", { required: "Required" })}
                error={!!errors.deadLift1RM}
                helperText={errors.deadLift1RM && errors.deadLift1RM.message}
              
              onChange={(e) => {
                setDeadLift1RM("deadLift1RM", e.target.value);
              }}
            />
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                margin: "10px",
              }}
              variant="outlined"
              type="submit"
              onClick={(e) => {
                formSubmit(e);
              }}
            >
              Save
            </Button>
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
              variant="outlined"
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </form> */}
      <form style={{ position: "relative" }}>
        <Box m="20px">
          <Header
            display="flex"
            title="Congratulations Beast!!!"
            subtitle="Add Your New PR"
          />
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
            margin: "10px",
          }}
          noValidate
          autoComplete="off"
        >
          <Box>
            <TextField
              required
              id="outlined-required"
              label="Body Weight"
              variant="outlined"
              type="number"
              placeholder="0"
              InputLabelProps={{
                shrink: true,
              }}
              focused={false}
              value={bodyWeight}
              onChange={(e) => {
                setBodyWeight(e.target.value);
              }}
            />
            <TextField
              id="outlined-select-month"
              select
              label="Time Period"
              defaultValue="May"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              focused={false}
              helperText="Please select month"
              onChange={(e) => {
                setTimePeriod(e.target.value);
              }}
            >
              {months.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              required
              id="outlined-required"
              label="Squat"
              variant="outlined"
              type="number"
              placeholder="0"
              InputLabelProps={{
                shrink: true,
              }}
              focused={false}
              value={squat1RM}
              onChange={(e) => {
                setSquat1RM(e.target.value);
              }}
            />
            <TextField
              required
              id="outlined-required"
              label="Bench"
              variant="outlined"
              type="number"
              placeholder="0"
              InputLabelProps={{
                shrink: true,
              }}
              focused={false}
              value={bench1RM}
              onChange={(e) => {
                setBench1RM(e.target.value);
              }}
            />
            <TextField
              required
              id="outlined-required"
              label="Dead Lift"
              variant="outlined"
              type="number"
              placeholder="0"
              InputLabelProps={{
                shrink: true,
              }}
              focused={false}
              value={deadLift1RM}
              onChange={(e) => {
                setDeadLift1RM(e.target.value);
              }}
            />
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                margin: "10px",
              }}
              variant="outlined"
              type="submit"
              onClick={(e) => {
                formSubmit(e);
              }}
            >
              Save
            </Button>
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
              variant="outlined"
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </form>
    </>
  );
};

export default OneRepMaxForm;
