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
interface updateUserParams {
	userId: string | number;
	username: string | null;
	image: string | number;
}

export const createUser = async ({
	userId,
	username,
	name,
	image,
}: createUserParams) => {
	// connect to mongoDB
	connectToDB();

	try {
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

export const updateUser = async ({
	userId,
	username,
	image,
}: updateUserParams) => {
	// connect to mongoDB
	connectToDB();

	try {
		const user = await User.findOneAndUpdate(
			{ userId: userId },
			{ username: username, image: image },
			{
				new: true,
			}
		);

		if (!user) {
			throw new Error('No user found with that ID');
		}
	} catch (error: any) {
		throw new Error(`Failed to create user ${error.message}`);
	}
};

export const deleteUser = async ({
	userId,
}: {
	userId: string | undefined;
}) => {
	// connect to mongoDB
	connectToDB();

	try {
		// Find the community by its ID and delete it
		const user = await User.findOneAndDelete({
			userId: userId,
		});

		if (!user) {
			throw new Error('No user found with that ID');
		}
	} catch (error: any) {
		throw new Error(`Failed to delete user ${error.message}`);
	}
};
