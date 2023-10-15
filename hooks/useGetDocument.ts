'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getDocument } from '@/lib/actions/document.actions';

export const useGetDocument = () => {
	const queryClient = useQueryClient();
	const {
		data: document,
		isLoading,
		mutate: getGoogleDocument,
	} = useMutation({
		mutationFn: getDocument,
		onSuccess: () => {
			// reload to refetch
			queryClient.invalidateQueries({
				queryKey: ['google-doc'],
			});
		},
	});



	return { isLoading, document, getGoogleDocument };
};
