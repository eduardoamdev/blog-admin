"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar(props: any) {
  const [isClick, setIsClick] = useState(false);

  const toogleNavbar = (): void => {
    setIsClick(!isClick);
  };

  const getLinks = (mobile: boolean) => {
    if (props.authenticated) {
      return (
        <div
          className={
            mobile ? "ml-4 flex flex-col" : "ml-4 flex flex-row space-x-8"
          }
        >
          <Link
            href="/admin/articles"
            className="text-white ¡lg:hover:bg-white lg:hover:text-black lg:rounded-lg p-2 text-1xl md:text-1xl lg:text-2xl"
          >
            Articles
          </Link>
          <Link
            href="/admin/articles/new"
            className="text-white lg:hover:bg-white lg:hover:text-black lg:rounded-lg p-2 text-1xl md:text-1xl lg:text-2xl"
          >
            New article
          </Link>
        </div>
      );
    } else {
      return (
        <div
          className={
            mobile ? "ml-4 flex flex-col" : "ml-4 flex flex-row space-x-8"
          }
        >
          <Link
            href="/login"
            className="text-white lg:hover:bg-white lg:hover:text-black lg:rounded-lg p-2 text-1xl md:text-1xl lg:text-2xl"
          >
            Login
          </Link>
        </div>
      );
    }
  };

  return (
    <nav className="bg-gray-700 pl-2 pr-2">
      <div className="max-w-7xl mx-auto px4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link
                href="/"
                className="text-white text-2xl md:text-2xl lg:text-3xl"
              >
                amdevblog
              </Link>
            </div>
          </div>
          <div className="hidden md:block">{getLinks(false)}</div>
          <div className="md:hidden flex  items-center">
            <button
              onClick={toogleNavbar}
              className="inline-flex items-center justify-center p-2 rounded-md text-white md:text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isClick ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isClick && <div className="md:hidden">{getLinks(true)}</div>}
    </nav>
  );
}
