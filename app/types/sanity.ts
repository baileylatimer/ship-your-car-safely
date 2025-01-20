export interface SanityImage {
  asset: {
    _ref: string;
  };
}

export interface Hero {
  title: string;
  backgroundImage: SanityImage;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Statistics {
  heading: string;
  description: string;
  stats: Stat[];
}

export interface VideoSection {
  title: string;
  videoUrl: string;
  coverImage: SanityImage;
}

export interface LoaderData {
  hero: Hero | null;
  statistics: Statistics | null;
  videoSection: VideoSection | null;
  error: string | null;
}
