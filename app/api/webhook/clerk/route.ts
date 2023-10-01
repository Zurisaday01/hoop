import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// User actions
import { createUser } from '@/lib/actions/user.actions';

export const POST = async (req: Request) => {
	// You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
	const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

	if (!WEBHOOK_SECRET) {
		throw new Error(
			'Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local'
		);
	}

	// Get the headers
	const headerPayload = headers();
	const svix_id = headerPayload.get('svix-id');
	const svix_timestamp = headerPayload.get('svix-timestamp');
	const svix_signature = headerPayload.get('svix-signature');

	// If there are no headers, error out
	if (!svix_id || !svix_timestamp || !svix_signature) {
		return new Response('Error occured -- no svix headers', {
			status: 400,
		});
	}

	// Get the body
	const payload = await req.json();
	const body = JSON.stringify(payload);

	// Create a new SVIX instance with your secret.
	const wh = new Webhook(WEBHOOK_SECRET);

	let evt: WebhookEvent;

	// Verify the payload with the headers
	try {
		evt = wh.verify(body, {
			'svix-id': svix_id,
			'svix-timestamp': svix_timestamp,
			'svix-signature': svix_signature,
		}) as WebhookEvent;
	} catch (err) {
		console.error('Error verifying webhook:', err);
		return new Response('Error occured', {
			status: 400,
		});
	}

	const eventType = evt.type;

	if (eventType === 'user.created') {
		const { id, first_name, last_name, username, image_url } = evt.data || {};

		try {
			// await createUser({
			// 	userId: id,
			// 	username: username,
			// 	name: `${first_name} ${last_name}`,
			// 	image: image_url,
			// });

			return NextResponse.json({ message: 'User created' }, { status: 201 });
		} catch (err) {
			console.log('user.created failed, ', err);
			return NextResponse.json(
				{ message: `Internal Server Error ${err}` },
				{ status: 500 }
			);
		}
	}

	// || eventType === 'user.updated'

	return new Response('', { status: 201 });
};