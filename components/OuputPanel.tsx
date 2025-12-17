import { useState, useEffect } from "react";

export default function OutputPanel({ stream }: { stream?: string }) {
  const [output, setOutput] = useState("");

  useEffect(() => {
    if (stream) setOutput((prev) => prev + stream);
  }, [stream]);

  return (
    <div className="flex-1 bg-gray-700 p-4 rounded overflow-auto">
      <h3 className="text-lg font-bold mb-2">Output</h3>
      <pre className="whitespace-pre-wrap">{output}</pre>
    </div>
  );
}
