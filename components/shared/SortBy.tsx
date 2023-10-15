import { SortOrder } from 'mongoose';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';
import { useRouter } from 'next/navigation';

const SortBy = () => {
	const router = useRouter();

	const handleChange = (value: SortOrder) => {
		router.push(`/projects?sortBy=${value}`);
	};

	return (
		<Select
			defaultValue='desc'
			onValueChange={(value: string) => handleChange(value as SortOrder)}>
			<SelectTrigger className='w-[200px] dark:bg-dark-1 bg-light-1 border-none'>
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectItem className='font-nunito' value='desc'>
						Desc (Newest to oldest)
					</SelectItem>
					<SelectItem className='font-nunito' value='asc'>
						Asc (Oldest to newest)
					</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};
export default SortBy;
