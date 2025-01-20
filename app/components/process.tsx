import { useLoaderData } from '@remix-run/react'
import { urlFor } from '~/lib/sanity.image'
import type { LoaderData, ProcessCard } from '~/types/sanity'

export default function Process() {
  const { process } = useLoaderData<LoaderData>()

  if (!process?.processCards?.length) {
    return null
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {process.processCards.map((card: ProcessCard, index: number) => (
          <div
            key={card.title}
            className={`p-8 rounded-lg ${
              index === 0
                ? 'bg-[#17283D] text-white'
                : 'bg-gray-100 text-[#17283D]'
            }`}
          >
            {card.icon && (
              <img
                src={urlFor(card.icon).width(64).height(64).url()}
                alt=""
                className="w-16 h-16 mb-6"
              />
            )}
            <h2 className="text-3xl font-bold mb-4">{card.title}</h2>
            <hr className={`my-4 ${index === 0 ? 'border-white' : 'border-gray-300'}`} />
            <p className="text-lg">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
