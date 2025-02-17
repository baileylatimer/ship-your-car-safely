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
import { TransitionProvider } from "./context/TransitionContext";
import { useEffect, useRef } from "react";
import { useTransitionNavigation } from "./hooks/useTransitionNavigation";
import Footer from "./components/footer";
import PageTransition from "./components/page-transition";
import Navbar from "./components/navbar";
import { urlFor } from "~/lib/sanity.image";
import "~/styles/tailwind.css";
import "~/styles/slick-overrides.css";
import "~/styles/index.css";
import "~/styles/navbar.css";
import "~/styles/transitions.css";

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
        footer: null,
        error: data.error 
      });
    }

    // Handle empty data case
    if (!data.navbar || !data.footer) {
      console.warn('Missing required data from API');
      return json({ 
        navbar: null, 
        footer: null,
        error: 'Missing required data' 
      });
    }

    return json({ 
      navbar: data.navbar,
      footer: data.footer 
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    return json({ 
      navbar: null, 
      footer: null,
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
  footer: any | null;
}

import type { NavLink, SanityImage } from '~/types/sanity';

export default function App() {
  const { navbar, footer } = useLoaderData<typeof loader>() as LoaderData;
  const location = useLocation();
  const urlForRef = useRef(urlFor);

  // Initialize transition navigation
  useTransitionNavigation();

  useEffect(() => {
    const state = (location as Location & { state: any }).state;
    if (state?.scrollToHero) {
      const timer = setTimeout(() => {
        const heroElement = document.querySelector('#hero');
        if (heroElement) {
          heroElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 2200);

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
        <TransitionProvider>
          {navbar && <Navbar {...navbar} />}
          <PageTransition>
            <Outlet />
          </PageTransition>
          {footer && navbar && (
            <Footer 
              footer={footer}
              phoneNumber={navbar.phoneNumber}
              phoneIcon={navbar.phoneIcon}
            />
          )}
        </TransitionProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
