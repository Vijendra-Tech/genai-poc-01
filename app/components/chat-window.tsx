import { Input } from "#@/components/ui/input.tsx";
import { useActionData } from "@remix-run/react";
import {
  Bot,
  Croissant,
  Cross,
  DoorClosed,
  MessageSquareX,
  Mic,
  Mic2,
} from "lucide-react";
import React, { useState } from "react";
import { Grid } from "#app/components/grid.tsx";
import { AudioSubmitForm, RecordingFormData } from "./records/record-form.tsx";
import { CallRecorder } from "./records/recorder.tsx";
import WrappedAnimation from "./wrapped-animation.tsx";

type ActionData = RecordingFormData;

function ChatWindow({ setOpenChatWindow }: any) {
  const [responseAudio, setResponseAudio] = React.useState<Blob | null>(null);
  const [audio, setAudio] = React.useState<Blob | null>(null);
  const [openVoiceCtrl, setOpenVoiceCtrl] = useState<boolean>(false);
  const actionData = useActionData<ActionData>();
  return (
    <div className="flex flex-col items-center justify-center w-screen text-gray-800 z-10 min-w-[30rem] min-h-[50rem]">
      <div className="bg-orange-400 w-[30rem] md:w-[30rem] lg:w-[30rem] h-20 px-10 flex justify-start items-center">
        <Bot size={"40px"} className="mx-5" />
        <h1 className="text-2xl font-bold grow">HCBC Bot</h1>
        <MessageSquareX
          className="float-end cursor-pointer"
          onClick={() => setOpenChatWindow(false)}
        />
      </div>
      <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
          <div className="flex w-full mt-2 space-x-3 max-w-xs">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
            <div>
              <div className="bg-muted p-3 rounded-r-lg rounded-bl-lg">
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
              <span className="text-xs text-gray-500 leading-none">
                2 min ago
              </span>
            </div>
          </div>
          <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
            <div>
              <div className="bg-orange-400 text-white p-3 rounded-l-lg rounded-br-lg">
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod.
                </p>
              </div>
              <span className="text-xs text-gray-500 leading-none">
                2 min ago
              </span>
            </div>
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
          </div>
        </div>
       
        <div className="p-4 flex flex-col justify-end">
          {openVoiceCtrl && (
            <div
              style={{
                overflowY: "auto",
                scrollbarWidth: "thin",
                scrollbarColor: "var(--scrollbar-thumb) var(--scrollbar-track)",
                aspectRatio: "3/2",
              }}
            >
              <WrappedAnimation open={true}>
                <Grid
                  as="main"
                  className="w-full inset-x-0 md:w-full lg:w-full border bg-muted rounded-md shadow-md  overflow-y-auto md:overflow-y-auto lg:overflow-y-auto min-h-[200px] max-h-[200px]"
                >
                  <div className="col-span-full lg:col-span-12 lg:col-start-1 md:col-span-12 md:col-start-1 align-top">
                    {audio ? (
                      <div className="mt-0">
                        <AudioSubmitForm audio={audio} data={actionData} />
                      </div>
                    ) : (
                      <div className="top-0">
                        <CallRecorder
                          onRecordingComplete={(recording) =>
                            setAudio(recording)
                          }
                          team={"blue"}
                        />
                      </div>
                    )}
                  </div>
                </Grid>
              </WrappedAnimation>
            </div>
          )}
          <div className="relative">
            <div className="absolute  bg-white bottom-0 dark:bg-gray-800 md:w-[100%] w-full rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 h-16 right-0">
              <p className="flex justify-start ml-6 mt-2">
                Click on mic to record
              </p>
              <div
                className="absolute inset-y-0 right-1 flex items-center pr-3 cursor-pointer"
                onClick={() => {
                  setOpenVoiceCtrl(!openVoiceCtrl);
                }}
              >
                <Mic className="cursor-pointer text-orange-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

export default ChatWindow;
