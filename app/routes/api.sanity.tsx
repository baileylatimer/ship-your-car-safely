import { json } from "@remix-run/node";
import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'uxddufsz',
  dataset: process.env.SANITY_DATASET || 'production',
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2023-05-03',
});

if (!sanityClient.config().projectId) {
  throw new Error('Sanity Project ID is required');
}

export async function loader() {
  try {
    // Test Sanity connection first
    const config = sanityClient.config();
    if (!config.projectId) {
      throw new Error('Sanity configuration error: Missing project ID');
    }

    const query = `{
      "hero": *[_type == "hero"][0]{
        title,
        backgroundImage
      }
    }`;
    
    const data = await sanityClient.fetch(query);
    
    if (!data) {
      console.warn('No data found in Sanity');
      return json({});
    }

    return json(data);
  } catch (error) {
    console.error('Error in Sanity API route:', {
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      stack: error instanceof Error ? error.stack : undefined,
      config: sanityClient.config()
    });
    
    return json({
      error: 'Failed to fetch data',
      details: error instanceof Error ? error.message : 'Unknown error occurred',
      projectId: process.env.SANITY_PROJECT_ID || 'uxddufsz'
    }, { status: 500 });
  }
}
