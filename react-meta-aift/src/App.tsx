import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import axios from 'axios';
import Viewer from './components/Viewer';

const API_URL = 'https://api.aiforthai.in.th/vaja9/synth_audiovisual';
const API_KEY = 'UBnDefMF0Zzcn1IozoxL3Gll3nti8K1Q';

const App: React.FC = () => {
  const [text, setText] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  // Function to call the API, download the audio, and play it
  const handleSpeak = async () => {
    if (text.trim() === '') {
      alert('Please enter some text');
      return;
    }

    try {
      const response = await axios.post(
        API_URL,
        {
          input_text: text,
          speaker: 0, // Male voice
          phrase_break: 0, // Auto phrase break
          audiovisual: 0, // Audio only
        },
        {
          headers: {
            'Apikey': API_KEY,
            'Content-Type': 'application/json',
          },
        }
      );

      // Check if the response is successful
      if (response.data.msg === 'success') {
        const { wav_url } = response.data;
        console.log(wav_url);

        // Wait for 1 second before fetching the audio file
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Fetch the audio file as a Blob
        const audioResponse = await axios.get(wav_url, {
          headers: { 'Apikey': API_KEY },
          responseType: 'blob',
        });

        // Play the audio
        playAudioWithResampling(audioResponse.data);
      } else {
        console.error('API Error:', response.data);
      }
    } catch (error) {
      console.error('Error fetching audio:', error);
    }
  };

  // Function to resample and play audio
  const playAudioWithResampling = async (audioBlob: Blob) => {
    const audioContext = new (window.AudioContext)();
    const arrayBuffer = await audioBlob.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start();
  };

  return (
    <Box sx={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Viewer />
      <Box
        sx={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '70%',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'white',
          padding: '8px',
          borderRadius: '10px',
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          label="Enter text"
          value={text}
          onChange={handleInputChange}
        />
        <Button variant="contained" onClick={handleSpeak}>
          Speak
        </Button>
      </Box>
    </Box>
  );
};

export default App;
