const { Hocuspocus } = require('@hocuspocus/server');
const { onStoreDocument, onLoadDocument } = require('./utils');

// Configure the server …
const server = new Hocuspocus({
	port: 1234,
	debounce: 5000,
});

// … and run it!
server.listen();
