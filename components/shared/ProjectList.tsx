import ProjectCard from './ProjectCard';
import Spinner from './Spinner';

interface Project {
	_id: string;
	name: string;
	image: string;
	status: string;
}

interface ProjectListProps {
	isLoading: boolean;
	projects: Project[] | undefined;
}

const ProjectList = ({ isLoading, projects }: ProjectListProps) => {
	if (isLoading)
		return (
			<div className='flex items-center justify-center w-full '>
				<Spinner />
			</div>
		);

	return (
		<div className='grid lg:grid-cols-5 md:grid-cols-4 grid-cols-3 max-sm:grid-cols-2 gap-4 flex-1 h-full'>
			{projects?.length === 0 && <p>No projects</p>}
			{projects?.map(project => (
				<ProjectCard project={project} />
			))}
		</div>
	);
};
export default ProjectList;
