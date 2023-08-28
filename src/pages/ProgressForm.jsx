import { Box, useTheme, Button, TextField } from "@mui/material";
import { tokens } from "../theme";
import { useNavigate } from "react-router-dom";
import AddDeleteLoadTableRows from "../components/AddDeleteLoadTableRows";
import { useState } from "react";
import Header from "../components/Header";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { createProgressInfo } from "../api/progressInfo";
import { useSelector } from "react-redux";

const ProgressForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [bodyPart, setBodyPart] = useState("");
  const [rowsData, setRowsData] = useState([]);
  const [exerciseNames, setExerciseNames] = useState([]);
  const [exerciseLoads, setExerciseLoads] = useState([]);

  const addExerciseTableRows = () => {
    const rowsInput = {
      exerciseName: "",
    };
    setRowsData([...rowsData, rowsInput]);
  };

  const deleteExerciseTableRows = (index) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
  };

  const handleExerciseTableRowsChange = (index, event) => {
    const { name, value } = event.target;
    const rowsInput = [...rowsData];
    rowsInput[index][name] = value;
    setRowsData(rowsInput);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    const email = user.email;
    const exerciseNames = exerciseLoads.reduce((result, exerciseLoad) => {
      const existingExercise = result.find(
        (exercise) => exercise.exerciseName === exerciseLoad.exerciseName
      );

      if (existingExercise) {
        existingExercise.exerciseLoads.push({
          weight: exerciseLoad.weight,
          reps: exerciseLoad.reps,
          sets: exerciseLoad.sets,
        });
      } else {
        result.push({
          exerciseName: exerciseLoad.exerciseName,
          exerciseLoads: [
            {
              weight: exerciseLoad.weight,
              reps: exerciseLoad.reps,
              sets: exerciseLoad.sets,
              notes: exerciseLoad.notes,
            },
          ],
        });
      }

      return result;
    }, []);
    const progress = { bodyPart, exerciseNames };
    console.log("email: " + JSON.stringify(email));
    console.log("progress: " + JSON.stringify(progress));
    console.log("exerciseNames:" + JSON.stringify(exerciseNames));

    // createProgressInfo(email, progress)
    //   .then((response) => {
    //     console.log(response);
    //     navigate("/view");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  return (
    <>
      <form onSubmit={formSubmit} style={{ position: "relative" }}>
        <Box m="20px">
          <Header
            display="flex"
            title="Cheers To Another Grind!!!"
            subtitle="Add Your Gains"
          />
        </Box>

        <Box>
          <Box>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem",
              }}
            >
              <TextField
                required
                id="outlined-required"
                label="Body Part"
                variant="outlined"
                type="text"
                placeholder="Legs"
                InputLabelProps={{
                  shrink: true,
                }}
                focused={false}
                value={bodyPart}
                onChange={(e) => {
                  setBodyPart(e.target.value);
                }}
              />
              <Button
                sx={{
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  marginTop: "10px",
                }}
                onClick={addExerciseTableRows}
              >
                <AddIcon sx={{ mr: "10px" }} />
                Add Exercise Names
              </Button>
            </div>
            {rowsData.map((data, index) => {
              const { exerciseName } = data;
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    padding: "1rem",
                    gap: "1rem",
                  }}
                  key={index}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <TextField
                      required
                      type="text"
                      label="Exercise Name"
                      value={exerciseName}
                      placeholder="Barbell Squat"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      focused={false}
                      onChange={(event) =>
                        handleExerciseTableRowsChange(index, event)
                      }
                      name="exerciseName"
                      variant="outlined"
                    />
                    <Button
                      sx={{
                        backgroundColor: colors.redAccent[700],
                        color: colors.grey[100],
                        fontWeight: "bold",
                        padding: "16px",
                      }}
                      onClick={() => deleteExerciseTableRows(index)}
                    >
                      <DeleteIcon />
                    </Button>
                  </div>
                  <AddDeleteLoadTableRows
                    exerciseNames={exerciseNames}
                    setExerciseNames={setExerciseNames}
                    exerciseLoads={exerciseLoads}
                    setExerciseLoads={setExerciseLoads}
                    rowsData={rowsData}
                    index={index}
                  />
                </div>
              );
            })}
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

export default ProgressForm;
