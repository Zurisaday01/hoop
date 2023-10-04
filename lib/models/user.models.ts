import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: true,
		unique: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},
	image: String,
});

// populating virtuals
userSchema.virtual('projects', {
	ref: 'Project',
	localField: '_id',
	foreignField: 'creatorId',
});

// delete mongoose.models['User'];

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
