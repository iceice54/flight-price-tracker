import React from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
      <header className="shadow-lg flex justify-center">
          <div className="font-ser w-full sm:w-2/3 flex justify-between items-center p-4">
              <div className=''>
                  <Link href="/">
                      <span className="font-semibold text-muted-foreground text-2xl ">Flight Price Tracker</span>
                  </Link>
              </div>

              <nav className="text-lg">
                  <Link href="/" className="hover:text-blue-700">Search</Link>
              </nav>
          </div>
      </header>
  );
}

export default Header
