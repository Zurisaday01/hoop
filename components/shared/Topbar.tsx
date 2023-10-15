import Image from 'next/image';
import Link from 'next/link';
// import SignOutBtn from './SignOutBtn';
// import { UserButton } from '@clerk/nextjs';

import {
	ClerkProvider,
	SignedIn,
	SignedOut,
	SignInButton,
	UserButton,
	UserProfile,
} from '@clerk/nextjs';
import ThemeSwitcher from '../ui/ThemeSwitcher';

const Topbar = () => {
	return (
		<nav className='topbar'>
			{/* LEFT */}
			<Link href='/' className='flex items-center gap-4'>
				<Image src='/assets/logo.svg' alt='logo' width={50} height={50} />
				<p className='font-bold	font-nunito uppercase text-gray max-sm:hidden'>
					Hoop
				</p>
			</Link>

			{/* RIGHT */}
			<div className='flex gap-4'>
				<ThemeSwitcher />

				<SignedIn>
					{/* Mount the UserButton component */}
					<UserButton />
				</SignedIn>
				<SignedOut>
					{/* Signed out users get sign in button */}
					<SignInButton />
				</SignedOut>
			</div>
		</nav>
	);
};
export default Topbar;
