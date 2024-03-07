import { Input } from "#@/components/ui/input.tsx";
import { Grid } from "#app/components/grid.tsx";
import { CallRecorder } from "#app/components/records/recorder.tsx";
import { H2, H4 } from "#app/components/typography.tsx";
import { Button } from "#app/components/ui/button.tsx";
import { Link, Outlet, useRouteError } from "@remix-run/react";
import { Mic } from "lucide-react";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
  return (
    <div className="container text-center align-middle my-10 w-[50%]">
      <div className="min-h-[70vh] max-h-[70vh]">
        {openVoiceCtrl && (
          <Grid
            as="main"
            className="w-[80%] border bg-muted rounded-md shadow-md my-5 px-8 py-10 mx-auto"
          >
            <div className="col-span-full lg:col-span-12 lg:col-start-1 md:col-span-12 md:col-start-1">
              <Record slug="./" active={true} title="Make a new recording" />
              <CallRecorder
                onRecordingComplete={(recording) => setAudio(recording)}
                team={"blue"}
              />
            </div>
          </Grid>
        )}
      </div>

      <div className="relative">
        <label htmlFor="micInputId" className="float-left mx-3">
          Use your voice
        </label>
        <Input
          placeholder="Click on mic icon"
          className="w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 h-20"
          id="micInputId"
          disabled
        />
        <div
          className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer mt-5"
          onClick={() => {
            setOpenVoiceCtrl(!openVoiceCtrl);
          }}
        >
          <Mic className="cursor-pointer text-orange-400" />
        </div>
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return (
    <div>
      <Grid nested>
        <div className="col-span-6">
          <H4 as="p">{`Yikes... Something went wrong. Sorry about that.`}</H4>
          <H4 as="p" variant="secondary" className="mt-3">
            {`Want to `}
            <Link to=".">try again?</Link>
          </H4>
        </div>
        {/* <Grimmacing
          className="col-span-5 col-start-7 rounded-lg"
          aspectRatio="3:4"
        /> */}
      </Grid>
    </div>
  );
}
