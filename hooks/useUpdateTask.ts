import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateTask as updateTaskApi } from '@/lib/actions/todo.actions';

export const useUpdateTask = () => {
	const queryClient = useQueryClient();
	const { isLoading: isUpdating, mutate: updateTask } = useMutation({
		mutationFn: updateTaskApi,
		onSuccess: () => {
			// reload to refetch
			queryClient.invalidateQueries({
				queryKey: ['todo'],
			});
		},
	});

	return { isUpdating, updateTask };
};
