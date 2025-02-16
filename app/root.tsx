import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation
} from "@remix-run/react";
import { TransitionProvider } from "./context/TransitionContext";
import { useEffect } from "react";
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

  // Initialize transition navigation
  useTransitionNavigation();

  useEffect(() => {
    if (location.state?.scrollToHero) {
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
          <PageTransition>
            {navbar && <Navbar {...navbar} />}
            <Outlet />
            {footer && navbar && (
              <Footer 
                footer={footer}
                phoneNumber={navbar.phoneNumber}
                phoneIcon={navbar.phoneIcon}
              />
            )}
          </PageTransition>
        </TransitionProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
