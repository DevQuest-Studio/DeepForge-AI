import type { NextApiRequest, NextApiResponse } from "next";
import { streamCompletion } from "../../lib/aiRouter";
import { useTickets } from "../../lib/firestore";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { uid, task, prompt, template } = req.body;

  // Map coût tickets
  const costMap: Record<string, number> = { lua: 4, microcontroller: 6, vehicle: 10, edit: 2, thinking: 1, chat: 1 };
  const cost = costMap[task] || 1;

  const canUse = await useTickets(uid, cost);
  if (!canUse) return res.status(403).json({ error: "Ticket limit reached" });

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  let output = "";
  let messages: any[] = [
    { role: "system", content: `You are DeepForge AI. Task: ${task}. Generate valid output only.` },
    { role: "user", content: prompt },
  ];

  // Inject template if provided
  if (template) {
    messages.push({ role: "user", content: `Use this template as reference:\n${template}` });
  }

  await streamCompletion(task, messages, (token) => {
    output += token;
    res.write(`data: ${token}\n\n`);
  });

  res.end();
}
