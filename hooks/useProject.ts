'use client';
import { getProject } from '@/lib/actions/project.actions';
import { useQuery } from '@tanstack/react-query';

const useProject = (projectId: string) => {
	const {
		data: project,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['project', projectId],
		queryFn: () => getProject(projectId),
	});

	return { isLoading, error, project };
};

export default useProject;
