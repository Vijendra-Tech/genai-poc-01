import { json } from "@remix-run/node";
import fs from "fs";
import OpenAI from "openai";
import { createObjectURL, base64StringToBlob } from "blob-util";
import { eventStream } from "remix-utils/sse/server";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});
//@ts-ignore
const saveBase64AsMP3 = (base64Data, filename, folderPath) => {
  const decodedData = Buffer.from(
    base64Data.replace("data:audio/mp3;base64,",""),
    "base64"
  );

  const fullPath = `${folderPath}/${filename}.mp3`; // Construct full path

  try {
    // Create folder if it doesn't exist
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    fs.writeFileSync(fullPath, decodedData, { encoding: "binary" });
    console.log("File saved successfully:", fullPath);
  } catch (error) {
    console.error("Error saving file:", error);
  }
};
export async function audioTotext(audio: string,language:string) {
  console.log("LLM server got called");
  const controller = new AbortController();

  try {
    saveBase64AsMP3(audio,'speech','./app/audios')
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream("./app/audios/speech.mp3"),
      model: "whisper-1",
      response_format: "text",
      language: language,
      
    });
    if (transcription) {
       console.log("transcription", transcription.text);
       return transcription.text;
    }
  } catch (error) {
    console.log("error occured", error);

    return json({ error }, 500);
  }
}
