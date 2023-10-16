import Link from 'next/link';
import Tag from './Tag';
import Image from 'next/image';

interface ProjectCardProps {
	project: {
		_id: string;
		name: string;
		image: string;
		status: string;
	};
}

const ProjectCard = ({ project }: ProjectCardProps) => {
	return (
		<Link
			href={`/projects/${project._id}`}
			className='p-3 bg-light-1 dark:bg-dark-1 flex flex-col gap-4 rounded-lg transition-all duration-200 hover:shadow-card'>
			<div className='shadow-image rounded-lg overflow-hidden bg-light-1 relative w-fill sm:h-[150px] h-[110px]'>
				<Image
					src={project.image}
					className='object-cover object-center w-fill h-fill absolute top-0 left-0'
					fill
					objectFit='cover'
					alt={project.name}
				/>
			</div>
			<div className='flex justify-between gap-2 flex-col-reverse items-end'>
				<h2 className='font-josefin-sans self-start'>
					{project.name}
				</h2>
				<Tag status={project.status} mini={true}>
					{project.status}
				</Tag>
			</div>
		</Link>
	);
};
export default ProjectCard;
