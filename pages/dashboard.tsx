import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import Sidebar from "../components/Sidebar";
import OutputPanel from "../components/OutputPanel";
import ThinkingPreview from "../components/ThinkingPreview";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const auth = getAuth();

  useEffect(() => {
    auth.onAuthStateChanged((u) => {
      if (!u) window.location.href = "/";
      else setUser(u);
    });
  }, []);

  return (
    <div className="flex h-screen bg-gray-800 text-white">
      <Sidebar user={user} />
      <div className="flex-1 flex flex-col p-4 gap-4">
        <ThinkingPreview />
        <OutputPanel />
      </div>
    </div>
  );
}
