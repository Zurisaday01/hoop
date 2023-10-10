import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask as createTaskApi } from '@/lib/actions/todo.actions';

export const useCreateTask = () => {
	const queryClient = useQueryClient();
	const { isLoading: isCreating, mutate: createTask } = useMutation({
		mutationFn: createTaskApi,
		onSuccess: () => {
			// reload to refetch
			queryClient.invalidateQueries({
				queryKey: ['todo'],
			});
		},
	});

	return { isCreating, createTask };
};
