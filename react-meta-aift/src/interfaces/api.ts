export interface ISendText {
  input_text: string;
  speaker: number;
  phrase_break: number;
  audiovisual: number;
}

export interface ISPathumma {
  context: string;
  prompt: string;
  sessionid: string;
  temperature: number;
}