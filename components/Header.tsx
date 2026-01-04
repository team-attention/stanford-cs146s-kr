'use client';

import Link from 'next/link';
import Image from 'next/image';

export function Header() {
  return (
    <header className="header-gradient text-white py-8">
      <div className="max-w-[1024px] mx-auto px-8 flex items-center justify-between">
        <div>
          <h1 className="text-[40px] font-bold leading-[60px] mb-1">
            <Link href="/" className="text-white no-underline hover:no-underline hover:text-white">
              CS146S: The Modern Software Developer
            </Link>
          </h1>
          <p className="text-[16px] text-white/90">Korean Edition • 한국어판</p>
        </div>
        <div className="hidden md:block flex-shrink-0">
          <Image
            src="/stanford-logo-transparent.png"
            alt="Stanford University Logo"
            width={140}
            height={140}
            className="opacity-80"
            style={{ width: 'auto', height: 'auto' }}
            priority
          />
        </div>
      </div>
    </header>
  );
}
