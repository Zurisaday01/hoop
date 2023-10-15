import { useMutation, useQueryClient } from '@tanstack/react-query';

import { filterMonthlyProjectCounts as filterMonthlyProjectCountsApi } from '@/lib/actions/project.actions';

export const useFilterMonthlyProjectCounts = () => {
	const queryClient = useQueryClient();
	const { isLoading: isUpdating, mutate: filterMonthlyProjectCounts } =
		useMutation({
			mutationFn: filterMonthlyProjectCountsApi,
			onSuccess: () => {
				// reload to refetch
				queryClient.invalidateQueries({
					queryKey: ['projects'],
				});
			},
		});

	return { isUpdating, filterMonthlyProjectCounts };
};
