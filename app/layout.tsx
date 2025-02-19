import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SearchIcon from '@mui/icons-material/Search';
import Link from "next/link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Recipe App",
  description: "A simple recipe app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="sticky h-16 top-0 bg-white border-b border-gray-200 z-20 ring-gray-400 ring-1 ">
          <div className="flex justify-between items-center h-full  mx-auto px-16">
            <h1 className="text-2xl font-semibold text-burntsienna">Recipe App</h1>
            <div id="search-bar" className="w-[30vw] flex relative" >
              <input type="text" placeholder="Search for recipes" className="flex-1 border border-slate-900 focus:outline rounded-md focus:outline-charcoal focus:border-0  p-2" />
              <button className="bg-sandybrown w-10 h-full rounded-r-md p-1 absolute right-0 border border-slate-900 "><SearchIcon /> </button>
            </div>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link
                    href="/"
                    className="hover:underline"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <a href="#" className=" hover:underline">
                    Recipes
                  </a>
                </li>
                <li>
                  <a href="#" className=" hover:underline">
                    About
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
