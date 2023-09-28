'use client';
import { sidebarLinks } from '@/constants';
import { useTheme } from 'next-themes';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Icon from './Icon';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

interface LinksProps {
	linkStyle: string;
	place: 'LeftSidebar' | 'Bottombar';
}

const Links = ({ linkStyle, place }: LinksProps) => {
	const pathname = usePathname();

	return (
		<>
			{sidebarLinks.map(link => {
				const isActive =
					(pathname.includes(link.route) && link.route.length > 1) ||
					pathname === link.route;

				return (
					<Link
						href={link.route}
						key={link.label}
						className={` ${linkStyle} ${
							isActive &&
							'bg-primary-light hover:bg-primary-dark dark:text-dark-1 transition duration-300 ease-in-out'
						}`}>
						<Icon name={link.iconName} size={25} />
						{place === 'LeftSidebar' ? (
							<p className='text-black-1 black:text-light-1  hidden xl:block'>
								{link.label}
							</p>
						) : (
							<p className='text-subtle-medium hidden sm:block'>
								{/* cut the words and take the first:'Create Thread' => ['Create', 'Thread'][0] => 'Create'*/}
								{link.label.split(/\s+/)[0]}
							</p>
						)}
					</Link>
				);
			})}
		</>
	);
};
export default Links;
