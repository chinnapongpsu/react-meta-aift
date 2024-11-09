import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import api from "../api/api";
import   "../../public/context.txt";
const PathummaComponent = () => {
  const [prompt, setPrompt] = useState("");
  const [contextData, setContextData] = useState(""); // สถานะสำหรับ context
  const [response, setResponse] = useState(null);
  const sessionid = uuidv4(); // สร้าง sessionid


  useEffect(() => {
    const loadContextData = async () => {
      try {
        const res = await fetch(`${process.env.PUBLIC_URL}/context.json`);
        const json = await res.json();
        setContextData(json.devine_commady); // ใช้เนื้อหาจาก `devine_commady`
      } catch (error) {
        console.error("Error loading context:", error);
      }
    };

    loadContextData();
  }, []); 
  
  const handleSubmit = async () => {
    try {
      const requests = {
        context: contextData,
        prompt: prompt,
        sessionid: sessionid,
        temperature: 0.4,
      };
      
      const res = await api.getPathuma(requests);
      console.log(res)
    } catch (error) {
      console.error("Error calling Pathumma API:", error);
      
    }
  };

  return (
    <div>
      <h1>Pathumma Chat</h1>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt"
      />
      <button onClick={handleSubmit}>Send</button>

      {response && (
        <div>
          <h3>Response from Pathumma:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};


export default PathummaComponent;
