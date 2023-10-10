import { MoreVerticalIcon, PencilIcon, Trash2Icon } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Dispatch, SetStateAction } from 'react';
import { useDeleteSubtask } from '@/hooks/useDeleteSubtask';
import { useToast } from '../ui/use-toast';

const DropdownMenuSubtask = ({
	todoId,
	taskId,
	subtaskId,
	setIsEdit,
	isEdit,
}: {
	todoId: string;
	taskId: string;
	subtaskId: string;
	setIsEdit: Dispatch<SetStateAction<string>>;
	isEdit: boolean;
}) => {
	const { deleteSubtask } = useDeleteSubtask();
	const { toast } = useToast();

	const handleDelete = () => {
		deleteSubtask(
			{ todoId, taskId, subtaskId },
			{
				onSuccess: () => {
					toast({
						title: 'Subtask successfully deleted',
					});
				},
				onError: err => {
					toast({
						title: 'Something went wrong!',
					});
				},
			}
		);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<MoreVerticalIcon className='h-5 cursor-pointer' />
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-30'>
				<DropdownMenuGroup>
					{isEdit ? (
						<DropdownMenuItem
							className='flex gap-2 cursor-pointer'
							onClick={() => setIsEdit('')}>
							<PencilIcon className='w-4 text-primary-light' />
							<span className='font-nunito text-primary-light'>
								Done editing
							</span>
						</DropdownMenuItem>
					) : (
						<DropdownMenuItem
							className='flex gap-2 cursor-pointer'
							onClick={() => setIsEdit(subtaskId)}>
							<PencilIcon className='w-4' />
							<span className='font-nunito'>Edit</span>
						</DropdownMenuItem>
					)}
					<DropdownMenuItem
						onClick={handleDelete}
						className='flex gap-2 cursor-pointer'>
						<Trash2Icon className='w-4' />
						<span className='font-nunito'>Delete</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
export default DropdownMenuSubtask;
