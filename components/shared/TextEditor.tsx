'use client';
import React, { useEffect, useState } from 'react';
import 'quill/dist/quill.snow.css';
import { io, Socket } from 'socket.io-client';
import { useQuill } from 'react-quilljs';
// import { ImageResize } from 'quill-image-resize-module';

const SAVE_INTERVAL_MS = 2000;

interface TextEditorProps {
	projectId: string;
}

export default function TextEditor({ projectId }: TextEditorProps) {
	const [socket, setSocket] = useState<Socket | null>(null);
	// const [quill, setQuill] = useState<Quill | null>(null);
	const { quill, quillRef, Quill } = useQuill({
		modules: {
			// ...
			ImageResize: {
				// ...
				toolbarStyles: {
					backgroundColor: '#0000',
					border: 'none',
					color: '#ffffff',
				},
			},
		},
	});

	if (Quill && !quill) {
		// For execute this line only once.
		const ImageResize = require('quill-image-resize').default; // Install with 'yarn add quill-magic-url'
		Quill.register('modules/ImageResize', ImageResize);
	}

	useEffect(() => {
		const s = io('https://hoop-lac.vercel.app/api/socket.io');

		setSocket(s);

		return () => {
			s.disconnect();
		};
	}, []);

	useEffect(() => {
		if (socket == null || quill == null) return;

		//one-time listener function
		socket.once('load-document', document => {
			quill.setContents(document);
			quill.enable();
		});

		socket.emit('get-document', projectId);
	}, [socket, quill, projectId]);

	useEffect(() => {
		if (socket == null || quill == null) return;

		const interval = setInterval(() => {
			socket.emit('save-document', quill.getContents());
		}, SAVE_INTERVAL_MS);

		return () => {
			clearInterval(interval);
		};
	}, [socket, quill]);

	useEffect(() => {
		if (socket == null || quill == null) return;

		const handler = (delta: any) => {
			quill.updateContents(delta);
		};
		socket.on('receive-changes', handler);

		return () => {
			socket.off('receive-changes', handler);
		};
	}, [socket, quill]);

	useEffect(() => {
		if (socket == null || quill == null) return;

		const handler = (delta: any, oldDelta: any, source: string) => {
			if (source !== 'user') return;
			socket.emit('send-changes', delta);
		};
		quill.on('text-change', handler);

		return () => {
			quill.off('text-change', handler);
		};
	}, [socket, quill]);

	return (
		<div>
			<div ref={quillRef} />
		</div>
	);
}
