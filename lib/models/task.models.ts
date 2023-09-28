import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
	{
		todoId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Todo',
		},
		content: {
			type: String,
			required: true,
		},
		done: {
			type: Boolean,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);

export default Task;
