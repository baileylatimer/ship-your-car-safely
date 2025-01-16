import imageUrlBuilder from '@sanity/image-url';
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'uxddufsz',
  dataset: process.env.SANITY_DATASET || 'production',
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2023-05-03',
});

const builder = imageUrlBuilder(client);

interface SanityImage {
  asset: {
    _ref: string;
  };
}

export function urlFor(source: SanityImage) {
  return builder.image(source);
}
