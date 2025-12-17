import { useState } from "react";

export default function ThinkingPreview() {
  const [preview, setPreview] = useState("Waiting for AI reasoning...");

  return (
    <div className="bg-gray-600 p-3 rounded mb-2">
      <h3 className="font-bold mb-1">Thinking Preview</h3>
      <p>{preview}</p>
    </div>
  );
}
