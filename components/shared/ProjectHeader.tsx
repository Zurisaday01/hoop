'use client';
import Image from 'next/image';
import Tag from './Tag';
import { Button } from '../ui/button';

interface ProjectHeaderProps {
	name: string;
	image: string;
	status: string;
}

const ProjectHeader = ({ name, image, status }: ProjectHeaderProps) => {
	return (
		<div className='flex gap-10'>
			<div className='shadow-image rounded-lg overflow-hidden bg-white'>
				<Image
					className='object-cover'
					src={image}
					alt='name'
					width={150}
					height={150}
				/>
			</div>
			<div className='flex flex-col gap-1 p-4 items-start'>
				<h1 className='text-3xl font-josefin-sans'>{name}</h1>
				<Tag status={status}>{status}</Tag>

				<div className='flex gap-3 mt-1'>
					<Button className='bg-[#6787F9] transition duration-150 hover:bg-[#3e58b4]'>
						Edit
					</Button>
					<Button className='bg-[#FF6421] transition duration-150 hover:bg-[#963823]'>
						Delete
					</Button>
				</div>
			</div>
		</div>
	);
};
export default ProjectHeader;
