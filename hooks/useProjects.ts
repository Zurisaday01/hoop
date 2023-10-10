import { getProjects } from '@/lib/actions/project.actions';
import { useQuery } from '@tanstack/react-query';

const useProjects = ({
	searchString,
	pageNumber,
	pageSize,
}: {
	searchString: string;
	pageNumber: number;
	pageSize: number;
}) => {
	const { data, isLoading, error } = useQuery({
		queryKey: ['projects', pageNumber, searchString],
		queryFn: () => getProjects({ searchString, pageNumber, pageSize }),
	});

	return { isLoading, error, data };
};

export default useProjects;
