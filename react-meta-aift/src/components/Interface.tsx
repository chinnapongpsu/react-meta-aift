import React, { useEffect } from "react";
import { Box, TextField } from "@mui/material";
import { Send } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";

import { useCanvas } from "../contexts/CanvasContext";
import api from "../api/api";
import { ISendText } from "../interfaces/api";
import { IOptions } from "../interfaces/controller";
import { playAudioWithResampling } from "../utils/audio";
import Controller from "./Controller";

const Interface: React.FC = () => {
  const { setBlendShapes, startAnimation, selectedId } = useCanvas();

  const [question, setQuestion] = React.useState<string>("");
  const [answer, setAnswer] = React.useState<string>("");
  const [text, setText] = React.useState<string>("");

  const handleSend = async () => {
    if (question.trim() === "") return alert("Please enter some text");

    const id = uuidv4();
    const requestsChat = {
      prompt: question,
      sessionid: id,
    };

    await api.sendChat(requestsChat).then(async (res) => {
      setAnswer(JSON.stringify(res.data.response));
    });
  };

  useEffect(() => {
    if (answer.trim() === "") return;

    const requests: ISendText = {
      input_text: answer,
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
        setQuestion("");
        startAnimation();
      });
  }, [answer]);

  const handleSay = () => {
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
      onClick: handleSay,
      children: "Say!",
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
        value={selectedId === 0 ? text : question}
        onChange={(e) => {
          selectedId === 0
            ? setText(e.target.value)
            : setQuestion(e.target.value);
        }}
      />
      <Controller options={options} />
    </Box>
  );
};

export default Interface;
function uuid4() {
  throw new Error("Function not implemented.");
}
