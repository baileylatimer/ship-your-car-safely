import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { createClient } from '@sanity/client';
import Navbar from "~/components/navbar";
import Faq from "~/components/faq";
import "../styles/index.css";

const sanityClient = createClient({
  projectId: 'uxddufsz',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-05-03',
});

if (!sanityClient.config().projectId) {
  throw new Error('Sanity Project ID is required');
}

export const loader: LoaderFunction = async () => {
  try {
    const supportHeaderQuery = `*[_type == "supportHeader"][0]{
      heading
    }`;
    
    const supportHeader = await sanityClient.fetch(supportHeaderQuery);
    console.log('Support Header:', supportHeader);

    const navbarQuery = `*[_type == "navbar"][0]{
      logo,
      phoneNumber,
      phoneIcon,
      links[]{
        text,
        url
      }
    }`;

    const navbar = await sanityClient.fetch(navbarQuery);
    console.log('Navbar:', navbar);

    const footerQuery = `*[_type == "footer"][0]{
      heading,
      buttonText,
      paragraph,
      socialLinks[]{
        icon,
        url
      }
    }`;

    const footer = await sanityClient.fetch(footerQuery);
    console.log('Footer:', footer);

    const faqQuery = `*[_type == "faq"][0]{
      "items": items[]{
        title,
        description,
        "image": image.asset->
      }
    }`;

    const faq = await sanityClient.fetch(faqQuery);
    console.log('FAQ:', faq);
    
    return json({ 
      supportHeader,
      navbar,
      footer,
      faq,
      error: null 
    });
  } catch (error: unknown) {
    console.error('Error fetching data:', error);
    return json({ 
      supportHeader: null,
      navbar: null,
      footer: null,
      faq: null,
      error: (error as Error).message || 'Failed to fetch data' 
    });
  }
};

export default function Support() {
  const { supportHeader, navbar, footer, faq, error } = useLoaderData<typeof loader>();

  if (error) {
    return <div className="text-[#17283D]">Error: {error}</div>;
  }

  if (!supportHeader || !navbar || !footer || !faq) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar 
        logo={navbar.logo}
        phoneNumber={navbar.phoneNumber}
        phoneIcon={navbar.phoneIcon}
        navLinks={navbar.links}
        isHomePage={false}
      />
      <div className="min-h-screen">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-[31px] md:text-[76px] font-medium mb-16 text-[#17283D]">
            {supportHeader.heading}
          </h1>
          <Faq items={faq.items} />
        </div>
      </div>
    </div>
  );
}
