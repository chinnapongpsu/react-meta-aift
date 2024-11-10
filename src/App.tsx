import React from "react";
import { Box } from "@mui/material";

import CanvasProvider from "./contexts/CanvasContext";
import Viewer from "./components/Viewer";
import Interface from "./components/Interface";

const App: React.FC = () => (
  <Box sx={{ width: "100vw", height: "100vh" }}>
    <CanvasProvider>
      <Viewer />
      <Interface />
    </CanvasProvider>
  </Box>
);

export default App;
