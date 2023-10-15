import { getProjects } from '@/lib/actions/project.actions';
import { useQuery } from '@tanstack/react-query';
import { SortOrder } from 'mongoose';

const useProjects = ({
	searchString,
	pageNumber,
	pageSize,
	sortBy,
	userId,
}: {
	searchString?: string;
	pageNumber?: number;
	pageSize?: number;
	sortBy?: string;
	userId: string | null | undefined;
}) => {
	const { data, isLoading, error } = useQuery({
		queryKey: ['projects', pageNumber, searchString, sortBy],
		queryFn: () =>
			getProjects({
				searchString,
				pageNumber,
				pageSize,
				sortBy: sortBy as SortOrder,
				userId: userId,
			}),
	});

	return { isLoading, error, data };
};

export default useProjects;
