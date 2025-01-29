export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
}

export interface ProcessCard {
  icon: SanityImage
  title: string
  description: string
}

export interface Process {
  processCards: ProcessCard[]
}

export interface ServiceCard {
  title: string
  image: SanityImage
  flipContent: string
}

export interface Services {
  title: string
  description: string
  services: ServiceCard[]
}

export interface LoaderData {
  process: Process
  services: Services
}
