import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import { Box, useTheme, Button, TextField, Typography } from "@mui/material";
import { tokens } from "../theme";
import EditIcon from "@mui/icons-material/Edit";

export default function ProgressDetails() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const progress = useSelector((state) => state.progress.progress);
  const { id } = useParams();
  const selectedProgress = progress.find((row) => row.id === Number(id));
  console.log("Selected Row: ", selectedProgress);

  if (!selectedProgress) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header display="flex" title={selectedProgress.bodyPart} />
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={() => {
              navigate(`/update/${selectedProgress.id}`);
            }}
          >
            <EditIcon
              sx={{
                fontSize: "20px",
                color: colors.greenAccent[500],
                mr: "10px",
              }}
            />
            Edit
          </Button>
        </Box>
        {/* Render child data here */}
        {selectedProgress.exerciseNames.map((exercise) => (
          <div key={exercise.id}>
            <Typography
              variant="h5"
              fontWeight="600"
              color={colors.grey[100]}
              marginBottom="10px"
            >
              {exercise.exerciseName}
            </Typography>
            {/* Render exercise loads here */}
            {exercise.exerciseLoads.map((load) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
                key={load.id}
              >
                <div>
                  <TextField
                    disabled
                    style={{ margin: "10px" }}
                    type="number"
                    label="Weight"
                    value={load.weight}
                    placeholder="0"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      min: 0,
                      max: 1000,
                    }}
                    focused={false}
                    name="weight"
                    variant="outlined"
                  />
                  <TextField
                    disabled
                    style={{ margin: "10px" }}
                    type="number"
                    label="Reps"
                    value={load.reps}
                    placeholder="0"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      min: 1,
                      max: 500,
                    }}
                    focused={false}
                    name="reps"
                    variant="outlined"
                  />
                  <TextField
                    disabled
                    style={{ margin: "10px" }}
                    type="number"
                    label="Sets"
                    value={load.sets}
                    placeholder="0"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      min: 1,
                      max: 9,
                    }}
                    focused={false}
                    name="sets"
                    variant="outlined"
                  />
                  <TextField
                    disabled
                    style={{ margin: "10px" }}
                    type="text"
                    label="Notes"
                    value={load.notes !== null ? load.notes : "..."}
                    placeholder="..."
                    InputLabelProps={{
                      shrink: true,
                    }}
                    focused={false}
                    name="notes"
                    variant="outlined"
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </Box>
    </div>
  );
}
