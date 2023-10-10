'use client';

import { getTodo } from '@/lib/actions/todo.actions';
import { useQuery } from '@tanstack/react-query';

const useTodo = (projectId: string) => {
	const {
		data: todo,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['todo', projectId],
		queryFn: () => getTodo(projectId),
	});

	return { isLoading, error, todo };
};

export default useTodo;
