'use server';

//Model
import Todo from '../models/todo.models';
import { connectToDB } from '../mongoose';

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

export const getTodo = async (projectId: string) => {
	// connect to mongoDB
	connectToDB();

	try {
		const todo = await Todo.findOne({ projectId: projectId });

		if (!todo) {
			throw new Error('No todo found');
		}

		return todo;
	} catch (error: any) {
		throw new Error(`Failed to get todo ${error.message}`);
	}
};
