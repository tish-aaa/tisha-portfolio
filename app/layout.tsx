import type { Metadata } from 'next';
import { EB_Garamond, Inter } from 'next/font/google';
import './globals.css';

const garamond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-garamond',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Tisha Sharma — welcome to tisha's space",
  description: 'Full stack developer, front-end focused, building into data.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${garamond.variable} ${inter.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
