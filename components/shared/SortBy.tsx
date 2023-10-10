import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';

const SortBy = () => {
	return (
		<Select value='desc'>
			<SelectTrigger className='w-[200px]'>
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
