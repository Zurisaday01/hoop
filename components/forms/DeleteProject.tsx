'use client';
// REACT HOOK FORM
import { useForm } from 'react-hook-form';

// UI SHADCN COMPONENTS
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

// VALIDATION FORM
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import MiniSpinner from '../shared/MiniSpinner';

import { useToast } from '../ui/use-toast';
import { useDeleteProject } from '@/hooks/useDeleteProject';

const FormSchema = z.object({
	projectId: z.string(),
});

const DeleteProject = ({ projectId }: { projectId: string }) => {
	const { toast } = useToast();
	const { isDeleting, deleteProject } = useDeleteProject();
	const router = useRouter();

	// Define form ui shadcn
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			projectId: projectId,
		},
	});

	// reset using useEffect when the value is loaded
	useEffect(() => {
		form.reset();
	}, [form.formState.isSubmitted]);

	// react hook form
	const onSubmit = async (values: z.infer<typeof FormSchema>) => {
		deleteProject(values.projectId, {
			onSuccess: () => {
				toast({
					title: 'Project successfully deleted',
				});

				// send to the projects page
				router.push('/projects');
			},
			onError: err => {
				toast({
					title: 'Something went wrong!',
				});
			},
		});
	};
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col justify-end gap-4'>
				<FormField
					control={form.control}
					name='projectId'
					render={({ field }) => (
						<FormItem className='hidden'>
							<FormControl>
								<Input type='hidden' {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<div className='flex justify-end gap-3'>
					<Button
						type='submit'
						className='bg-[#FF6421] transition duration-150 hover:bg-[#963823]'
						disabled={form.formState.isSubmitting || isDeleting}>
						{form.formState.isSubmitting || isDeleting ? (
							<MiniSpinner />
						) : (
							<span>Delete</span>
						)}
					</Button>
				</div>
			</form>
		</Form>
	);
};
export default DeleteProject;
