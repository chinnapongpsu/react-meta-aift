import React from "react";
import { Box, TextField } from "@mui/material";
import { Send } from "@mui/icons-material";

import { useCanvas } from "../contexts/CanvasContext";
import api from "../api/api";
import { ISendText } from "../interfaces/api";
import { IOptions } from "../interfaces/controller";
import { playAudioWithResampling } from "../utils/audio";
import Controller from "./Controller";

const Interface: React.FC = () => {
  const { setBlendShapes, startAnimation } = useCanvas();

  const [text, setText] = React.useState<string>("");

  const handleSend = () => {
    if (text.trim() === "") return alert("Please enter some text");

    const requests: ISendText = {
      input_text: text,
      speaker: 0,
      phrase_break: 0,
      audiovisual: 1,
    };

    api
      .sendText(requests)
      .then(async (res) => {
        if (res.data.msg === "success") {
          const { wav_url, blendshape_url } = res.data;

          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Fetch and set blend shapes
          const blendShapeResponse = await api.getBlendShapes(blendshape_url);
          setBlendShapes(blendShapeResponse.data);

          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Fetch the audio file as a Blob and play it
          const audioResponse = await api.getVoice(wav_url);
          const audioBlob = new Blob([audioResponse.data], {
            type: "audio/wav",
          });
          playAudioWithResampling(audioBlob);
        }
      })
      .catch((e) => console.error(e))
      .finally(() => {
        setText("");
        startAnimation();
      });
  };

  const options: IOptions[] = [
    {
      id: 0,
      children: "Say hi!",
    },
    {
      id: 1,
      startIcon: <Send />,
      onClick: handleSend,
      children: "Send",
    },
  ];

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: "20px",
        left: "10%",
        width: "80%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        gap: 2,
        backgroundColor: "white",
        padding: 1.6,
        borderRadius: 4,
      }}
    >
      <TextField
        style={{ width: "80%" }}
        variant="outlined"
        label="Enter message"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Controller options={options} />
    </Box>
  );
};

export default Interface;
