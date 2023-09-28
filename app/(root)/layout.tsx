import '../globals.css';
import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Josefin_Sans, Nunito } from 'next/font/google';
// COMPONENTS
import Topbar from '@/components/shared/Topbar';
import Bottombar from '@/components/shared/Bottombar';
import LeftSidebar from '@/components/shared/LeftSidebar';

// DARK THEME PROVIDER
import { ThemeProvider } from './theme-provider';

// UPLOADTHING
import { ourFileRouter } from '../api/uploadthing/core';
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { extractRouterConfig } from 'uploadthing/server';

// TOASTER SHADCN
import { Toaster } from '@/components/ui/toaster';

const josefinSans = Josefin_Sans({
	subsets: ['latin'],
	variable: '--font-josefin-sans',
});
const nunito = Nunito({
	subsets: ['latin'],
	variable: '--font-nunito',
});

export const metadata: Metadata = {
	title: 'Hoop',
	description: 'Project Management App',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider>
			<html lang='en'>
				<body
					className={`${nunito.variable} ${josefinSans.variable} transition duration-300`}
					suppressHydrationWarning={true}>
					<NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />

					<ThemeProvider attribute='class'>
						<Topbar />

						<main className='flex flex-row '>
							<LeftSidebar />
							<section className='main-container'>
								<div className='w-full max-w-5xl pt-4'>{children}</div>
							</section>
						</main>
						<Bottombar />
					</ThemeProvider>
					<Toaster />
				</body>
			</html>
		</ClerkProvider>
	);
}
