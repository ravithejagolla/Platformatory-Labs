import { Worker } from '@temporalio/worker';
import * as activities from "../activities/sendProfileToExternalAPI";

async function runWorker() {
  const worker = await Worker.create({ 
    workflowsPath: new URL('../workflows', import.meta.url).pathname,
    activities,
    taskQueue: 'profile-task-queue'
  });

  console.log('🚀 Worker is listening on "profile-task-queue"');
  await worker.run();
}

runWorker().catch(err => console.error(err)); 
