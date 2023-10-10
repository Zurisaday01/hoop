import mongoose from 'mongoose';

const subtaskSchema = new mongoose.Schema({
	content: {
		type: String,
		required: true,
	},
	done: {
		type: Boolean,
		default: false,
	},
});

const taskSchema = new mongoose.Schema(
	{
		content: {
			type: String,
			required: true,
		},
		done: {
			type: Boolean,
			default: false,
		},
		subtasks: [subtaskSchema],
	},
	{
		timestamps: true,
	}
);

const todoSchema = new mongoose.Schema({
	projectId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Project',
	},
	tasks: [taskSchema],
});

// delete mongoose.models['Todo'];
const Todo = mongoose.models.Todo || mongoose.model('Todo', todoSchema);

export default Todo;
