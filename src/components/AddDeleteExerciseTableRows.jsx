import { useState } from "react";
import { Button, TextField, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { tokens } from "../theme";
import ExerciseNameTableRows from "./ExerciseNameTableRows";
import PropTypes from "prop-types";

export default function AddDeleteExerciseTableRows() {
  const [rowsData, setRowsData] = useState([]);
  const [bodyPart, setBodyPart] = useState("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const addTableRows = () => {
    const rowsInput = {
      exerciseName: "",
    };
    setRowsData([...rowsData, rowsInput]);
  };
  const deleteTableRows = (index) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const rowsInput = [...rowsData];
    rowsInput[index][name] = value;
    setRowsData(rowsInput);
  };
  return (
    <>
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
          onClick={addTableRows}
        >
          <AddIcon sx={{ mr: "10px" }} />
          Add Exercise Names
        </Button>
      </div>
      <ExerciseNameTableRows
        rowsData={rowsData}
        deleteTableRows={deleteTableRows}
        handleChange={handleChange}
      />
    </>
  );
}

//   {
//   rowsData,
//   addExerciseTableRows,
//   deleteExerciseTableRows,
//   handleExerciseTableRowsChange,
//   loadRowsData,
//   addLoadTableRows,
//   deleteLoadTableRows,
//   handleLoadTableRowsChange,
// }

{
  /* <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexDirection: "column",
          padding: "1rem",
        }}
      >
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
      <div
      // style={{
      //   display: "flex",
      //   flexDirection: "column",
      //   padding: "1rem",
      // }}
      >
        <ExerciseNameTableRows
          rowsData={rowsData}
          deleteExerciseTableRows={deleteExerciseTableRows}
          handleExerciseTableRowsChange={handleExerciseTableRowsChange}
          loadRowsData={loadRowsData}
          addLoadTableRows={addLoadTableRows}
          deleteLoadTableRows={deleteLoadTableRows}
          handleLoadTableRowsChange={handleLoadTableRowsChange}
        />
      </div> */
}

// AddDeleteExerciseTableRows.propTypes = {
//   rowsData: PropTypes.any.isRequired,
//   addExerciseTableRows: PropTypes.any.isRequired,
//   deleteExerciseTableRows: PropTypes.any.isRequired,
//   handleExerciseTableRowsChange: PropTypes.any.isRequired,
//   loadRowsData: PropTypes.any.isRequired,
//   addLoadTableRows: PropTypes.any.isRequired,
//   deleteLoadTableRows: PropTypes.any.isRequired,
//   handleLoadTableRowsChange: PropTypes.any.isRequired,
// };
