import React from "react";
import AiImage from "../assets/bot-ai.png"

function AssistentImage() {
  return (
    // add cool lookking style here
    <div className="grow-0 min-w-[70%] py-10">
        <img
          src={AiImage}
          alt="Assistent"
          className="w-[600px] h-[600px] rounded-lg shadow-lg left-0"
        />
      </div>
  );
}

export default AssistentImage;
