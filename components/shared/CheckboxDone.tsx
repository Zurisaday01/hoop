import { useUpdateDoneStatus } from '@/hooks/useUpdateDoneStatus';
import { Checkbox } from '../ui/checkbox';
import { useToast } from '../ui/use-toast';

const CheckboxDone = ({
	isTaskDone,
	todoId,
	taskId,
	done,
	qtySubtasks,
}: {
	isTaskDone: boolean;
	todoId: string;
	taskId: string;
	done: boolean;
	qtySubtasks: number;
}) => {
	const { isUpdating, updateDoneStatus } = useUpdateDoneStatus();
	const { toast } = useToast();

	const handleChange = (e: boolean) => {
		updateDoneStatus(
			{ todoId, taskId, newDoneStatus: e },
			{
				onSuccess: () => {
					if (e)
						toast({
							title: 'Task Done',
							description: 'Keep it up!!',
						});
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
			disabled={isUpdating || (qtySubtasks > 0 && !isTaskDone)}
			defaultChecked={done}
			onCheckedChange={handleChange}
		/>
	);
};
export default CheckboxDone;
