import { Services } from '~/types/sanity'
import { urlFor } from '~/lib/sanity.image'

export default function ServicesSection({ title, description, services }: Services) {
  return (
    <section className="bg-[#17283d] text-[#C8D6E6] px-10 py-[100px]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-4 gap-[10px] [&>*]:mb-[10px]">
          {/* First row: Title/description + 2 cards */}
          <div className="col-span-2">
            <h1 className="text-6xl font-bold mb-4">{title}</h1>
            <p className="text-xl">{description}</p>
          </div>
          {services.slice(0, 2).map((service, index) => (
            <div
              key={index}
              className="group h-[300px] cursor-pointer relative"
            >
              {/* Front */}
              <div className="absolute inset-0 rounded-[30px] rounded-tl-none border border-[#C8D6E6] overflow-hidden transition-all duration-700 group-hover:opacity-0 z-10 pointer-events-none">
                <img
                  src={urlFor(service.image).url()}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <h3 className="text-2xl font-medium text-[#C8D6E6]">{service.title}</h3>
                </div>
              </div>
              {/* Back */}
              <div 
                className="absolute inset-0 bg-[#17283d] px-5 py-[30px] flex items-end rounded-[30px] rounded-br-none border border-[#C8D6E6] transition-all duration-700 opacity-0 z-0 group-hover:opacity-100 group-hover:z-20"
              >
                <p className="text-[#C8D6E6] text-lg opacity-0 transition-opacity duration-700 group-hover:opacity-100">{service.flipContent}</p>
              </div>
            </div>
          ))}

          {/* Second row: 4 cards */}
          {services.slice(2, 6).map((service, index) => (
            <div
              key={index + 2}
              className="group h-[300px] cursor-pointer relative"
            >
              {/* Front */}
              <div className="absolute inset-0 rounded-[30px] rounded-tl-none border border-[#C8D6E6] overflow-hidden transition-all duration-700 group-hover:opacity-0 z-10 pointer-events-none">
                <img
                  src={urlFor(service.image).url()}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <h3 className="text-2xl font-medium text-[#C8D6E6]">{service.title}</h3>
                </div>
              </div>
              {/* Back */}
              <div 
                className="absolute inset-0 bg-[#17283d] px-5 py-[30px] flex items-end rounded-[30px] rounded-br-none border border-[#C8D6E6] transition-all duration-700 opacity-0 z-0 group-hover:opacity-100 group-hover:z-20"
              >
                <p className="text-[#C8D6E6] text-lg opacity-0 transition-opacity duration-700 group-hover:opacity-100">{service.flipContent}</p>
              </div>
            </div>
          ))}

          {/* Third row: 3 cards + invisible placeholder */}
          {services.slice(6, 9).map((service, index) => (
            <div
              key={index + 6}
              className="group h-[300px] cursor-pointer relative"
            >
              {/* Front */}
              <div className="absolute inset-0 rounded-[30px] rounded-tl-none border border-[#C8D6E6] overflow-hidden transition-all duration-700 group-hover:opacity-0 z-10 pointer-events-none">
                <img
                  src={urlFor(service.image).url()}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <h3 className="text-2xl font-medium text-[#C8D6E6]">{service.title}</h3>
                </div>
              </div>
              {/* Back */}
              <div 
                className="absolute inset-0 bg-[#17283d] px-5 py-[30px] flex items-end rounded-[30px] rounded-br-none border border-[#C8D6E6] transition-all duration-700 opacity-0 z-0 group-hover:opacity-100 group-hover:z-20"
              >
                <p className="text-[#C8D6E6] text-lg opacity-0 transition-opacity duration-700 group-hover:opacity-100">{service.flipContent}</p>
              </div>
            </div>
          ))}
          {/* Invisible placeholder card */}
          <div className="invisible" />
        </div>
      </div>
    </section>
  )
}
