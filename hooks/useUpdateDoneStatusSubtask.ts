import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateDoneStatusSubtask as updateDoneStatusSubtaskApi } from '@/lib/actions/todo.actions';

export const useUpdateDoneStatusSubtask = () => {
	const queryClient = useQueryClient();
	const { isLoading: isUpdating, mutate: updateDoneStatusSubtask } =
		useMutation({
			mutationFn: updateDoneStatusSubtaskApi,
			onSuccess: () => {
				// reload to refetch
				queryClient.invalidateQueries({
					queryKey: ['todo'],
				});
			},
		});

	return { isUpdating, updateDoneStatusSubtask };
};
