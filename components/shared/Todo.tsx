import CreateTask from '../forms/CreateTask';
import TasksList from './TasksList';
import Spinner from './Spinner';
import useTodo from '@/hooks/useTodo';

const Todo = ({ projectId }: { projectId: string }) => {
	const { isLoading, todo } = useTodo(projectId);

	if (isLoading || !todo) return <Spinner />;

	return (
		<div className='flex flex-col gap-12'>
			<CreateTask todoId={todo._id} />
			<TasksList todoId={todo._id} tasks={todo.tasks} />
		</div>
	);
};
export default Todo;
