import { Input } from "#@/components/ui/input.tsx";
import { Grid } from "#app/components/grid.tsx";
import { CallRecorder } from "#app/components/records/recorder.tsx";
import { H2, H4 } from "#app/components/typography.tsx";
import { Button } from "#app/components/ui/button.tsx";
import { Link, Outlet, useActionData, useLoaderData, useRouteError } from "@remix-run/react";
import {
  Angry,
  BotIcon,
  LucideVoicemail,
  MessageCircleCodeIcon,
  Mic,
  MicIcon,
  Voicemail,
  VoicemailIcon,
} from "lucide-react";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AudioSubmitForm,
  RecordingFormData,
} from "#app/components/records/record-form.tsx";
import { ActionFunction, json, redirect } from "@remix-run/node";
import {
  Lottie,
  getDomainUrl,
  getErrorForAudio,
  getErrorForLanguage,
  getErrorMessage,
  getNonNull,
} from "#app/utils/misc.tsx";
import { audioTotext, readFileAsBlob, textSpeech } from "#app/utils/llms.server.ts";
import LLMAPIResponseUI from "#app/components/response-ui.tsx";
import ChatWindow from "#app/components/chat-window.tsx";
import AssistentImage from "#app/components/assistent-image.tsx";
import AiDesc from "#app/components/ai-desc.tsx";
import path from 'path'
import TabSection from "#app/components/tabs-section.tsx";
import { loadgithubFiles } from "#app/utils/code.server.ts";
import roboData from "#app/animation/bot.json";
import LT from "lottie-react";

type ActionData = RecordingFormData;

export const action: ActionFunction = async ({ request }) => {
  const actionData: ActionData = { fields: {}, errors: {} };
  const domainUrl = getDomainUrl(request);
  try {
    const requestText = await request.text();
    const form = new URLSearchParams(requestText);

    const formData = {
      audio: form.get("audio"),
      language: form.get("language"),
      audioUrl: form.get("audioUrl"),
    };
    actionData.fields = {
      language: formData.language,
    };

    actionData.errors = {
      audio: getErrorForAudio(formData.audio),
      language: getErrorForLanguage(formData.language),
    };

    if (Object.values(actionData.errors).some((err) => err !== null)) {
      return json(actionData, 401);
    }

    const { audio, language, audioUrl } = getNonNull(formData);
    const apiResponse = await audioTotext(audio, language);
    if (typeof apiResponse === 'string') {
      await textSpeech(apiResponse)
    }
    // Usage
    const fileBlob = await readFileAsBlob("");

    console.log("----", apiResponse);

    return json({ msg: apiResponse, audio, fileBlob });
  } catch (error: unknown) {
    actionData.errors.generalError = getErrorMessage(error);
    return json(actionData, 500);
  }
};

function MaybeOutlet({ open }: { open: boolean }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          variants={{
            collapsed: {
              height: 0,
              marginTop: 0,
              marginBottom: 0,
              opacity: 0,
            },
            expanded: {
              height: "auto",
              marginTop: "1rem",
              marginBottom: "3rem",
              opacity: 1,
            },
          }}
          initial="collapsed"
          animate="expanded"
          exit="collapsed"
          transition={{ duration: 0.15 }}
          className="relative col-span-full"
        >
          <Outlet />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function Record({
  active,
  title,
  slug,
}: {
  slug: string;
  active: boolean;
  title: string;
}) {
  return (
    <Grid nested className="border-b border-gray-200 dark:border-gray-600">
      <Link
        to={active ? "./" : slug}
        className="text-primary group relative col-span-full flex flex-col py-5 text-xl font-medium focus:outline-none"
      >
        <div className="bg-secondary absolute -inset-px -mx-6 hidden rounded-lg group-hover:block group-focus:block" />
        <span className="relative">{title}</span>
      </Link>
      <div className="col-span-full">
        <MaybeOutlet open={true} />
      </div>
    </Grid>
  );
}

export default function Index() {
  const [responseAudio, setResponseAudio] = React.useState<Blob | null>(null);
  const [audio, setAudio] = React.useState<Blob | null>(null);
  const [openVoiceCtrl, setOpenVoiceCtrl] = useState<boolean>(false);
  const actionData = useActionData<ActionData>();
  const [openChatWindow, setOpenChatWindow] = useState(false);
  const Lottie = LT.default;

  return (
    <div className="container">
      <div className="flex flex-row justify-between items-center">
        <AiDesc />
        <Lottie animationData={roboData} loop={true} className="w-[720px] h-[720px]" />
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <div>
      <div className="flex justify-center bg-orange-400 items-center mt-80 w-full">
        <Angry size={'40px'} />
        <H4 as="p">{`Yikes... Something went wrong. Sorry about that.`}</H4>
        <H4 as="p" variant="secondary" className="mt-10">
          {`Want to `}
          <Link to=".">try again?</Link>
        </H4>
      </div>

    </div>
  );
}
