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
    <div className="flex flex-col items-center justify-center w-screen min-h-[50rem] md:min-h-[50rem] lg:min-h-[50rem] text-gray-800 p-10">
      <div className="bg-orange-400 w-[36rem] h-20 px-10 flex justify-start items-center">
        <Bot size={"40px"} className="mx-5" />
        <h1 className="text-2xl font-bold grow">HCBC Boat</h1>
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
                className="w-full md:w-full lg:w-full  border bg-muted rounded-md shadow-md my-5 px-8 py-10 mx-auto overflow-y-auto md:overflow-y-auto lg:overflow-y-auto max-h-[50vh] md:max-h-[50vh] lg:max-h-[50vh]"
              >
                <div className="col-span-full lg:col-span-12 lg:col-start-1 md:col-span-12 md:col-start-1">
                  {audio ? (
                    <AudioSubmitForm audio={audio} data={actionData} />
                  ) : (
                    <div className="">
                      <CallRecorder
                        onRecordingComplete={(recording) => setAudio(recording)}
                        team={"blue"}
                      />
                    </div>
                  )}
                </div>
              </Grid>
            </WrappedAnimation>
          </div>
        )}

        <div className="bg-gray-300 p-4 flex flex-col justify-end relative h-16">
          {/* <Input className="flex items-center h-10 w-full rounded px-3 text-sm" type="text" placeholder="Type your message…" /> */}
          <div className="absolute  bg-white top-0 dark:bg-gray-800 py-2 md:w-[100%] w-full rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 h-16 right-0">
            <p className="flex justify-start ml-6 mt-2">
              Click on mic to record
            </p>
            <div
              className="absolute inset-y-0 right-1 flex items-center pr-3 cursor-pointer mt-1"
              onClick={() => {
                setOpenVoiceCtrl(!openVoiceCtrl);
              }}
            >
              <Mic className="cursor-pointer text-orange-400" />
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

export default ChatWindow;
