import ProjectsPortfolio from '@/components/shared/ProjectsPortfolio';
import { currentUser } from '@clerk/nextjs';

const page = async ({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined };
}) => {
	const user = await currentUser();

	return (
		<>
			<ProjectsPortfolio searchParams={searchParams} userId={user?.id} />
		</>
	);
};
export default page;
