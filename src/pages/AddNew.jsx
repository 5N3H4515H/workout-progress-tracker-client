// import React, { useState } from "react";
// import {
//   Box,
//   IconButton,
//   Typography,
//   useTheme,
//   Button,
//   Paper,
//   TextField,
//   Modal,
// } from "@mui/material";
// import { tokens } from "../theme";
// import Header from "../components/Header";
// import AddIcon from "@mui/icons-material/Add";
// import ChartForm from "./ChartForm";

// export default function AddNew() {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const [overlay, setOverlay] = useState(false);
//   const [chartPopper, setChartPopper] = useState(false);
//   const [editingChart, setEditingChart] = useState(undefined);

//   const handleClose = () => {
//     setEditingChart(undefined);
//     setChartPopper(false);
//     setOverlay(false);
//   };

//   return (
//     <>
//       <Box m="20px">
//         {/* HEADER */}
//         <Box display="flex" justifyContent="space-between" alignItems="center">
//           <Header title="Create a New Entry" subtitle="" />
//           <Box>
//             <Button
//               disabled={overlay}
//               sx={{
//                 backgroundColor: colors.blueAccent[700],
//                 color: colors.grey[100],
//                 fontSize: "14px",
//                 fontWeight: "bold",
//                 padding: "10px 20px",
//               }}
//               onClick={() => {
//                 setChartPopper(true);
//                 setOverlay(true);
//               }}
//             >
//               <AddIcon sx={{ mr: "10px" }} />
//               Add Data
//             </Button>
//           </Box>
//         </Box>
//       </Box>
//       {/* <Paper style={{ position: "relative" }} mt="md">
//         <Box
//           component="form"
//           sx={{
//             "& .MuiTextField-root": { m: 1, width: "25ch" },
//             margin: "16px",
//           }}
//           noValidate
//           autoComplete="off"
//         >
//           <div>
//             <TextField
//               required
//               id="outlined-required"
//               label="Body Part"
//               defaultValue="Legs & Forearms"
//             />
//             <TextField
//               id="outlined-number"
//               label="Number"
//               type="number"
//               InputLabelProps={{
//                 shrink: true,
//               }}
//             />
//           </div>
//         </Box>

//         <Button
//           sx={{
//             backgroundColor: colors.blueAccent[700],
//             color: colors.grey[100],
//             fontSize: "14px",
//             fontWeight: "bold",
//             padding: "10px 20px",
//             margin: "10px",
//           }}
//         >
//           Submit
//         </Button>
//         <Button
//           sx={{
//             backgroundColor: colors.blueAccent[700],
//             color: colors.grey[100],
//             fontSize: "14px",
//             fontWeight: "bold",
//             padding: "10px 20px",
//             margin: "10px",
//           }}
//         >
//           Reset
//         </Button>
//       </Paper> */}
//       <Modal
//         open={chartPopper}
//         onClose={handleClose}
//         aria-labelledby="meal-modal"
//       >
//         <Paper
//           style={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             padding: 16,
//           }}
//         >
//           <h2>{editingChart ? "Update Your Chart" : "Add New Chart"}</h2>
//           <ChartForm
//             isEditing={Boolean(editingChart)}
//             editingItem={editingChart}
//             onClose={handleClose}
//           />
//         </Paper>
//       </Modal>
//     </>
//   );
// }
