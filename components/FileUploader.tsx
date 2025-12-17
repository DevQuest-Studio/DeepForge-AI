import { useState } from "react";

export default function FileUpload({ onFile }: { onFile: (content: string) => void }) {
  const [fileName, setFileName] = useState("");

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      onFile(text);
    };
    reader.readAsText(file);
  };

  return (
    <div className="mb-2">
      <input type="file" accept=".lua,.xml" onChange={handleFile} className="text-sm" />
      {fileName && <p className="text-xs mt-1">Selected: {fileName}</p>}
    </div>
  );
}
