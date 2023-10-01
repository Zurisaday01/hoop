import '../globals.css';
import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Josefin_Sans, Nunito } from 'next/font/google';
import { ThemeProvider } from '../(root)/theme-provider';
import Image from 'next/image';

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
				<body className={`${nunito.variable} ${josefinSans.variable}`}>
					<ThemeProvider attribute='class'>
						<div className='w-full flex flex-col gap-3 justify-center items-center min-h-screen bg-light-1 dark:bg-dark-2'>
							<div className='flex items-center gap-1'>
								<Image
									src='/assets/logo.svg'
									alt='logo'
									width={60}
									height={60}
								/>
								<p className='font-bold text-lg	font-nunito uppercase text-gray '>
									Hoop
								</p>
							</div>

							<main>{children}</main>
						</div>
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
