import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { createClient } from '@sanity/client';
import { useTextAnimation } from "~/hooks/useTextAnimation";
import Navbar from "~/components/navbar";
import Footer from "~/components/footer";
import AboutVideo from "~/components/about-video";
import InfoAbout from "~/components/info-about";
import ImagesAbout from "~/components/images-about";
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
    // Test Sanity connection first
    const config = sanityClient.config();
    if (!config.projectId) {
      throw new Error('Sanity configuration error: Missing project ID');
    }

    const query = `*[_type == "aboutHeading"][0]{
      heading
    }`;
    
    const aboutHeading = await sanityClient.fetch(query);
    console.log('About Heading:', aboutHeading);

    const aboutVideoQuery = `*[_type == "aboutVideo"][0]{
      "videoUrl": video.asset->url,
      coverImage
    }`;

    const aboutVideo = await sanityClient.fetch(aboutVideoQuery);
    console.log('About Video:', aboutVideo);

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

    const infoAboutQuery = `*[_type == "infoAbout"][0]{
      items[]{
        title,
        description
      }
    }`;

    const infoAbout = await sanityClient.fetch(infoAboutQuery);
    console.log('Info About:', infoAbout);

    const imagesAboutQuery = `*[_type == "imagesAbout"][0]{
      images
    }`;

    const imagesAbout = await sanityClient.fetch(imagesAboutQuery);
    console.log('Images About:', imagesAbout);
    
    return json({ 
      aboutHeading,
      aboutVideo,
      navbar,
      footer,
      infoAbout,
      imagesAbout,
      error: null 
    });
  } catch (error: unknown) {
    console.error('Error fetching data:', error);
    return json({ 
      aboutHeading: null,
      aboutVideo: null,
      navbar: null,
      footer: null,
      error: (error as Error).message || 'Failed to fetch data' 
    });
  }
};

export default function About() {
  const data = useLoaderData<typeof loader>();
  console.log('Loader Data:', data); // Debug log
  const { aboutHeading, aboutVideo, navbar, footer, infoAbout, imagesAbout, error } = data;

  if (error) {
    return <div className="text-[#17283D]">Error: {error}</div>;
  }

  if (!aboutHeading || !aboutVideo || !navbar || !footer || !infoAbout || !imagesAbout) {
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
            ref={useTextAnimation(aboutHeading.heading)}
            className="text-[31px] md:text-h1 font-medium mb-16 text-[#17283D]"
          >
            {aboutHeading.heading}
          </h1>
          <AboutVideo 
            videoUrl={aboutVideo.videoUrl}
            coverImage={aboutVideo.coverImage}
          />
          <div className="mt-16">
            <InfoAbout items={infoAbout.items} />
            <ImagesAbout images={imagesAbout.images} />
          </div>
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
