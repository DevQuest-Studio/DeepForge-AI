import type { NextApiRequest, NextApiResponse } from "next";
import { streamCompletion } from "../../lib/aiRouter";
import { useTickets, getUserData } from "../../lib/firestore";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { uid, task, prompt } = req.body;

  // Check tickets
  const costMap = { build: 10, lua: 4, thinking: 1, chat: 1 };
  const cost = costMap[task] || 1;

  const canUse = await useTickets(uid, cost);
  if (!canUse) return res.status(403).json({ error: "Ticket limit reached" });

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  let output = "";
  await streamCompletion(task, [
    { role: "system", content: `You are DeepForge AI, task: ${task}. Generate only valid output.` },
    { role: "user", content: prompt },
  ], (token) => {
    output += token;
    res.write(`data: ${token}\n\n`);
  });

  res.end();
}
