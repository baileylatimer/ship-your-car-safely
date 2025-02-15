import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Hero from "~/components/hero";
import Navbar from "~/components/navbar";
import StatisticsSection from "~/components/statistics-section";
import VideoSection from "~/components/video-section";
import Process from "~/components/process";
import ServicesSection from "~/components/services";
import FullWidthImage from "~/components/full-width-image";
import TestimonialsSection from "~/components/testimonials";
import "../styles/index.css";

export const meta: MetaFunction = () => {
  return [
    { title: "Ship Your Car Safely" },
    { name: "description", content: "Professional car shipping services" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const response = await fetch(request.url.replace(/\/?$/, '/api/sanity'));
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return { 
      hero: data.hero, 
      statistics: data.statistics,
      videoSection: data.videoSection,
      process: data.process,
      services: data.services,
      fullWidthImage: data.fullWidthImage,
      testimonials: data.testimonials,
      navbar: data.navbar,
      error: null 
    };
  } catch (error: unknown) {
    console.error('Error fetching data:', error);
    return { 
      hero: null, 
      statistics: null,
      videoSection: null,
      process: null,
      services: null,
      fullWidthImage: null,
      testimonials: null,
      navbar: null,
      error: (error as Error).message || 'Failed to fetch data' 
    };
  }
};

export default function Index() {
  const { hero, statistics, videoSection, process, services, fullWidthImage, testimonials, navbar, error } = useLoaderData<typeof loader>();

  if (error) {
    return <div className="text-[#17283D]">Error: {error}</div>;
  }

  if (!hero || !statistics || !videoSection || !process || !services || !navbar) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <Navbar 
        logo={navbar.logo}
        phoneNumber={navbar.phoneNumber}
        phoneIcon={navbar.phoneIcon}
        navLinks={navbar.links}
        isHomePage={true}
      />
      <Hero title={hero.title} backgroundImage={hero.backgroundImage} />
      <StatisticsSection 
        heading={statistics.heading}
        description={statistics.description}
        stats={statistics.stats}
      />
      <VideoSection 
        title={videoSection.title}
        videoUrl={videoSection.videoUrl}
        coverImage={videoSection.coverImage}
      />
      <Process />
      <ServicesSection 
        title={services.title}
        description={services.description}
        services={services.services}
      />
      {fullWidthImage && (
        <FullWidthImage
          image={fullWidthImage.image}
          alt={fullWidthImage.alt}
        />
      )}
      {testimonials && <TestimonialsSection testimonials={testimonials} />}
    </main>
  );
}
