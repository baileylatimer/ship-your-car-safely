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
  description: string
}

export interface Services {
  title: string
  description: string
  services: ServiceCard[]
}

export interface NavLink {
  text: string
  url: string
}

export interface Navbar {
  logo: SanityImage
  phoneNumber: string
  phoneIcon: SanityImage
  navLinks: NavLink[]
}

export interface TestimonialCard {
  testimonialText: string
  author: string
  image: SanityImage
}

export interface Testimonials {
  sectionTitle: string
  testimonialsList: TestimonialCard[]
}

export interface SocialLink {
  icon: SanityImage
  url: string
}

export interface Footer {
  heading: string
  buttonText: string
  paragraph: string
  socialLinks: SocialLink[]
}

export interface InfoAboutItem {
  title: string
  description: string
}

export interface InfoAbout {
  items: InfoAboutItem[]
}

export interface FaqItem {
  title: string
  description: string
}

export interface Faq {
  items: FaqItem[]
}

export interface AboutVideo {
  video: {
    asset: {
      _ref: string
      url: string
    }
  }
  coverImage: SanityImage
}

export interface LoaderData {
  process: Process
  services: Services
  navbar: Navbar
  testimonials: Testimonials
  footer: Footer
  infoAbout: InfoAbout
  faq: Faq
}
