import { SearchIcon } from 'lucide-react';
import { Input } from '../ui/input';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Searchbar = () => {
	const router = useRouter();
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			if (searchTerm) {
				router.push(`/projects?q=` + searchTerm);
			} else {
				router.push(`/projects`);
			}
		}, 300);

		return () => clearTimeout(timeoutId);
	}, [router, searchTerm]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};
	return (
		<div className='relative'>
			<SearchIcon className='absolute left-1 top-3 h-[18px] text-slate-400' />
			<Input
				value={searchTerm}
				onChange={handleInputChange}
				placeholder='Search...'
				className='dark:bg-dark-1 bg-light-1 border-none pl-8'></Input>
		</div>
	);
};
export default Searchbar;
