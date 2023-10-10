'use server';

import { revalidatePath } from 'next/cache';
//Model
import Todo from '../models/todo.models';
import { connectToDB } from '../mongoose';
import { QueryFunctionContext } from 'react-query';

interface createTaskParams {
	todoId: string;
	content: string;
	path: string;
}
interface createSubtaskParams {
	todoId: string;
	taskId: string;
	content: string;
}

export const createTodo = async (projectId: string) => {
	// connect to mongoDB
	connectToDB();

	try {
		await Todo.create({
			projectId: projectId,
		});
	} catch (error: any) {
		throw new Error(`Failed to create todo ${error.message}`);
	}
};

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
interface Todo {
	_id: string;
	projectId: string;
	tasks: Task[];
}

export const getTodo = async (projectId: string): Promise<Todo> => {
	// connect to mongoDB
	connectToDB();
	try {
		// NOTE: .lean() solved the problem
		//This can help prevent circular references caused by Mongoose's internal data structures.
		const todo = await Todo.findOne({ projectId: projectId }).lean().exec();

		console.log('ID', projectId);

		if (!todo) {
			throw new Error('No todo found');
		}

		return todo;
	} catch (error: any) {
		throw new Error(`Failed to get todo ${error.message}`);
	}
};

// Task Actions

export const createTask = async ({
	todoId,
	content,
	path,
}: createTaskParams) => {
	// connect to mongoDB
	connectToDB();
	try {
		// get the todo
		const todo = await Todo.findById(todoId);

		if (!todo) {
			throw new Error('No todo found');
		}

		// create the new task
		const newTask = {
			content: content,
		};

		// Add the new task to the tasks array of the Todo document
		todo.tasks.push(newTask);

		// Save the updated Todo document
		todo.save();

		// revalidate the path
		revalidatePath(path);
	} catch (error: any) {
		throw new Error(`Failed to create task ${error.message}`);
	}
};

export const updateTask = async ({
	todoId,
	taskId,
	newContent,
}: {
	todoId: string;
	taskId: string;
	newContent: string;
}) => {
	// connect to mongoDB
	connectToDB();
	try {
		// get the todo
		const updatedTodo = await Todo.findOneAndUpdate(
			{
				_id: todoId,
				'tasks._id': taskId, // Find the Todo with the given todoId and the task with the given taskId
			},
			{
				$set: {
					'tasks.$.content': newContent, // Update the content of the task with the given taskId
				},
			}
		);

		if (!updatedTodo) {
			throw new Error('No todo or task found');
		}
	} catch (error: any) {
		throw new Error(`Failed to update task ${error.message}`);
	}
};

export const deleteTask = async ({
	todoId,
	taskId,
}: {
	todoId: string;
	taskId: string;
}) => {
	// connect to mongoDB
	connectToDB();
	try {
		const updatedTodo = await Todo.findOneAndUpdate(
			{
				_id: todoId,
			},
			{
				$pull: {
					tasks: { _id: taskId }, // Remove the task with the given taskId
				},
			}
		);

		if (!updatedTodo) {
			throw new Error('No todo or task found');
		}
	} catch (error: any) {
		throw new Error(`Failed to delete task ${error.message}`);
	}
};

export const createSubtask = async ({
	todoId,
	taskId,
	content,
}: createSubtaskParams) => {
	// connect to mongoDB
	connectToDB();
	try {
		// get the todo
		const todo = await Todo.findById(todoId);

		if (!todo) {
			throw new Error('No todo found');
		}

		// Find the task
		const task = todo.tasks.find(
			(task: { _id: { toString: () => string } }) =>
				task._id.toString() === taskId
		);

		if (!task) {
			throw new Error('No task found');
		}
		// Add subtasks to the found task
		task.subtasks.push({ content: content });

		// Save the updated Todo document
		todo.save();
	} catch (error: any) {
		throw new Error(`Failed to create subtask ${error.message}`);
	}
};

