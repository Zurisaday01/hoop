'use server';

//Model
import Project from '../models/project.models';
import { connectToDB } from '../mongoose';
import { getOrCreateDocument } from './document.actions';
import { createTodo, getTodo } from './todo.actions';

interface createProjectParams {
	name: string;
	image: string;
	status: string;
	creatorId: string;
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

		//create document and todo
		const documentCreated = await getOrCreateDocument({
			projectId: newProject._id,
		});
		await createTodo(newProject._id);

		// add document id and to the new project document
		newProject.documentId = documentCreated._id;

		// save project in DB
		await newProject.save();

		return newProject;
	} catch (error: any) {
		throw new Error(`Failed to create project ${error.message}`);
	}
};

export const getProject = async (id: string | string[]) => {
	// connect to mongoDB
	connectToDB();

	try {
		const project = await Project.findById(id).populate('todoId');

		if (!project) {
			throw new Error('No project found');
		}

		return project;
	} catch (error: any) {
		throw new Error(`Failed to get project ${error.message}`);
	}
};
