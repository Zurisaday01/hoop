import { useUpdateTask } from '@/hooks/useUpdateTask';
import { Input } from '../ui/input';
import { useToast } from '../ui/use-toast';

const UpdateTask = ({
	todoId,
	taskId,
	content,
}: {
	todoId: string;
	taskId: string;
	content: string;
}) => {
	const { isUpdating, updateTask } = useUpdateTask();
	const { toast } = useToast();

	const handleBlur = async (e: { target: { value: any } }) => {
		const { value } = e.target;

		if (!value) return;

		updateTask(
			{ todoId, taskId, newContent: value },
			{
				onSuccess: () => {
					toast({
						title: 'Task successfully updated',
						description: "Let's go!!",
					});
				},
				onError: err => {
					toast({
						title: 'Something went wrong!',
					});
				},
			}
		);

		// updateSetting({ [field]: value });
	};
	return (
		<form className='w-full'>
			<Input
				defaultValue={content}
				className='font-josefin-sans text-base text-start leading-5 w-full border-transparent focus:border-transparent  focus-visible:ring-0 p-0'
				onBlur={e => handleBlur(e)}
				disabled={isUpdating}
			/>
		</form>
	);
};
export default UpdateTask;
