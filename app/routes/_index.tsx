import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Hero from "~/components/hero";
import StatisticsSection from "~/components/statistics-section";

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
      error: null 
    };
  } catch (error: unknown) {
    console.error('Error fetching data:', error);
    return { 
      hero: null, 
      statistics: null,
      error: (error as Error).message || 'Failed to fetch data' 
    };
  }
};

export default function Index() {
  const { hero, statistics, error } = useLoaderData<typeof loader>();

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!hero || !statistics) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <Hero title={hero.title} backgroundImage={hero.backgroundImage} />
      <StatisticsSection 
        heading={statistics.heading}
        description={statistics.description}
        stats={statistics.stats}
      />
    </main>
  );
}
