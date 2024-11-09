import requests
import json

from typing import Union
from fastapi import FastAPI, Form, File, UploadFile

app = FastAPI()

@app.post("/chat")
async def chat(prompt: str = Form(...),
               sessionid: str= Form(...)):
    context_file_path = 'context_text.txt'

    try:
        with open(context_file_path, 'r', encoding='utf-8') as file:
            context_text = file.read()
    except FileNotFoundError:
        return {"error": "context.txt not found"}

    print(context_text)
    url = "https://api.aiforthai.in.th/pathumma-chat"
    payload = {
        'prompt': prompt,
        'sessionid': sessionid, 
        'context': context_text,
        'temperature':0.7
    }

    headers = {
        'apikey': 'JY3kRvMpaatLsl4CEvfxS21Z4bAuk3Jm'

    }

    response = requests.post(url, headers=headers, data=payload)
    print(response.json)
    response_json = json.loads(response.text)
    return {"response":response_json['response']}

