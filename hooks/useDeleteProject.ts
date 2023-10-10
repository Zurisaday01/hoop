import { deleteProject as deleteProjectApi } from '@/lib/actions/project.actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteProject() {
	const queryClient = useQueryClient();

	const { isLoading: isDeleting, mutate: deleteProject } = useMutation({
		mutationFn: deleteProjectApi,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['projects'],
			});
		},
	});

	return { isDeleting, deleteProject };
}
