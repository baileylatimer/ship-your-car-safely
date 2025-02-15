import { urlFor } from '~/lib/sanity.image'

interface ImagesAboutProps {
  images?: {
    asset: {
      _ref: string
    }
  }[]
}

export default function ImagesAbout({ images }: ImagesAboutProps) {
  return (
    <div className="relative mt-20 mb-20">
      <div className="flex flex-col lg:block relative lg:h-[986px]">
        {images?.map((image, index) => (
          <div
            key={index}
            className={`relative w-full lg:absolute lg:w-[742px] ${
              index === 0
                ? 'lg:left-0 lg:top-10'
                : 'mt-8 lg:mt-0 lg:right-0 lg:top-[493px]'
            }`}
          >
            <img
              src={urlFor(image).url()}
              alt={`About image ${index + 1}`}
              className="h-auto w-full rounded-[30px] object-cover"
              style={{
                aspectRatio: '742/493'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
