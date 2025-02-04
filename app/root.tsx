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
} from "@remix-run/react";
import Navbar from "./components/navbar";
import styles from "./styles/tailwind.css";
import slickOverrides from "./styles/slick-overrides.css";
import indexStyles from "./styles/index.css";
import navbarStyles from "./styles/navbar.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "stylesheet", href: indexStyles },
  { rel: "stylesheet", href: navbarStyles },
  {
    rel: "stylesheet",
    href: "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css",
  },
  {
    rel: "stylesheet",
    href: "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css",
  },
  { rel: "stylesheet", href: slickOverrides },
];

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const response = await fetch(request.url.replace(/\/?$/, '/api/sanity'));
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return json({ navbar: data.navbar });
  } catch (error) {
    console.error('Error fetching navbar data:', error);
    return json({ navbar: null });
  }
};

export default function App() {
  const { navbar } = useLoaderData<typeof loader>();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {navbar && (
          <Navbar
            logo={navbar.logo}
            phoneNumber={navbar.phoneNumber}
            phoneIcon={navbar.phoneIcon}
            navLinks={navbar.links}
          />
        )}
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
