import '../globals.css';
import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Josefin_Sans, Nunito } from 'next/font/google';

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
					<div className='w-full flex justify-center items-center min-h-screen'>
						{children}
					</div>
				</body>
			</html>
		</ClerkProvider>
	);
}
