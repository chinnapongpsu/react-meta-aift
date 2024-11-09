import React, { useCallback } from "react";
import { Box, TextField, Button } from "@mui/material";

import api from "../api/api";
import { ISendText } from "../interfaces/api";
import { playAudioWithResampling } from "../utils/audio";

const Interface: React.FC = () => {
  const [text, setText] = React.useState<string>("");

  const handleSpeak = useCallback(() => {
    if (text?.trim() === "") return alert("Please enter some text");

    const requests: ISendText = {
      input_text: text,
      speaker: 0,
      phrase_break: 0,
      audiovisual: 0,
    };

    api
      .sendText(requests)
      .then(async (res) => {
        if (res.data.msg === "success") {
          const { wav_url } = res.data;
          console.log(wav_url);

          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Fetch the audio file as a Blob
          const audioResponse = await api.getVoice(wav_url);

          // Create a Blob from the response data and play the audio
          const audioBlob = new Blob([audioResponse.data], {
            type: "audio/wav",
          });
          playAudioWithResampling(audioBlob);
        }
      })
      .catch((e) => console.error(e))
      .finally(() => setText(""));
  }, []);

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
