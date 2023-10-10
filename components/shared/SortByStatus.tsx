import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';

const SortByStatus = () => {
	return (
		<Select value='all'>
			<SelectTrigger className='w-[120px]'>
				<SelectValue placeholder='Status' />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup className='font-nunito'>
					<SelectItem value='all'>All</SelectItem>
					<SelectItem value='waiting'>Waiting</SelectItem>
					<SelectItem value='in-progress'>In progress</SelectItem>
					<SelectItem value='completed'>Completed</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};
export default SortByStatus;
