import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			enum: {
				values: ['Waiting', 'In progress', 'Completed'],
				message: '{VALUE} is not supported',
			},
		},
		creatorId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		documentId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Document',
		},
	},
	{
		timestamps: true,
		toObject: { virtuals: true },
		toJSON: { virtuals: true },
	}
);

projectSchema.virtual('todoId', {
	ref: 'Todo',
	localField: '_id',
	foreignField: 'projectId',
	justOne: true,
});

const Project =
	mongoose.models.Project || mongoose.model('Project', projectSchema);

export default Project;
