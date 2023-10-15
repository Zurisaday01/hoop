'use client';
import ProjectHeader from '@/components/shared/ProjectHeader';
import ProjectOptions from '@/components/shared/ProjectOptions';
import useProject from '@/hooks/useProject';

import Spinner from '@/components/shared/Spinner';

const page = ({ params }: { params: { id: string } }) => {
	// const project = await getProject(params.id);
	const { isLoading, project } = useProject(params.id);

	if (isLoading || !project) return <Spinner />;

	return (
		<section className='flex flex-col gap-8'>
			<ProjectHeader
				id={project._id}
				name={project.name}
				image={project.image}
				status={project.status}
				creatorId={project.creatorId}
			/>
			<ProjectOptions project={project} />
		</section>
	);
};
export default page;
