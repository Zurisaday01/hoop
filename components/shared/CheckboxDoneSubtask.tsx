import { useUpdateDoneStatus } from '@/hooks/useUpdateDoneStatus';
import { Checkbox } from '../ui/checkbox';
import { useToast } from '../ui/use-toast';
import { useUpdateDoneStatusSubtask } from '@/hooks/useUpdateDoneStatusSubtask';

const CheckboxDoneSubtask = ({
	id,
	todoId,
	taskId,
	subtaskId,
	done,
}: {
	id: string;
	todoId: string;
	taskId: string;
	subtaskId: string;
	done: boolean;
}) => {
	const { isUpdating, updateDoneStatusSubtask } = useUpdateDoneStatusSubtask();
	const { toast } = useToast();

	const handleChange = (e: boolean) => {
		updateDoneStatusSubtask(
			{ todoId, taskId, subtaskId, newDoneStatus: e },
			{
				onSuccess: () => {
					if (e) {
						toast({
							title: 'Subtask Done',
							description: 'Almost there!!',
						});
					}
				},
				onError: err => {
					if (e)
						toast({
							title: 'Something went wrong',
						});
				},
			}
		);
	};

	return (
		<Checkbox
			id={id}
			disabled={isUpdating}
			defaultChecked={done}
			onCheckedChange={handleChange}
		/>
	);
};
export default CheckboxDoneSubtask;
