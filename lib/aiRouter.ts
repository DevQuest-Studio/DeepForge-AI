import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(process.env.HF_TOKEN!);

type TaskType = "build" | "lua" | "thinking" | "chat";

function pickModel(task: TaskType, fallback = false) {
  if (fallback) return "Qwen/Qwen3-4B-Thinking-2507";

  switch (task) {
    case "build":
    case "lua":
      return "Qwen/Qwen3-Coder-480B-A35B-Instruct";
    case "thinking":
    case "chat":
      return "Qwen/Qwen2.5-7B-Instruct";
    default:
      return "Qwen/Qwen2.5-7B-Instruct";
  }
}

export async function streamCompletion(
  task: TaskType,
  messages: any[],
  onToken: (token: string) => void
) {
  let model = pickModel(task);

  try {
    const stream = client.chatCompletionStream({ model, messages });
    for await (const chunk of stream) {
      const delta = chunk.choices?.[0]?.delta?.content;
      if (delta) onToken(delta);
    }
  } catch (err) {
    console.warn("Primary model failed, using fallback");

    const fallbackModel = pickModel(task, true);
    const stream = client.chatCompletionStream({ model: fallbackModel, messages });

    for await (const chunk of stream) {
      const delta = chunk.choices?.[0]?.delta?.content;
      if (delta) onToken(delta);
    }
  }
}
