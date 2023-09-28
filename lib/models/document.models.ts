import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
	projectId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Project',
	},
	tiptap_content: String,
});

const Document =
	mongoose.models.Document || mongoose.model('Document', documentSchema);

export default Document;
