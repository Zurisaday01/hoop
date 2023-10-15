import { createDocument } from '@/lib/actions/document.actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateDocument = () => {
	const queryClient = useQueryClient();
	const {
		data: createdDocument,
		isLoading,
		mutate: createGoogleDocument,
	} = useMutation({
		mutationFn: createDocument,
		onSuccess: () => {
			// reload to refetch
			queryClient.invalidateQueries({
				queryKey: ['google-doc'],
			});
		},
	});

	return { isLoading, createdDocument, createGoogleDocument };
};
