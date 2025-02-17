import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { createClient } from '@sanity/client';
import { useTextAnimation } from "~/hooks/useTextAnimation";
import Navbar from "~/components/navbar";
import Faq from "~/components/faq";
import Footer from "~/components/footer";
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
    <div className="flex flex-col min-h-screen">
      <Navbar 
        logo={navbar.logo}
        phoneNumber={navbar.phoneNumber}
        phoneIcon={navbar.phoneIcon}
        navLinks={navbar.links}
      />
      <div className="flex-grow">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 
            ref={useTextAnimation(supportHeader.heading)}
            className="text-[31px] md:text-[76px] font-medium mb-16 text-[#17283D]"
          >
            {supportHeader.heading}
          </h1>
          <Faq items={faq.items} />
        </div>
      </div>
      <Footer 
        footer={footer}
        phoneNumber={navbar.phoneNumber}
        phoneIcon={navbar.phoneIcon}
      />
    </div>
  );
}
