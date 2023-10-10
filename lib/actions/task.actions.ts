// 'use server';

// //Model
// import { connectToDB } from '../mongoose';

// interface Params {
// 	todoId: string;
// 	content: string;
// }

// export const createTask = async ({ todoId, content }: Params) => {
// 	// connect to mongoDB
// 	connectToDB();

// 	try {
// 		await Task.create({
// 			todoId,
// 			content,
// 		});
// 	} catch (error: any) {
// 		throw new Error(`Failed to create task ${error.message}`);
// 	}
// };

// // export const getTodo = async (projectId: string) => {
// // 	// connect to mongoDB
// // 	connectToDB();

// // 	try {
// // 		const todo = await Todo.findOne({ projectId: projectId });

// // 		if (!todo) {
// // 			throw new Error('No todo found');
// // 		}

// // 		return todo;
// // 	} catch (error: any) {
// // 		throw new Error(`Failed to get todo ${error.message}`);
// // 	}
// // };
