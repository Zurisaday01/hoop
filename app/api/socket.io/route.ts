import { createServer } from 'http';
import { Server, ServerOptions, Socket } from 'socket.io';
import express from 'express';
import cors from 'cors';

import {
	getOrCreateDocument,
	updateDocument,
} from '@/lib/actions/document.actions';

const app = express();
const httpServer = createServer(app);

// Use the CORS middleware to enable CORS for your server
app.use(cors());

const io = new Server(httpServer, {
	cors: {
		origin: '*',
	},
} as Partial<ServerOptions>);

app.get('/api/socket.io/', (req, res) => {
	io.on('connection', async (socket: Socket) => {
		//attribute of the Socket instance, (listener)
		socket.on('get-document', async (projectId: string) => {
			// subscribe the socket to given document
			const document = await getOrCreateDocument({ projectId });
			socket.join(document._id);

			// send and recive the data
			socket.emit('load-document', document.data);

			// listen the send changes
			socket.on('send-changes', (delta: any) => {
				socket.broadcast.to(document._id).emit('receive-changes', delta);
			});

			socket.on('save-document', async (data: any) => {
				await updateDocument({ id: document._id, data });
			});
		});
	});
});

// httpServer.listen(3001);
