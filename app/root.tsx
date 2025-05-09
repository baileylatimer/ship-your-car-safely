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
import "~/styles/autocomplete.css";

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

  // Load Google Maps Places API
  useEffect(() => {
    const loadScript = (src: string) =>
      new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = (error) => reject(error);
        document.head.appendChild(script);
      });

    const init = async () => {
      if (typeof window === 'undefined') return;

      // Check if the Google Maps script is already loaded
      const existing = document.querySelector(
        'script[src*="maps.googleapis.com/maps/api/js"]'
      );
      
      if (existing) {
        console.log("Google Maps API already loaded, skipping re-load");
        return;
      }

      try {
        console.log("Loading Google Maps API...");
        // Load the Google Maps API with Places library
        await loadScript(`https://maps.googleapis.com/maps/api/js?key=AIzaSyCM67BQLG_tfodNdHUkOPwDghKHHRn9LbI&libraries=places&v=weekly`);
        console.log("✅ Google Maps API loaded successfully");
      } catch (error) {
        console.error("❌ Failed to load Google Maps API", error);
      }
    };

    init();
  }, []);

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
