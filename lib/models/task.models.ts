import mongoose from 'mongoose';

export const taskSchema = new mongoose.Schema(
	{
		content: {
			type: String,
			required: true,
		},
		done: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: true,
	}
);

