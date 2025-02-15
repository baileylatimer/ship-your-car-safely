import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation
} from "@remix-run/react";
import { useEffect } from "react";
import Footer from "./components/footer";
import { PageTransition } from "./components/page-transition";
import { urlFor } from "~/lib/sanity.image";
import "~/styles/tailwind.css";
import "~/styles/slick-overrides.css";
import "~/styles/index.css";
import "~/styles/navbar.css";

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
    console.log('API Response:', {
      navbar: data.navbar,
      footer: data.footer,
      'footer exists': !!data.footer,
      'footer socialLinks': data.footer?.socialLinks
    }); // Debug log
    return json({ 
      navbar: data.navbar,
      footer: data.footer 
    });
  } catch (error) {
    console.error('Error fetching navbar data:', error);
    return json({ navbar: null, footer: null });
  }
};

export default function App() {
  const { navbar, footer } = useLoaderData<typeof loader>();
  const location = useLocation();

  useEffect(() => {
    // Check if we need to scroll to hero after navigation
    if (location.state?.scrollToHero) {
      // Wait for page transition to complete (approximately 2.2s)
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
        <PageTransition />
        {footer && navbar && (
          <Footer 
            footer={footer}
            phoneNumber={navbar.phoneNumber}
            phoneIcon={navbar.phoneIcon}
          />
        )}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
