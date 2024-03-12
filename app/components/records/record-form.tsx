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
    msg?:string
  };
  errors: {
    generalError?: string;
    audio?: string | null;
    language?: string | null;
  };
};

function AudioSubmitForm({
  audio,
  data,
  additionalFields,
}: {
  audio: Blob;
  data?: RecordingFormData;
  additionalFields?: React.ReactElement;
}) {
  const audioURL = React.useMemo(() => {
    return window.URL.createObjectURL(audio);
  }, [audio]);

  const submit = useSubmit();
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const reader = new FileReader();
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
      <div className="mb-12">
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
        <div className="flex justify-center flex-col gap-3 items-center">
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
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="float-end mr-32 mt-2">
          Submit Query
        </Button>
      </Form>
    </div>
  );
}

export type { RecordingFormData };
export { AudioSubmitForm };
