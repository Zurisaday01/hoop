import { SignIn } from '@clerk/nextjs';

export default function Page() {
	return (
		<SignIn
			appearance={{
				elements: {
					formButtonPrimary:
						'bg-primary-light hover:bg-primary-dark dark:bg-primary-light text-dark-1 dark:hover:bg-primary-dark transition duration-300 ease-in-out',
					footerActionLink:
						'text-primary-light hover:text-gray-1 transition duration-300',
					headerTitle: 'font-josefin-sans',
					card: 'font-nunito',
				},
			}}
		/>
	);
}
