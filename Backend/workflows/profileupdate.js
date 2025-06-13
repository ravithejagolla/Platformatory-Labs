import { proxyActivities } from '@temporalio/workflow';
import * as activities from "../activities/sendProfileToExternalAPI";

const { sendProfileToExternalAPI } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1minute',
});

// The workflow simply calls the activity
export async function updateProfileWorkflow(id, profile) {
  await sendProfileToExternalAPI(id, profile);
}
