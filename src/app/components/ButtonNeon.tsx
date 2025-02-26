"use client"

import { ReactNode } from 'react'
import Link from 'next/link';

interface ButtonNeonProps {
    children: ReactNode;
    href: string;
    textColor?: string;
    neonColor?: string;
}

export default function ButtonNeon({
    children,
    href,
    textColor = "text-sky-200",
    neonColor = "shadow-[0_0_0_1px_#fff,inset_0_0_0_1px_#fff,0_0_3px_#08f,0_0_5px_#08f,0_0_10px_#08f,0_0_15px_#08f]",
  }: ButtonNeonProps) {
    return (
      <Link href={href} passHref>
        <button
          className={`px-8 py-1 bg-transparent ${textColor} text-center border-1 border-sky-200 rounded-full text-sm
          ${neonColor} transition-transform hover:scale-105 overflow-hidden`}
          >
          {children}
        </button>
      </Link>
    );
  }