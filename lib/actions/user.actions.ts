'use server';

// Model
import User from '../models/user.models';
import { connectToDB } from '../mongoose';
import { auth } from '@clerk/nextjs';
import clerk from '@clerk/clerk-sdk-node';

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

export const getOauthAccessToken = async () => {
	try {
		const { userId } = auth();

		const [OauthAccessToken] = await clerk.users.getUserOauthAccessToken(
			userId,
			'oauth_google'
		);

		const { token } = OauthAccessToken;

		return token;
	} catch (error: any) {
		throw new Error(`Failed to get Google access token ${error.message}`);
	}
};

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

export const getUser = async (userId: string) => {
	// connect to mongoDB
	connectToDB();

	console.log(userId);

	try {
		// Find the user by the Id from clerk
		const user = await User.findOne({ userId: userId });
		// .populate('projects');

		if (!user) {
			throw new Error('No user found with that ID');
		}

		return user;
	} catch (error: any) {
		throw new Error(`Failed to get user ${error.message}`);
	}
};
