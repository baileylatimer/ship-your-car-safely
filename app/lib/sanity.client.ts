import { createClient } from '@sanity/client';

// Create a write-capable client
export const sanityClient = createClient({
  projectId: 'uxddufsz',
  dataset: 'production',
  useCdn: false, // Set to false for write operations
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_TOKEN, // Required for write operations
});
