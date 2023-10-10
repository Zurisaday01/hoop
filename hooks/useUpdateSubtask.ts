import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateSubtask as updateSubtaskApi } from '@/lib/actions/todo.actions';

export const useUpdateSubtask = () => {
	const queryClient = useQueryClient();
	const { isLoading: isUpdating, mutate: updateSubtask } = useMutation({
		mutationFn: updateSubtaskApi,
		onSuccess: () => {
			// reload to refetch
			queryClient.invalidateQueries({
				queryKey: ['todo'],
			});
		},
	});

	return { isUpdating, updateSubtask };
};
