'use server';

// Model
import User from '../models/user.models';
import { revalidatePath } from 'next/cache';
import { connectToDB } from '../mongoose';
import mongoose from 'mongoose';

interface createUserParams {
	userId: string | number;
	username: string | null;
	name: string;
	image: string | number;
}

// create or update user
export const createUser = async ({
	userId,
	username,
	name,
	image,
}: createUserParams) => {
	// connect to mongoDB
	connectToDB();

	try {
		// convert = id(string) => id(ObjectId)
		// query

		console.log('creating...');

		await User.create({
			userId: userId,
			username: username,
			name: name,
			image: image,
		});
	} catch (error: any) {
		throw new Error(`Failed to create user ${error.message}`);
	}
};
