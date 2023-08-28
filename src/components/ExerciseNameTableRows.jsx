import { Button, TextField, useTheme } from "@mui/material";
import { tokens } from "../theme";
import DeleteIcon from "@mui/icons-material/Delete";
import AddDeleteLoadTableRows from "./AddDeleteLoadTableRows";

export default function ExerciseNameTableRows({
  rowsData,
  deleteTableRows,
  handleChange,
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return rowsData.map((data, index) => {
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
            onChange={(event) => handleChange(index, event)}
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
            onClick={() => deleteTableRows(index)}
          >
            <DeleteIcon />
          </Button>
        </div>
        <AddDeleteLoadTableRows />
      </div>
    );
  });
}

// deleteExerciseTableRows,
// handleExerciseTableRowsChange,
// loadRowsData,
// addLoadTableRows,
// deleteLoadTableRows,
// handleLoadTableRowsChange,

// loadRowsData={loadRowsData}
// addLoadTableRows={addLoadTableRows}
// deleteLoadTableRows={deleteLoadTableRows}
// handleLoadTableRowsChange={handleLoadTableRowsChange}
