'use server';

// Model
import User from '../models/user.models';
import { revalidatePath } from 'next/cache';
import { connectToDB } from '../mongoose';

interface createUpdateParams {
	userId: string | number;
	username: string | null;
	name: string;
	image: string | number;
}

// create or update user
export const createUpdateUser = async ({
	userId,
	username,
	name,
	image,
}: createUpdateParams) => {
	// connect to mongoDB
	connectToDB();

	try {
		// query
		await User.findByIdAndUpdate(
			userId,
			{ username: username, name, image },
			{ upsert: true }
		);

		console.log(userId, username, name, image);
	} catch (error: any) {
		throw new Error(`Failed to create/update user ${error.message}`);
	}
};
