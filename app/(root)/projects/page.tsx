import ProjectsPortfolio from '@/components/shared/ProjectsPortfolio';
import { currentUser } from '@clerk/nextjs';

const page = async ({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined };
}) => {
	const user = await currentUser();

	return (
		<div className='md:pb-0 pb-28'>
			<ProjectsPortfolio searchParams={searchParams} userId={user?.id} />
		</div>
	);
};
export default page;
