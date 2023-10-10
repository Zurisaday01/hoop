import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateDoneStatus as updateDoneStatusApi } from '@/lib/actions/todo.actions';

export const useUpdateDoneStatus = () => {
	const queryClient = useQueryClient();
	const { isLoading: isUpdating, mutate: updateDoneStatus } = useMutation({
		mutationFn: updateDoneStatusApi,
		onSuccess: () => {
			// reload to refetch
			queryClient.invalidateQueries({
				queryKey: ['todo'],
			});
		},
	});

	return { isUpdating, updateDoneStatus };
};
