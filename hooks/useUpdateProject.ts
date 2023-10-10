import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateProject as updateProjectApi } from '@/lib/actions/project.actions';

export const useUpdateProject = (projectId: string) => {
	const queryClient = useQueryClient();
	const { isLoading: isUpdating, mutate: updateProject } = useMutation({
		mutationFn: updateProjectApi,
		onSuccess: () => {
			// reload to refetch
			queryClient.invalidateQueries({
				queryKey: ['project', projectId],
			});
		},
	});

	return { isUpdating, updateProject };
};
