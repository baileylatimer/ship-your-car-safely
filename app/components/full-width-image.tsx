import { urlFor } from '~/lib/sanity.image'

interface FullWidthImageProps {
  image: any
  alt: string
}

export default function FullWidthImage({ image, alt }: FullWidthImageProps) {
  return (
    <section className="w-full h-screen relative">
      <img
        src={urlFor(image).url()}
        alt={alt}
        className="w-full h-full object-cover rounded-br-[30px] rounded-bl-[30px]"
      />
    </section>
  )
}
