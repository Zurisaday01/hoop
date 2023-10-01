'use client';
import { createUser } from '@/lib/actions/user.actions';

const page = () => {
	const handleCreate = async () => {
		await createUser({
			userId: 'weqweqwsqwqw3123123',
			username: 'zury',
			name: 'Zurisaday Espadas',
			image: 'https://',
		});
	};
	return (
		<div>
			<button className='bg-primary-light p-3' onClick={handleCreate}>
				Create user test mongo
			</button>
		</div>
	);
};
export default page;
