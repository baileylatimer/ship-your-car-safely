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

export interface LoaderData {
  process: Process
}
