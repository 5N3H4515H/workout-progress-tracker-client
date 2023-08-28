import { Box, useTheme, Button, TextField } from "@mui/material";
import { tokens } from "../theme";
import { useNavigate } from "react-router-dom";
import AddDeleteLoadTableRows from "../components/AddDeleteLoadTableRows";
import { useState } from "react";
import Header from "../components/Header";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const ChartForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [bodyPart, setBodyPart] = useState("");
  const [rowsData, setRowsData] = useState([]);
  const [loadData, setLoadData] = useState([]);

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
    const progress = { bodyPart, rowsData, loadData };
    console.log(progress);
    // createORMInfo(orm)
    //   .then((response) => {
    //     console.log(response);
    //     navigate("/viewORM");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  return (
    <>
      <form action={formSubmit} style={{ position: "relative" }}>
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
                    loadData={loadData}
                    setLoadData={setLoadData}
                    rowsData={rowsData}
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

export default ChartForm;