// subtask includes the contant and done
export const updateSubtask = async ({
	todoId,
	taskId,
	subtaskId,
	newContent,
}: {
	todoId: string;
	taskId: string;
	subtaskId: string;
	newContent: string;
}) => {
	// connect to mongoDB
	connectToDB();
	try {
		// find the todo which contains the task
		const updatedTodo = await Todo.findOne({
			_id: todoId,
			'tasks._id': taskId, // Find the Todo with the given todoId and the task with the given taskId
		});

		if (!updatedTodo) {
			throw new Error('No todo or task found');
		}

		// Find the task within the found Todo
		const task = updatedTodo.tasks.find(
			(t: { _id: { toString: () => string } }) => t._id.toString() === taskId
		);

		if (!task) {
			throw new Error('Task not found');
		}

		// Find the subtask within the found task
		const subtask = task.subtasks.find(
			(st: { _id: { toString: () => string } }) =>
				st._id.toString() === subtaskId
		);

		if (!subtask) {
			throw new Error('Subtask not found');
		}

		// Update the content of the subtask
		subtask.content = newContent;

		// Save the updated Todo
		await updatedTodo.save();
	} catch (error: any) {
		throw new Error(`Failed to update subtask ${error.message}`);
	}
};

export const deleteSubtask = async ({
	todoId,
	taskId,
	subtaskId,
}: {
	todoId: string;
	taskId: string;
	subtaskId: string;
}) => {
	// connect to mongoDB
	connectToDB();
	try {
		const updatedTodo = await Todo.findOneAndUpdate(
			{
				_id: todoId,
				'tasks._id': taskId, // Find the Todo with the given todoId and the task with the given taskId
			},
			{
				$pull: {
					'tasks.$.subtasks': { _id: subtaskId }, // Remove the subtask with the specified subtaskId
				},
			}
		);

		if (!updatedTodo) {
			throw new Error('Todo or task or subtask not found');
		}
	} catch (error: any) {
		throw new Error(`Failed to delete subtask ${error.message}`);
	}
};

export const updateDoneStatus = async ({
	todoId,
	taskId,
	newDoneStatus,
}: {
	todoId: string;
	taskId: string;
	newDoneStatus: boolean;
}) => {
	try {
		// get the todo and update with aggragation pipeline
		const updatedTodo = await Todo.findOneAndUpdate(
			{
				_id: todoId,
				'tasks._id': taskId, // Find the Todo with the given todoId and the task with the given taskId
			},
			{
				$set: {
					'tasks.$.done': newDoneStatus, // Update the 'done' property of the task with the given taskId
				},
			}
		);

		if (!updatedTodo) {
			throw new Error('No todo or task found');
		}
	} catch (error: any) {
		throw new Error(`Failed to update done status ${error.message}`);
	}
};

export const updateDoneStatusSubtask = async ({
	todoId,
	taskId,
	subtaskId,
	newDoneStatus,
}: {
	todoId: string;
	taskId: string;
	subtaskId: string;
	newDoneStatus: boolean;
}) => {
	try {
		// find the todo which contains the task
		const updatedTodo = await Todo.findOne({
			_id: todoId,
			'tasks._id': taskId, // Find the Todo with the given todoId and the task with the given taskId
		});

		if (!updatedTodo) {
			throw new Error('No todo or task found');
		}

		// Find the task within the found Todo
		const task = updatedTodo.tasks.find(
			(t: { _id: { toString: () => string } }) => t._id.toString() === taskId
		);

		if (!task) {
			throw new Error('Task not found');
		}

		// Find the subtask within the found task
		const subtask = task.subtasks.find(
			(st: { _id: { toString: () => string } }) =>
				st._id.toString() === subtaskId
		);

		if (!subtask) {
			throw new Error('Subtask not found');
		}

		// Update the content of the subtask
		subtask.done = newDoneStatus;

		// Save the updated Todo
		await updatedTodo.save();
	} catch (error: any) {
		throw new Error(`Failed to update subtask done status ${error.message}`);
	}
};
