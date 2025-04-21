import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
  Location
} from "@remix-run/react";
import { useEffect } from "react";
import Navbar from "./components/navbar";
import "~/styles/tailwind.css";
import "~/styles/slick-overrides.css";
import "~/styles/index.css";
import "~/styles/navbar.css";
import "~/styles/datepicker.css";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css",
  },
  {
    rel: "stylesheet",
    href: "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css",
  }
];

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const response = await fetch(request.url.replace(/\/?$/, '/api/sanity'));
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    // Handle error response from API
    if (data.error) {
      console.error('API Error:', data.error, data.details);
      return json({ 
        navbar: null,
        error: data.error 
      });
    }

    // Handle empty data case
    if (!data.navbar) {
      console.warn('Missing required data from API');
      return json({ 
        navbar: null,
        error: 'Missing required data' 
      });
    }

    return json({ 
      navbar: data.navbar 
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    return json({ 
      navbar: null,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
};

interface LoaderData {
  navbar: {
    logo: SanityImage;
    phoneNumber: string;
    phoneIcon: SanityImage;
    navLinks: NavLink[];
  } | null;
}

import type { NavLink, SanityImage } from '~/types/sanity';

export default function App() {
  const { navbar } = useLoaderData<typeof loader>() as LoaderData;
  const location = useLocation();

  useEffect(() => {
    const state = (location as Location & { state: { scrollToHero?: boolean } }).state;
    if (state?.scrollToHero) {
      const timer = setTimeout(() => {
        const heroElement = document.querySelector('#hero');
        if (heroElement) {
          heroElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500); // Reduced from 2200 since we don't have transitions anymore

      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {navbar && <Navbar {...navbar} />}
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
