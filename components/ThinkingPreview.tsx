import { useState, useEffect } from "react";

export default function ThinkingPreview({ preview }: { preview?: string }) {
  const [text, setText] = useState(preview || "Waiting for AI reasoning...");

  useEffect(() => {
    if (preview) setText(preview);
  }, [preview]);

  return (
    <div className="bg-gray-600 p-3 rounded mb-2">
      <h3 className="font-bold mb-1">Thinking Preview</h3>
      <p>{text}</p>
    </div>
  );
}
