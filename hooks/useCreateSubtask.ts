import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSubtask as createSubtaskApi } from '@/lib/actions/todo.actions';

export const useCreateSubtask = () => {
	const queryClient = useQueryClient();
	const { isLoading: isCreating, mutate: createSubtask } = useMutation({
		mutationFn: createSubtaskApi,
		onSuccess: () => {
			// reload to refetch
			queryClient.invalidateQueries({
				queryKey: ['todo'],
			});
		},
	});

	return { isCreating, createSubtask };
};
