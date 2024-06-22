"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar(props: any) {
  const pageWidth = window?.visualViewport?.width;

  const [isClick, setisClick] = useState(false);

  const toogleNavbar = (): void => {
    setisClick(!isClick);
  };

  return (
    <div>
      {!props.authenticated ? (
        <nav
          className={
            pageWidth && pageWidth < 1000 ? "bg-black pl-2 pr-2" : "bg-black"
          }
        >
          <div className="max-w-7xl mx-auto px4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link href="/" className="text-white">
                    amdevblog
                  </Link>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center space-x-4">
                  <Link
                    href="/signup"
                    className="text-white hover:bg-white hover:text-black rounded-lg p-2"
                  >
                    Signup
                  </Link>
                  <Link
                    href="/login"
                    className="text-white hover:bg-white hover:text-black rounded-lg p-2"
                  >
                    Login
                  </Link>
                </div>
              </div>
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
          {isClick && (
            <div className="md:hidden">
              <div className="px-2 pt-4 pb-5 space-y-1 sm:px-3">
                <div className="pb-5">
                  <Link
                    href="/signup"
                    className="text-white hover:bg-white hover:text-black rounded-lg p-2"
                  >
                    Signup
                  </Link>
                </div>
                <div>
                  <Link
                    href="/login"
                    className="text-white hover:bg-white hover:text-black rounded-lg p-2"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </div>
          )}
        </nav>
      ) : (
        <nav
          className={
            pageWidth && pageWidth < 1000 ? "bg-black pl-2 pr-2" : "bg-black"
          }
        >
          <div className="max-w-7xl mx-auto px4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link href="/" className="text-white">
                    amdevblog
                  </Link>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center space-x-4">
                  <Link
                    href="/admin/articles"
                    className="text-white hover:bg-white hover:text-black rounded-lg p-2"
                  >
                    Articles
                  </Link>
                  <Link
                    href="/admin/articles/new"
                    className="text-white hover:bg-white hover:text-black rounded-lg p-2"
                  >
                    New article
                  </Link>
                </div>
              </div>
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
          {isClick && (
            <div className="md:hidden">
              <div className="px-2 pt-4 pb-5 space-y-1 sm:px-3">
                <div className="pb-5">
                  <Link
                    href="/admin/articles"
                    className="text-white hover:bg-white hover:text-black rounded-lg p-2"
                  >
                    Articles
                  </Link>
                </div>
                <div>
                  <Link
                    href="/admin/articles/new"
                    className="text-white hover:bg-white hover:text-black rounded-lg p-2"
                  >
                    New article
                  </Link>
                </div>
              </div>
            </div>
          )}
        </nav>
      )}
    </div>
  );
}
