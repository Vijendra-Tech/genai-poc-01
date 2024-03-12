import { json } from "@remix-run/node";
import fs from "fs";
import OpenAI from "openai";
import { createObjectURL, base64StringToBlob } from "blob-util";
import { eventStream } from "remix-utils/sse/server";
import path from 'path'

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
      file: fs.createReadStream(path.join(process.cwd(),"/app/audios/speech.mp3")),
      model: "whisper-1",
      response_format: "text",
      language: language,
      
    });
    if (transcription) {
       console.log("transcription", transcription);
       return transcription;
    }
  } catch (error) {
    console.log("error occured", error);

    return json({ error }, 500);
  }
}

export async function textSpeech(input:string) {
    const speechFile = path.resolve(path.join(process.cwd(),"./tmp/bot-speech.mp3"));
    const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    input: input
  });
   const buffer = Buffer.from(await mp3.arrayBuffer());
   await fs.promises.writeFile(speechFile, buffer);
   
}

export const readFileAsBlob = async (filePath: string): Promise<string> => {
  const speechFile = path.resolve(path.join(process.cwd(),"./tmp/bot-speech.mp3"))
  return new Promise((resolve, reject) => {
    fs.readFile(speechFile, (error, data) => {
      if (error) {
        reject(error);
      } else {
        const type ='data:audio/mp3;base64,'
        resolve(type+Buffer.from(data).toString('base64'));
      }
    });
  });
};
