import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Jammu Beyond Yatra — Tourism, Heritage & Culture Discovery',
  description: 'Discover historic landmarks, Tawi riverfront experiences, cultural traditions, and local communities in Jammu beyond primary pilgrimage routes.',
  keywords: [
    'Jammu Tourism',
    'Beyond Yatra',
    'Tawi Riverfront',
    'Mubarak Mandi Palace',
    'Bahu Fort',
    'Dogra Heritage',
    'Hidden Jammu',
    'Jammu Itinerary Planner'
  ],
  authors: [{ name: 'Jammu Beyond Yatra Heritage Team' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-mint-pale text-charcoal antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
