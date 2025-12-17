import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import Sidebar from "../components/Sidebar";
import OutputPanel from "../components/OutputPanel";
import ThinkingPreview from "../components/ThinkingPreview";
import FileUpload from "../components/FileUpload";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [prompt, setPrompt] = useState("");
  const [template, setTemplate] = useState("");
  const [task, setTask] = useState("vehicle");
  const auth = getAuth();

  useEffect(() => {
    auth.onAuthStateChanged((u) => {
      if (!u) window.location.href = "/";
      else setUser(u);
    });
  }, []);

  const handleGenerate = async () => {
    const evtSource = new EventSource(`/api/ai?uid=${user.uid}&task=${task}&prompt=${encodeURIComponent(prompt)}&template=${encodeURIComponent(template)}`);
    // TODO: Stream output to OutputPanel
  };

  return (
    <div className="flex h-screen bg-gray-800 text-white">
      <Sidebar user={user} />
      <div className="flex-1 flex flex-col p-4 gap-4">
        <ThinkingPreview />
        <FileUpload onFile={(content) => setTemplate(content)} />
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full h-32 p-2 rounded bg-gray-700"
          placeholder="Enter your prompt here..."
        />
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-600 rounded" onClick={handleGenerate}>
            Generate
          </button>
          <select className="bg-gray-700 rounded p-2" value={task} onChange={(e) => setTask(e.target.value)}>
            <option value="vehicle">Vehicle</option>
            <option value="microcontroller">Microcontroller</option>
            <option value="lua">Lua Touchscreen</option>
          </select>
        </div>
        <OutputPanel />
      </div>
    </div>
  );
}
