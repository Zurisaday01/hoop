import { createProject as createProjectApi } from '@/lib/actions/project.actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateProject = () => {
	const queryClient = useQueryClient();
	const { isLoading: isCreating, mutate: createProject } = useMutation({
		mutationFn: createProjectApi,
		onSuccess: () => {
			// reload to refetch
			queryClient.invalidateQueries({
				queryKey: ['projects'],
			});
		},
	});

	return { isCreating, createProject };
};
