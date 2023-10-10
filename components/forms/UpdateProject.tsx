'use client';
// REACT HOOK FORM
import ReactDOM from 'react-dom'; // Type
import { useForm } from 'react-hook-form';

// UI SHADCN COMPONENTS
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';
import { useToast } from '../ui/use-toast';

// VALIDATION FORM
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ChangeEvent, useEffect, useState } from 'react';
import { isBase64Image, useUploadThing } from '@/lib/utils';
import { createProject } from '@/lib/actions/project.actions';
import MiniSpinner from '../shared/MiniSpinner';
import { ToastAction } from '@radix-ui/react-toast';
import Link from 'next/link';
import { useUpdateProject } from '@/hooks/useUpdateProject';
import Spinner from '../shared/Spinner';

const FormSchema = z.object({
	name: z.string().min(2, {
		message: 'Name must be at least 2 characters.',
	}),
	image: z.string().min(2, {
		message: 'You need to upload an image',
	}),
	status: z.string({
		required_error: 'Please select an status',
	}),
	creatorId: z.string(),
});

const UpdateProject = ({
	id,
	name,
	image,
	status,
	creatorId,
}: {
	id: string;
	name: string;
	image: string;
	status: string;
	creatorId: string;
}) => {
	const { toast } = useToast();

	// setFile
	const [files, setFiles] = useState<File[]>([]);
	const { startUpload } = useUploadThing('media');
	const { isUpdating, updateProject } = useUpdateProject(id);

	// Define form ui shadcn
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: name,
			image: image,
			status: status.toLowerCase().replace(/\s+/g, '-'),
			creatorId: creatorId,
		},
	});

	// react hook form
	const onSubmit = async (values: z.infer<typeof FormSchema>) => {
		try {
			if (files.length > 0) {
				// if the image is different upload it to uploadthing
				const blob = values.image;

				const hasImageChange = isBase64Image(blob);

				if (hasImageChange) {
					const imgResponse = await startUpload(files);

					if (imgResponse && imgResponse[0].url) {
						// Update the value
						values.image = imgResponse[0].url;
					}
				}
			}

			values.status =
				values.status.charAt(0).toUpperCase() +
				values.status.slice(1).replace(/-/g, ' ');

			// update project
			updateProject({
				projectId: id,
				creatorId: values.creatorId,
				image: values.image,
				name: values.name,
				status: values.status,
			});

			toast({
				title: 'Project successfully updated',
			});
		} catch (error) {
			setFiles([]);
			toast({
				title: 'Something went wrong 😔!!',
				description: 'Failed to create project',
			});
		}
	};

	// handle image from uploadthing
	const handleImage = (
		e: ChangeEvent<HTMLInputElement>,
		fieldChange: (value: string) => void
	) => {
		e.preventDefault();

		const fileReader = new FileReader();

		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];
			setFiles(Array.from(e.target.files));

			if (!file.type.includes('image')) return;

			fileReader.onload = async event => {
				const imageDataUrl = event.target?.result?.toString() || '';
				fieldChange(imageDataUrl);
			};

			fileReader.readAsDataURL(file);
		}
	};
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col gap-8'>
				<FormField
					control={form.control}
					name='creatorId'
					render={({ field }) => (
						<FormItem className='hidden text-start'>
							<FormControl>
								<Input
									placeholder='Project '
									type='hidden'
									{...field}
									className='dark:bg-dark-1 bg-light-1 border-none'
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem className='flex flex-col gap-1 text-start'>
							<FormLabel className='form__label'>Name</FormLabel>
							<FormControl>
								<Input
									placeholder='Project '
									{...field}
									className='dark:bg-dark-1 bg-light-1 border-none'
									disabled={form.formState.isSubmitting || isUpdating}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='image'
					render={({ field }) => (
						<FormItem className='flex flex-col gap-1 text-start'>
							<FormLabel className='form__label block mb-2  text-dark-1 dark:text-light-1'>
								New cover image
							</FormLabel>
							<FormControl className='flex-1'>
								<Input
									type='file'
									accept='image/*'
									placeholder='Choose cover image'
									className='input_upload dark:bg-dark-1 bg-light-1 border-none'
									disabled={form.formState.isSubmitting || isUpdating}
									onChange={e => handleImage(e, field.onChange)}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='status'
					render={({ field }) => (
						<FormItem className='flex flex-col gap-1 text-start'>
							<FormLabel className='form__label'>Status</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									disabled={form.formState.isSubmitting || isUpdating}
									value={field.value}>
									<SelectTrigger className='w-[180px] dark:bg-dark-1 bg-light-1 border-none'>
										<SelectValue placeholder='Select a status' />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectItem value='waiting'>Waiting</SelectItem>
											<SelectItem value='in-progress'>In progress</SelectItem>
											<SelectItem value='completed'>Completed</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='flex justify-end gap-3'>
					<Button
						type='submit'
						className='bg-primary-light  hover:bg-primary-dark  dark:bg-primary-light text-dark-1 dark:hover:bg-primary-dark transition duration-300 ease-in-out disabled:bg-gray-400'
						disabled={form.formState.isSubmitting || isUpdating}>
						{form.formState.isSubmitting || isUpdating ? (
							<MiniSpinner />
						) : (
							<span>Submit</span>
						)}
					</Button>
					<Button
						type='reset'
						className='transition duration-300 ease-in-out'
						disabled={form.formState.isSubmitting || isUpdating}
						onClick={() => form.reset()}>
						Cancel
					</Button>
				</div>
			</form>
		</Form>
	);
};
export default UpdateProject;
