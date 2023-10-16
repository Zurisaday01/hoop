'use client';
import Image from 'next/image';
import Tag from './Tag';
import { Button } from '../ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog';
import UpdateProject from '../forms/UpdateProject';
import DeleteProject from '../forms/DeleteProject';
import { DialogDescription } from '@radix-ui/react-dialog';

interface ProjectHeaderProps {
	id: string;
	name: string;
	image: string;
	status: string;
	creatorId: string;
}

const ProjectHeader = ({
	id,
	name,
	image,
	status,
	creatorId,
}: ProjectHeaderProps) => {
	return (
		<div className='flex items-center gap-10'>
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
				<Tag status={status} mini={false}>
					{status}
				</Tag>

				<div className='flex gap-3 mt-1'>
					<Dialog>
						<DialogTrigger asChild>
							<Button className='bg-[#6787F9] dark:bg-[#6787F9] dark:text-light-1 transition duration-150 hover:bg-[#3e58b4]'>
								Update
							</Button>
						</DialogTrigger>
						<DialogContent className='sm:max-w-[400px] bg-light-2'>
							<DialogHeader>
								<DialogTitle className='font-josefin-sans mb-3 text-2xl text-start'>
									Update Project
								</DialogTitle>
								<UpdateProject
									id={id}
									name={name}
									image={image}
									status={status}
									creatorId={creatorId}
								/>
							</DialogHeader>
						</DialogContent>
					</Dialog>

					<Dialog>
						<DialogTrigger asChild>
							<Button className='bg-[#FF6421] dark:bg-[#FF6421] dark:text-light-1  transition duration-150 hover:bg-[#963823]'>
								Delete
							</Button>
						</DialogTrigger>
						<DialogContent className='sm:max-w-[400px]'>
							<DialogHeader>
								<DialogTitle className='font-josefin-sans text-2xl text-start'>
									Delete Project
								</DialogTitle>
								<DialogDescription className='font-nunito mb-3 text-start'>
									Are you sure you want to delete this project?
								</DialogDescription>
								<DeleteProject projectId={id} />
							</DialogHeader>
						</DialogContent>
					</Dialog>
				</div>
			</div>
		</div>
	);
};
export default ProjectHeader;
