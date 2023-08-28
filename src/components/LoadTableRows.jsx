import { Button, TextField, useTheme } from "@mui/material";
import { tokens } from "../theme";
import DeleteIcon from "@mui/icons-material/Delete";

export default function LoadTableRows({
  loadRowsData,
  deleteTableRows,
  handleChange,
  isWeightValidError,
  isRepsValidError,
  isSetsValidError,
  handleChangeOnBlur,
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return loadRowsData.map((data, index) => {
    const { weight, reps, sets, notes } = data;
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "8px",
        }}
        key={index}
      >
        <TextField
          required
          type="number"
          label="Weight"
          value={weight}
          placeholder="0"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            min: 1,
            max: 1000,
          }}
          focused={false}
          onChange={(event) => handleChange(index, event)}
          name="weight"
          variant="outlined"
          error={isWeightValidError}
          helperText={
            isWeightValidError
              ? "Value must be between 1 and 1000"
              : "Add weights in kg."
          }
        />

        <TextField
          required
          type="number"
          label="Reps"
          value={reps}
          placeholder="0"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            min: 0,
            max: 500,
          }}
          focused={false}
          onChange={(event) => handleChange(index, event)}
          name="reps"
          variant="outlined"
          error={isRepsValidError}
          helperText={
            isRepsValidError
              ? "Value must be between 1 and 500"
              : "Add number of reps."
          }
        />

        <TextField
          required
          type="number"
          label="Sets"
          value={sets}
          placeholder="0"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            min: 1,
            max: 9,
          }}
          focused={false}
          onChange={(event) => handleChange(index, event)}
          name="sets"
          variant="outlined"
          error={isSetsValidError}
          helperText={
            isSetsValidError
              ? "Value must be between 1 and 9"
              : "Add number of sets."
          }
        />

        <TextField
          type="text"
          label="Notes"
          value={notes}
          placeholder="Dropped weight due to..."
          InputLabelProps={{
            shrink: true,
          }}
          focused={false}
          onChange={(event) => handleChange(index, event)}
          // onBlur={(event) => handleChangeOnBlur(index, event)}
          name="notes"
          variant="outlined"
          helperText="Add additional note about your set."
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
          onClick={() => deleteTableRows(index)}
        >
          <DeleteIcon />
        </Button>
      </div>
    );
  });
}
// loadRowsData,
// deleteLoadTableRows,
// handleLoadTableRowsChange,
