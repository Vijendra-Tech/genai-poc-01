import os from "node:os";
import { cssBundleHref } from "@remix-run/css-bundle";
import { json, type LinksFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  type MetaFunction,
} from "@remix-run/react";
import faviconAssetUrl from "./assets/hsbc-logo.svg";
import { GeneralErrorBoundary } from "./components/error-boundary.tsx";
import { KCDShop } from "./kcdshop.tsx";
import fontStylestylesheetUrl from "./styles/font.css";
import tailwindStylesheetUrl from "./styles/tailwind.css";
import { getEnv } from "./utils/env.server.ts";
import globalCss from "./globals.css";

export const links: LinksFunction = () => {
  return [
    { rel: "icon", type: "image/svg+xml", href: faviconAssetUrl },
    { rel: "stylesheet", href: fontStylestylesheetUrl },
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    // { rel: "stylesheet", href: globalCss },
    cssBundleHref ? { rel: "stylesheet", href: cssBundleHref } : null,
  ].filter(Boolean);
};

export async function loader() {
  return json({ username: os.userInfo().username, ENV: getEnv() });
}

function Document({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full overflow-x-hidden">
      <head>
        <Meta />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Links />
      </head>
      <body className="flex h-full flex-col justify-between bg-background text-foreground bg-gray-200">
        {children}
        <ScrollRestoration />
        <Scripts />
        <KCDShop />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  const data = useLoaderData<typeof loader>();
  return (
    <Document>
      <header className="container mx-auto py-6">
        <nav className="flex justify-evenly relative">
          <Link to="/" className="absolute left-0 bottom-0 top-0">
            <img src={faviconAssetUrl} alt="HSBC" className="h-10" />
            <p>AI Assistant</p>
          </Link>
          <div className="flex flex-row gap-20">
            <Link to="/">Home</Link>
            <Link to="/llm/pocs/v2">Chat</Link>
            <Link to="/about">About</Link>
            <Link to="/threeD">3D Play</Link>
          </div>
        </nav>
      </header>

      <div className="flex-1">
        <Outlet />
      </div>
      <footer className="container mx-auto py-6">
       <p>© {new Date().getFullYear()} HSBC AI Assistant</p>
      </footer>
      <div className="h-5" />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
        }}
      />
    </Document>
  );
}

export const meta: MetaFunction = () => {
  return [
    { title: "HSBC AI" },
    { name: "description", content: `HSBC AI Assistant` },
  ];
};

export function ErrorBoundary() {
  return (
    <Document>
      <div className="flex-1">
        <GeneralErrorBoundary />
      </div>
    </Document>
  );
}
