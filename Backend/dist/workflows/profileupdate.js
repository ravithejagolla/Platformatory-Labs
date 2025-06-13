import { proxyActivities } from '@temporalio/workflow';
const { sendProfileToExternalAPI } = proxyActivities({
    startToCloseTimeout: '1minute',
});
// The workflow simply calls the activity
export async function updateProfileWorkflow(id, profile) {
    await sendProfileToExternalAPI(id, profile);
}
