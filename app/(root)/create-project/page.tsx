import CreateProject from '@/components/forms/CreateProject';
import { getUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';

const page = async () => {
	const user = await currentUser();

	if (!user) return null;

	// get user from database
	const userFromDB = await getUser(user.id);

	return (
		<section>
			<h1 className='heading-primary mb-8'>Create Project</h1>
			<div>
				<CreateProject id={userFromDB._id} />
			</div>
		</section>
	);
};
export default page;
