import env from 'dotenv'
env.config()
export async function sendProfileToExternalAPI(id, profile) {
  console.log('🚀 Simulating sending profile to external API with CRUDCRUD');
  // Here you can do:
  await fetch(`${process.env.CRUDCRUD_ENDPOINT}/profiles/${id}`,
  { method:'PUT', body: JSON.stringify(profile), headers:{'Content-Type': 'application/json'}} )
  return true;
}
