'use server';

// Model
import User from '../models/user.models';
import { revalidatePath } from 'next/cache';

interface createUpdateParams {
	userId: string;
	username: string;
	name: string;
	image: string;
}

// create or update user
export const createUpdateUser = async ({
	userId,
	username,
	name,
	image,
}: createUpdateParams) => {
	// connect to mongoDB

	try {
		// query
		await User.findByIdAndUpdate(
			userId,
			{ username: username.toLowerCase(), name, image },
			{ upsert: true }
		);
	} catch (error: any) {
		throw new Error(`Failed to create/update user ${error.message}`);
	}
};
