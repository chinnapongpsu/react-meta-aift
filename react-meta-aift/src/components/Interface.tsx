import React, { useEffect, useState } from "react";
import { Box, TextField, Button } from "@mui/material";

import { useCanvas } from "../contexts/CanvasContext";
import api from "../api/api";
import { ISendText, ISPathumma } from "../interfaces/api";
import { playAudioWithResampling } from "../utils/audio";
import { v4 as uuidv4 } from "uuid";

const Interface: React.FC = () => {
  const { setBlendShapes, startAnimation } = useCanvas();
  const [text, setText] = useState<string>("");
  const [contextData, setContextData] = useState<string | null>(null);
  const sessionid = uuidv4();

  useEffect(() => {
    const loadContextData = async () => {
      try {
        const res = await fetch(`${process.env.PUBLIC_URL}/context.json`);
        const json = await res.json();
        setContextData(json.devine_commady); 
      } catch (error) {
        console.error("Error loading context:", error);
      }
    };

    loadContextData();
  }, []);

  const handleSpeak = async () => {
    if (text.trim() === "") return alert("Please enter some text");
    if (!contextData) return alert("Context data is not loaded yet");

    const requests: ISPathumma = {
      context: contextData,
      prompt: text,
      sessionid: String(sessionid),
      temperature: 0.4,
    };
    
    const response = await api.postPathumma(requests);
    
    console.log(response)
    return response

  };
  
    // api
    //   .sendText(requests)
    //   .then(async (res) => {
    //     if (res.data.msg === "success") {
    //       const { wav_url, blendshape_url } = res.data;

    //       await new Promise((resolve) => setTimeout(resolve, 1000));

    //       // Fetch and set blend shapes
    //       const blendShapeResponse = await api.getBlendShapes(blendshape_url);
    //       setBlendShapes(blendShapeResponse.data);

    //       await new Promise((resolve) => setTimeout(resolve, 1000));

    //       // Fetch the audio file as a Blob and play it
    //       const audioResponse = await api.getVoice(wav_url);

    //       const audioBlob = new Blob([audioResponse.data], {
    //         type: "audio/wav",
    //       });
    //       playAudioWithResampling(audioBlob);
    //     }
    //   })
    //   .catch((e) => console.error(e))
    //   .finally(() => {
    //     setText("");
    //     startAnimation();
    //   });

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "70%",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        backgroundColor: "white",
        padding: "8px",
        borderRadius: "10px",
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        label="Enter text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button variant="contained" onClick={handleSpeak}>
        Speak
      </Button>
    </Box>
  );
};

export default Interface;