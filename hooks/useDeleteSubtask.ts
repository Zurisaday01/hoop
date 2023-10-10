import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSubtask as deleteSubtaskApi } from '@/lib/actions/todo.actions';

export function useDeleteSubtask() {
	const queryClient = useQueryClient();

	const { isLoading: isDeleting, mutate: deleteSubtask } = useMutation({
		mutationFn: deleteSubtaskApi,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['todo'],
			});
		},
	});

	return { isDeleting, deleteSubtask };
}
