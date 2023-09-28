import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
	projectId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Project',
	},
	tasks: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Task',
		},
	],
});

const Todo = mongoose.models.Todo || mongoose.model('Todo', todoSchema);

export default Todo;
