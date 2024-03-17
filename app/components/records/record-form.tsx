import { Button } from "#@/components/ui/button.tsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "#@/components/ui/select.tsx";
import { Form, useSubmit } from "@remix-run/react";
import React from "react";

type RecordingFormData = {
  fields: {
    audio?: never;
    language?: string | null;
    msg?: string,
    question?: string
  };
  errors: {
    generalError?: string;
    audio?: string | null;
    language?: string | null;
    question?: string | null
  };
};

function AudioSubmitForm({
  audio,
  data,
  additionalFields,
  reset,
  setStages
}: {
  audio: Blob;
  data?: RecordingFormData;
  additionalFields?: React.ReactElement;
  reset: any,
  setStages: any
}) {
  const audioURL = React.useMemo(() => {
    return window.URL.createObjectURL(audio);
  }, [audio]);

  const submit = useSubmit();
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const reader = new FileReader();
    setStages((prev: any) => ({
      one: true
    }))
    reader.readAsDataURL(audio);
    reader.addEventListener(
      "loadend",
      () => {
        if (typeof reader.result === "string") {
          form.append("audio", reader.result);
          submit(form, {
            method: "POST",
          });
        }
      },
      { once: true }
    );
  }

  return (
    <div>
      <div className="">
        {data?.errors?.generalError ? (
          <p id="audio-error-message" className="text-center text-red-500">
            {data.errors.generalError}
          </p>
        ) : null}
        {data?.errors?.audio ? (
          <p id="audio-error-message" className="text-red-600 text-center">
            {data.errors.audio}
          </p>
        ) : null}
      </div>
      <Form onSubmit={handleSubmit}>
        <div className="flex justify-center flex-col gap-1 items-center">
          <input type="hidden" name="audioUrl" value={audioURL} />
          {audioURL ? (
            <div className="">
              <audio
                src={audioURL}
                controls
                preload="metadata"
                aria-describedby="audio-error-message"
              />
            </div>
          ) : (
            "loading..."
          )}
          <Select name="language">
            <SelectTrigger className="w-72">
              <SelectValue placeholder="Select a Language for bot response" />
            </SelectTrigger>
            <SelectContent className="w-40 bg-muted">
              <SelectGroup >
                <SelectLabel>Languages</SelectLabel>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">Hindi</SelectItem>
                <SelectItem value="ta">Tamil</SelectItem>
                <SelectItem value="bn">Bangoli</SelectItem>
                <SelectItem value="kn">Kannada</SelectItem>
                <SelectItem value="te">Telugu</SelectItem>
                <SelectItem value="ml">Malayalam</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="flex flex-row gap-2">
            <Button type="submit" className="">
              Submit Query
            </Button>
            <Button type="button" className="" onClick={() => reset(null)}>
              Reset
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}

export type { RecordingFormData };
export { AudioSubmitForm };
