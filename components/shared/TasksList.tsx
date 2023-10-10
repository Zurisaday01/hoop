'use client';
import Task from './Task';

interface SubTask {
	_id: string;
	content: string;
	done: boolean;
}

interface Task {
	_id: string;
	content: string;
	done: boolean;
	subtasks: SubTask[];
}

const TasksList = ({ tasks, todoId }: { tasks: Task[], todoId: string }) => {
	if (tasks?.length === 0) return <span>You don't have any tasks</span>;

	return (
		<div>
			{tasks.map(task => (
				<Task key={task._id} todoId={todoId} task={task as Task} />
			))}
		</div>
	);
};
export default TasksList;
