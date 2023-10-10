import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTask as deleteTaskApi } from '@/lib/actions/todo.actions';

export function useDeleteTask() {
	const queryClient = useQueryClient();

	const { isLoading: isDeleting, mutate: deleteTask } = useMutation({
		mutationFn: deleteTaskApi,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['todo'],
			});
		},
	});

	return { isDeleting, deleteTask };
}
