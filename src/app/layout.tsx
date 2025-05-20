import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/layout/app-sidebar';
import AppHeader from '@/components/layout/app-header';
import { SidebarInset } from '@/components/ui/sidebar';
import { PrestudyFavicon } from '@/components/icons'; // Assuming you have this for favicon

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'PRESTUDY Dashboard',
  description: 'Way to Smart Study - Dashboard',
  // icons: { icon: '/favicon.ico' } // Add your favicon path here
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* You can link your favicon here if it's a static file in /public */}
        {/* <link rel="icon" href="/favicon.ico" sizes="any" /> */}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <AppHeader />
            {children}
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
