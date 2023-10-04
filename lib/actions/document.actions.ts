'use server';
import Document from '../models/document.models';
import { connectToDB } from '../mongoose';

export const getOrCreateDocument = async ({
	projectId,
	data = '',
}: {
	projectId: string;
	data?: string;
}) => {
	// connect to mongoDB
	connectToDB();

	try {
		if (!projectId) {
			throw new Error('projectId is required');
		}

		// get Document from DB if exists and update it
		const document = await Document.findOne({ projectId });

		console.log('DOCUMENT', document);

		// if it does not, create it
		if (!document) {
			return await Document.create({
				projectId: projectId,
				data: data,
			});
		} else {
			return document;
		}
	} catch (error: any) {
		throw new Error(`Failed to get or create document ${error.message}`);
	}
};

export const updateDocument = async ({
	id,
	data = '',
}: {
	id: string;
	data: string;
}) => {
	// connect to mongoDB
	connectToDB();

	try {
		const document = await Document.findByIdAndUpdate(id, { data });

		if (!document) {
			throw new Error('No document found');
		}
	} catch (error: any) {
		throw new Error(`Failed to update document ${error.message}`);
	}
};
