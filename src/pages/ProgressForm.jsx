import { Box, useTheme, Button, TextField } from "@mui/material";
import { tokens } from "../theme";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import { createProgressInfo } from "../api/progressInfo";

const validations = {
  weight: (value) => (value >= 1 && value <= 1000) || value == "Body Weight",
  reps: (value) => (value >= 1 && value <= 500) || value == "Failure",
  sets: (value) => value >= 1 && value <= 9,
  exerciseName: (value) => value.length > 0,
};

export default function ProgressForm() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [bodyPart, setBodyPart] = useState("");

  /**
  
  [
    {
      exerciseName: {value:"Bench Press", error:null},
      exerciseLoads:[
        {weight: {value:100, error:null}, reps: {value:10, error:null}, sets: {value:3, error:null}, notes: {value:"notes", error:null}},
      ]
    },
    {
      exerciseName: {value:"Bench Press 2", error:null},
      exerciseLoads:[
        {weight: {value:100, error:null}, reps: {value:10, error:null}, sets: {value:3, error:null}, notes: {value:"notes", error:null}},
      ]
    }
  ]

   */
  const [exerciseData, setExerciseData] = useState([]);
  const addExercise = () => {
    setExerciseData((s) => {
      const newData = [...s];
      newData.push({
        exerciseName: { value: "", error: null },
        exerciseLoads: [],
      });
      return newData;
    });
  };

  const formSubmit = (e) => {
    e.preventDefault();

    let isValid = true;
    const data = JSON.parse(JSON.stringify(exerciseData));
    for (let i = 0; i < data.length; i++) {
      data[i].exerciseName.error = !validations.exerciseName(data[i].exerciseName.value);
      if (data[i].exerciseName.error) isValid = false;

      for (let j = 0; j < data[i].exerciseLoads.length; j++) {
        data[i].exerciseLoads[j].weight.error = !validations.weight(data[i].exerciseLoads[j].weight.value);
        if (data[i].exerciseLoads[j].weight.error) isValid = false;
        data[i].exerciseLoads[j].reps.error = !validations.reps(data[i].exerciseLoads[j].reps.value);
        if (data[i].exerciseLoads[j].reps.error) isValid = false;
        data[i].exerciseLoads[j].sets.error = !validations.sets(data[i].exerciseLoads[j].sets.value);
        if (data[i].exerciseLoads[j].sets.error) isValid = false;
      }
    }

    if (!isValid) {
      setExerciseData(data);
      return;
    }

    const email = user.email;
    const exerciseNames = exerciseData.map((item) => {
      const exerciseName = item.exerciseName.value;
      const exerciseLoads = item.exerciseLoads.map((load) => {
        const weight = load.weight.value;
        const reps = load.reps.value;
        const sets = load.sets.value;
        const notes = load.notes.value;
        return { weight, reps, sets, notes };
      });
      return { exerciseName, exerciseLoads };
    });
    const progress = { bodyPart, exerciseNames };
    console.log("email: " + JSON.stringify(email));
    console.log("progress: " + JSON.stringify(progress));
    console.log("exerciseData:" + JSON.stringify(exerciseNames));

    createProgressInfo(email, progress)
      .then((response) => {
        console.log(response);
        navigate("/view");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const setExerciseNames = (name, index) => {
    setExerciseData((s) => {
      const newData = [...s];
      newData[index].exerciseName.value = name;
      newData[index].exerciseName.error = !validations.exerciseName(name);
      return newData;
    });
  };

  const deleteExerciseNames = (index) => {
    setExerciseData((s) => {
      const newData = s.filter((item, i) => i !== index);
      return [...newData];
    });
  };

  const addDetailsExercise = (index) => {
    setExerciseData((s) => {
      const newData = [...s];
      newData[index].exerciseLoads.push({
        weight: { value: "", error: null },
        reps: { value: "", error: null },
        sets: { value: "", error: null },
        notes: { value: "", error: null },
      });
      return newData;
    });
  };

  const exerciseDetailValue = (i, j, key, value) => {
    setExerciseData((s) => {
      const newData = [...s];
      newData[i].exerciseLoads[j][key].value = value;
      if (validations[key]) newData[i].exerciseLoads[j][key].error = !validations[key](value);
      return newData;
    });
  };

  const deleteExerciseDetails = (i, j) => {
    setExerciseData((s) => {
      const newData = [...s];
      newData[i].exerciseLoads = newData[i].exerciseLoads.filter((item, index) => index !== j);
      return newData;
    });
  };

  const handleValidationExerciseDetails = (i, j, key, value) => {
    if (validations[key])
      setExerciseData((s) => {
        const newData = [...s];
        newData[i].exerciseLoads[j][key].error = !validations[key](value);
        return newData;
      });
  };

  const handleValidationExerciseName = (i, value) => {
    if (validations.exerciseName)
      setExerciseData((s) => {
        const newData = [...s];
        newData[i].exerciseName.error = !validations.exerciseName(value);
        return newData;
      });
  };

  return (
    <>
      <form onSubmit={formSubmit} style={{ position: "relative" }}>
        <Box m="20px">
          <Header display="flex" title="Cheers To Another Grind!!!" subtitle="Add Your Gains" />
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
            </div>
            {exerciseData.map((item, i) => {
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    padding: "1rem",
                    gap: "1rem",
                  }}
                  key={i}
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
                      value={item.exerciseName.value}
                      placeholder="Barbell Squat"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      focused={false}
                      onChange={(event) => setExerciseNames(event.currentTarget.value, i)}
                      name="exerciseName"
                      variant="outlined"
                      error={item.exerciseName.error}
                      onBlur={(event) => handleValidationExerciseName(i, event.currentTarget.value)}
                      helperText={item.exerciseName.error ? "Exercise name is required" : ""}
                    />
                    <Button
                      sx={{
                        backgroundColor: colors.redAccent[700],
                        color: colors.grey[100],
                        fontWeight: "bold",
                        padding: "16px",
                      }}
                      onClick={() => deleteExerciseNames(i)}
                    >
                      <DeleteIcon />
                    </Button>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    <div>
                      <Button
                        sx={{
                          backgroundColor: colors.blueAccent[700],
                          color: colors.grey[100],
                          fontSize: "14px",
                          fontWeight: "bold",
                          padding: "10px 20px",
                        }}
                        onClick={() => addDetailsExercise(i)}
                      >
                        <AddIcon sx={{ mr: "10px" }} />
                        Add Details
                      </Button>
                    </div>
                    {item.exerciseLoads.map((exerciseDetail, j) => (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: "8px",
                        }}
                        key={j}
                      >
                        <TextField
                          required
                          type="text"
                          label="Weight"
                          value={exerciseDetail.weight.value}
                          placeholder="0"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          inputProps={{
                            min: 1,
                            max: 1000,
                          }}
                          focused={false}
                          onChange={(event) => exerciseDetailValue(i, j, "weight", event.currentTarget.value)}
                          name="weight"
                          variant="outlined"
                          onBlur={(event) => handleValidationExerciseDetails(i, j, "weight", event.currentTarget.value)}
                          error={exerciseDetail.weight.error}
                          helperText={
                            exerciseDetail.weight.error
                              ? "Value must be (between 1 and 1000) / Body Weight"
                              : "Add weights in kg."
                          }
                        />

                        <TextField
                          required
                          type="text"
                          label="Reps"
                          value={exerciseDetail.reps.value}
                          placeholder="0"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          inputProps={{
                            min: 0,
                            max: 500,
                          }}
                          focused={false}
                          onChange={(event) => exerciseDetailValue(i, j, "reps", event.currentTarget.value)}
                          name="reps"
                          variant="outlined"
                          error={exerciseDetail.reps.error}
                          onBlur={(event) => handleValidationExerciseDetails(i, j, "reps", event.currentTarget.value)}
                          helperText={
                            exerciseDetail.reps.error
                              ? "Value must be (between 1 and 500) / Failure"
                              : "Add number of reps."
                          }
                        />

                        <TextField
                          required
                          type="number"
                          label="Sets"
                          value={exerciseDetail.sets.value}
                          placeholder="0"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          inputProps={{
                            min: 1,
                            max: 9,
                          }}
                          focused={false}
                          onChange={(event) => exerciseDetailValue(i, j, "sets", event.currentTarget.value)}
                          name="sets"
                          variant="outlined"
                          error={exerciseDetail.sets.error}
                          onBlur={(event) => handleValidationExerciseDetails(i, j, "sets", event.currentTarget.value)}
                          helperText={
                            exerciseDetail.sets.error ? "Value must be between 1 and 9" : "Add number of sets."
                          }
                        />

                        <TextField
                          type="text"
                          label="Notes"
                          value={exerciseDetail.notes.value}
                          placeholder="Dropped weight due to..."
                          InputLabelProps={{
                            shrink: true,
                          }}
                          focused={false}
                          name="notes"
                          variant="outlined"
                          helperText={"Add notes."}
                          onChange={(event) => exerciseDetailValue(i, j, "notes", event.currentTarget.value)}
                        />
                        <Button
                          sx={{
                            backgroundColor: colors.redAccent[700],
                            color: colors.grey[100],
                            fontWeight: "bold",
                            padding: "16px",
                            marginBottom: "19px",
                          }}
                          variant="outlined"
                          onClick={() => deleteExerciseDetails(i, j)}
                        >
                          <DeleteIcon />
                        </Button>
                      </div>
                    ))}
                  </div>
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
                marginLeft: "10px",
              }}
              onClick={addExercise}
            >
              <AddIcon sx={{ mr: "10px" }} />
              Add Exercise Names
            </Button>
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
}
