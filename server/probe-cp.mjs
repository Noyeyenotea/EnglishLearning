import 'dotenv/config';
import { PostgresSaver } from '@langchain/langgraph-checkpoint-postgres';

const saver = PostgresSaver.fromConnString(process.env.AI_DATABASE_URL);
console.log('AI_DATABASE_URL set?', !!process.env.AI_DATABASE_URL);

const cfg = { configurable: { thread_id: 'user-normal' } };

const cp = await saver.get(cfg);
console.log('get() =>', cp === undefined ? 'undefined' : Object.keys(cp));

const tuple = await saver.getTuple(cfg);
console.log('getTuple() =>', tuple === undefined ? 'undefined' : {
  checkpoint_id: tuple.config?.configurable?.checkpoint_id,
  channels: Object.keys(tuple.checkpoint?.channel_values ?? {}),
  msgCount: tuple.checkpoint?.channel_values?.messages?.length,
});

let n = 0;
for await (const t of saver.list(cfg)) n++;
console.log('list() count =>', n);

process.exit(0);
