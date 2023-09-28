'use client';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { useTheme } from 'next-themes';

import { SunIcon, MoonIcon, CheckIcon, Half2Icon } from '@radix-ui/react-icons';

import { clsx } from 'clsx';
import { ReactNode, useEffect } from 'react';

interface RadixMenuItem {
	value: string;
	label: string;
	icon?: ReactNode;
}

const generalMenuItems: RadixMenuItem[] = [
	{
		value: 'light',
		label: 'Light',
		icon: <SunIcon className='mr-2 h-3.5 w-3.5' />,
	},
	{
		value: 'dark',
		label: 'Dark',
		icon: <MoonIcon className='mr-2 h-3.5 w-3.5' />,
	},
];

const ThemeSwitcher = () => {
	const { theme, setTheme } = useTheme();

	// if the theme was in local storage, retreve it and set is as the app theme
	useEffect(() => {
		try {
			let found = localStorage.getItem('theme');

			if (found) setTheme(found);
		} catch (error) {}
	}, []);

	return (
		<div className='relative inline-block text-left '>
			<DropdownMenuPrimitive.Root>
				<DropdownMenuPrimitive.Trigger asChild>
					<div className='flex items-center'>
						<Half2Icon className='h-[28px] w-[28px] cursor-pointer' />
					</div>
				</DropdownMenuPrimitive.Trigger>

				<DropdownMenuPrimitive.Portal>
					<DropdownMenuPrimitive.Content
						align='end'
						sideOffset={40}
						className={clsx(
							'radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
							'w-32 rounded-lg px-1.5 py-1 shadow-md ',
							'bg-white dark:bg-gray-800',
							'z-100'
						)}>
						{generalMenuItems.map(({ value, label, icon }, i) => (
							<DropdownMenuPrimitive.Item
								key={`${value}-${i}`}
								className={clsx(
									'flex cursor-pointer select-none items-center rounded-md px-2 py-2 text-xs outline-none',
									'text-gray-400 focus:bg-gray-50 dark:text-gray-500 dark:focus:bg-gray-900'
								)}
								onClick={() => setTheme(value)}>
								{icon}
								<span className='flex-grow text-gray-700 dark:text-gray-300'>
									{label}
								</span>
								{theme == value && (
									<span className='flex items-center'>
										<CheckIcon className='mr-2 h-3.5 w-3.5' />
									</span>
								)}
							</DropdownMenuPrimitive.Item>
						))}
					</DropdownMenuPrimitive.Content>
				</DropdownMenuPrimitive.Portal>
			</DropdownMenuPrimitive.Root>
		</div>
	);
};

export default ThemeSwitcher;
