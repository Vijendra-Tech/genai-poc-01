import React from "react";
import AiImage from "../assets/assistant.jpg"

function AssistentImage() {
  return (
    // add cool lookking style here
    <div className="grow min-w-[70%] my-auto">
        <img
          src={AiImage}
          alt="Assistent"
          className="w-full h-[600px] rounded-lg shadow-lg left-0"
        />
      </div>
  );
}

export default AssistentImage;
