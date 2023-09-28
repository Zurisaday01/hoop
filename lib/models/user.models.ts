import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	id: {
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
	image: String ,
});

userSchema.virtual('projects', {
	ref: 'Project',
	localField: '_id',
	foreignField: 'creatorId',
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
