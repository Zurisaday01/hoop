import ProjectHeader from '@/components/shared/ProjectHeader';
import { getProject } from '@/lib/actions/project.actions';

import ProjectOptions from '@/components/shared/ProjectOptions';

const page = async ({ params }: { params: { id: string } }) => {
	const project = await getProject(params.id);

	if (!project) return null;

	return (
		<section className='flex flex-col gap-8'>
			<ProjectHeader
				name={project.name}
				image={project.image}
				status={project.status}
			/>
			<ProjectOptions projectId={params.id}/>
		</section>
	);
};
export default page;
