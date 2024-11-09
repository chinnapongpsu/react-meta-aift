import React from "react";
import { Box } from "@mui/material";

import Viewer from "./components/Viewer";
import Interface from "./components/Interface";

const App: React.FC = () => (
  <Box sx={{ width: "100vw", height: "100vh", position: "relative" }}>
    <Viewer />

    <Interface />
  </Box>
);

export default App;
