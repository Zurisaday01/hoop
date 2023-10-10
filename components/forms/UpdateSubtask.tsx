import { useUpdateSubtask } from '@/hooks/useUpdateSubtask';
import { Input } from '../ui/input';
import { useToast } from '../ui/use-toast';

const UpdateSubtask = ({
	todoId,
	taskId,
	subtaskId,
	content,
}: {
	todoId: string;
	taskId: string;
	subtaskId: string;
	content: string;
}) => {
	const { isUpdating, updateSubtask } = useUpdateSubtask();
	const { toast } = useToast();

	const handleBlur = async (e: { target: { value: any } }) => {
		const { value } = e.target;

		if (!value) return;

		updateSubtask(
			{ todoId, taskId, subtaskId, newContent: value },
			{
				onSuccess: () => {
					toast({
						title: 'Subtask successfully updated',
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
		<form className='w-full'>
			<Input
				defaultValue={content}
				className='text-sm font-nunito text-start leading-5 w-full border-transparent focus:border-transparent  focus-visible:ring-0 p-0'
				onBlur={e => handleBlur(e)}
				disabled={isUpdating}
			/>
		</form>
	);
};
export default UpdateSubtask;
