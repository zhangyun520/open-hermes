import { codexPolyphonyTasks } from '@/src/polyphony/mockData';
import { Card } from '@/components/UI';
export function CodexPolyphonyPromptGenerator() { return <div className="space-y-4">{codexPolyphonyTasks.map((task) => <Card key={task.taskId}><p className="text-xs uppercase tracking-[0.25em] text-plankton">{task.voiceTrackType}</p><h2 className="mt-2 text-xl font-semibold">{task.title}</h2><pre className="mt-3 max-h-96 overflow-auto whitespace-pre-wrap rounded-2xl bg-black/30 p-4 text-sm leading-6 text-white/70">{task.prompt}</pre></Card>)}</div>; }
