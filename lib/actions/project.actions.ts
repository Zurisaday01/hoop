'use server';

import { FilterQuery, SortOrder } from 'mongoose';
//Model
import Project from '../models/project.models';
import { connectToDB } from '../mongoose';
import { createGoogleDocument } from './document.actions';
import { createTodo, deleteTodo } from './todo.actions';
import User from '../models/user.models';
import { getOauthAccessToken } from './user.actions';

interface createProjectParams {
	name: string;
	image: string;
	status: string;
	creatorId: string;
}

interface Project {
	_id: string;
	name: string;
	image: string;
	status: string;
	creatorId: string;
	documentId: string;
}

export const createProject = async ({
	name,
	image,
	status,
	creatorId,
}: createProjectParams) => {
	// connect to mongoDB
	connectToDB();

	try {
		// create project
		const newProject = new Project({
			name,
			image,
			status,
			creatorId,
		});

		// get Oauth Google Token
		const token = await getOauthAccessToken();

		//create document
		const googleDocsCreated = await createGoogleDocument(
			token,
			newProject.name
		);

		// create todo
		await createTodo(newProject._id);

		// add document id and to the new project document
		newProject.documentId = googleDocsCreated.documentId;

		// save project in DB
		await newProject.save();

		return newProject;
	} catch (error: any) {
		throw new Error(`Failed to create project ${error.message}`);
	}
};

export const getProject = async (id: string | string[]): Promise<any> => {
	// connect to mongoDB
	connectToDB();

	try {
		const project = await Project.findById(id).populate('todoId').lean();

		if (!project) {
			throw new Error('No project found');
		}

		return project;
	} catch (error: any) {
		throw new Error(`Failed to get project ${error.message}`);
	}
};

export const updateProject = async ({
	projectId,
	creatorId,
	image,
	name,
	status,
}: {
	projectId: string;
	creatorId: string;
	image: string;
	name: string;
	status: string;
}) => {
	// connect to mongoDB
	connectToDB();

	try {
		const updatedProject = await Project.findByIdAndUpdate(
			projectId,
			{ image: image, name: name, status: status },
			{ new: true }
		);

		if (!updatedProject) {
			throw new Error('No project found');
		}
	} catch (error: any) {
		throw new Error(`Failed to update project ${error.message}`);
	}
};

export const deleteProject = async (projectId: string) => {
	// connect to mongoDB
	connectToDB();

	try {
		// delete project
		const project = await Project.findByIdAndDelete(projectId);

		if (!project) {
			throw new Error('No project found');
		}

		// delete todo
		await deleteTodo(project._id);
	} catch (error: any) {
		throw new Error(`Failed to delete project ${error.message}`);
	}
};

export const getProjects = async ({
	searchString = '',
	pageNumber = 1,
	pageSize = 20,
	sortBy = 'desc',
	userId,
}: {
	searchString?: string;
	pageNumber?: number;
	pageSize?: number;
	sortBy?: SortOrder;
	userId: string | undefined | null;
}) => {
	// connect to mongoDB
	connectToDB();

	try {
		// get the current user
		const user = await User.findOne({ userId: userId }).exec();

		const totalCount = await Project.find({ creatorId: user._id }).exec();
		// Calculate the number of communities to skip based on the page number and page size.
		const skipAmount = (pageNumber - 1) * pageSize;

		// Create a case-insensitive regular expression for the provided search string.
		const regex = new RegExp(searchString, 'i');

		const query: FilterQuery<typeof Project> = {
			name: { $regex: regex }, // Use the $regex operator to perform a case-insensitive search on the 'name' field.
			creatorId: user._id,
		};

		// Define the sort options for the fetched communities based on createdAt field and provided sort order.
		const sortOptions = { createdAt: sortBy };

		// Create a query to fetch the communities based on the search and sort criteria.
		const projectsQuery = Project.find(query)
			.sort(sortOptions)
			.skip(skipAmount)
			.limit(pageSize);

		// Count the total number of communities that match the search criteria (without pagination).
		const totalProjectsCount = await Project.countDocuments(query);

		const projects = await projectsQuery.exec();

		// Check if there are more communities beyond the current page.
		const isNext = totalProjectsCount > skipAmount + projects.length;

		return { projects, totalCount, isNext };
	} catch (error: any) {
		throw new Error(`Failed to get project ${error.message}`);
	}
};

export const filterMonthlyProjectCounts = async ({
	userId,
	month,
	year,
}: {
	userId: string | null | undefined;
	month: string;
	year: string;
}) => {
	// connect to mongoDB
	connectToDB();

	try {
		// get the current user
		const user = await User.findOne({ userId: userId }).exec();
		const projects = await Project.find({ creatorId: user._id }).exec();

		const filtedProjects = projects?.filter(project => {
			const projectDate = project.createdAt;
			return (
				projectDate.getMonth() === +month && projectDate.getFullYear() === +year
			);
		});

		return filtedProjects;
	} catch (error: any) {
		throw new Error(`Failed to get project ${error.message}`);
	}
};
