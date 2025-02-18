import imageUrlBuilder from '@sanity/image-url';
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'uxddufsz',
  dataset: 'production',
  useCdn: true,
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
