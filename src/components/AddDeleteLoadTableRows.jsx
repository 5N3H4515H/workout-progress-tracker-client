import { useState } from "react";
import { Button, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { tokens } from "../theme";
import LoadTableRows from "./LoadTableRows";
import PropTypes from "prop-types";

export default function AddDeleteLoadTableRows({
  exerciseLoads,
  setExerciseLoads,
  rowsData,
}) {
  const [loadRowsData, setLoadRowsData] = useState([]);
  const [isWeightValidError, setIsWeightValidError] = useState(false);
  const [isRepsValidError, setIsRepsValidError] = useState(false);
  const [isSetsValidError, setIsSetsValidError] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const addTableRows = () => {
    var rowIndex = rowsData.length - 1;
    const specificExerciseName = rowsData[rowIndex];
    const rowsInput = {
      exerciseName: specificExerciseName.exerciseName,
      weight: "",
      reps: "",
      sets: "",
      notes: "",
    };
    // console.log(
    //   "loadRowsData in addTableRows method: " + JSON.stringify(loadRowsData)
    // );
    // console.log("loadData in addTableRows method: " + JSON.stringify(loadData));
    // console.log(rowsInput);
    setLoadRowsData([...loadRowsData, rowsInput]);
  };
  const deleteTableRows = (index) => {
    const rows = [...loadRowsData];
    const specificRow = rows[index];
    console.log("specificRow:" + JSON.stringify(specificRow));
    const exerciseLoadsCopy = [...exerciseLoads];

    rows.splice(index, 1);
    setLoadRowsData(rows);
    console.log("After Deleting loadRowsData: " + JSON.stringify(loadRowsData));

    // Find the index of the specific object in exerciseLoadsCopy
    const indexOfSpecificRow = exerciseLoadsCopy.findIndex(
      (exercise) => exercise === specificRow
    );
    if (indexOfSpecificRow !== -1) {
      // If the specific object is found, remove it from exerciseLoadsCopy
      exerciseLoadsCopy.splice(indexOfSpecificRow, 1);
      setExerciseLoads(exerciseLoadsCopy);
    }
    console.log(
      "After Deleting exerciseLoads: " + JSON.stringify(exerciseLoads)
    );
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedLoadRowsData = [...loadRowsData];
    updatedLoadRowsData[index][name] = value;
    setLoadRowsData(updatedLoadRowsData);

    const specificRow = updatedLoadRowsData[index];
    console.log("specificRow:" + JSON.stringify(specificRow));

    const weight =
      specificRow.weight >= 1 && specificRow.weight <= 1000
        ? setIsWeightValidError(false)
        : setIsWeightValidError(true);
    const reps =
      specificRow.reps >= 1 && specificRow.reps <= 500
        ? setIsRepsValidError(false)
        : setIsRepsValidError(true);
    const sets =
      specificRow.sets >= 1 && specificRow.sets <= 9
        ? setIsSetsValidError(false)
        : setIsSetsValidError(true);

    const weightValue = specificRow.weight >= 1 && specificRow.weight <= 1000;
    // console.log("weight:" + weightValue);
    const repsValue = specificRow.reps >= 1 && specificRow.reps <= 500;
    const setsValue = specificRow.sets >= 1 && specificRow.sets <= 9;

    const isRowValid = weightValue && repsValue && setsValue;
    // console.log("isRowValid:" + isRowValid);

    if (isRowValid) {
      const updatedLoadData = [...exerciseLoads];

      if (rowsData.length === 1) {
        setExerciseLoads(updatedLoadRowsData);
        console.log("For First row: " + JSON.stringify(exerciseLoads));
      } else {
        updatedLoadData.push(specificRow);
        setExerciseLoads(updatedLoadData);
        console.log("After Adding: " + JSON.stringify(exerciseLoads));
      }
    }
  };
  // const handleChangeOnBlur = (index, event) => {
  //   const { name, value } = event.target;
  //   const updatedLoadRowsData = [...loadRowsData];
  //   updatedLoadRowsData[index][name] = value;
  //   setLoadRowsData(updatedLoadRowsData);

  //   const specificRow = updatedLoadRowsData[index];
  //   console.log(
  //     "specificRow in handleChangeOnBlur:" + JSON.stringify(specificRow)
  //   );
  // };

  return (
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
          onClick={addTableRows}
        >
          <AddIcon sx={{ mr: "10px" }} />
          Add Details
        </Button>
      </div>
      <LoadTableRows
        loadRowsData={loadRowsData}
        deleteTableRows={deleteTableRows}
        handleChange={handleChange}
        isWeightValidError={isWeightValidError}
        isRepsValidError={isRepsValidError}
        isSetsValidError={isSetsValidError}
        // handleChangeOnBlur={handleChangeOnBlur}
      />
    </div>
  );
}
AddDeleteLoadTableRows.propTypes = {
  exerciseLoads: PropTypes.any.isRequired,
  setExerciseLoads: PropTypes.any.isRequired,
  rowsData: PropTypes.any.isRequired,
};
