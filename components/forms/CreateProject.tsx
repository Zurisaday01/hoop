'use client';
// REACT HOOK FORM
import ReactDOM from 'react-dom'; // Type
import { useForm, SubmitHandler } from 'react-hook-form';

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
import { ChangeEvent, useState } from 'react';
import { isBase64Image, useUploadThing } from '@/lib/utils';

interface FormInput {
	name: string;
	image: string;
	status: string;
}

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
});

const CreateProject = () => {
	// react hook form
	const { register, handleSubmit, formState } = useForm<FormInput>();
	const { isSubmitting } = formState;

	console.log(isSubmitting, 'STATUS');
	// toast
	const { toast } = useToast();

	// setFile
	const [files, setFiles] = useState<File[]>([]);
	const { startUpload } = useUploadThing('media', {
		onClientUploadComplete: () => {
			console.log('image uploaded');
			toast({
				title: 'Upload Completed',
				description: 'Your image was succesfully uploaded! 😁',
			});
		},
	});

	// Define form ui shadcn
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: '',
			image: '',
			status: 'waiting',
		},
	});

	// react hook form
	const onSubmit = async (values: z.infer<typeof FormSchema>) => {
		// const blob = values.image;

		// const hasImageChange = isBase64Image(blob);

		// if (hasImageChange) {
		// 	const imgResponse = await startUpload(files);

		// 	if (imgResponse && imgResponse[0].url) {
		// 		// Update the value
		// 		values.image = imgResponse[0].url;
		// 	}
		// }

		// change status format ('in-progress' => 'In progress')
		values.status =
			values.status.charAt(0).toUpperCase() +
			values.status.slice(1).replace(/-/g, ' ');

		console.log(values);
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
					name='name'
					render={({ field }) => (
						<FormItem className='flex flex-col gap-1'>
							<FormLabel className='form__label'>Name</FormLabel>
							<FormControl>
								<Input
									placeholder='Project '
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
					name='image'
					render={({ field }) => (
						<FormItem className='flex flex-col gap-1'>
							<FormLabel className='form__label block mb-2  text-dark-1 dark:text-light-1'>
								Cover image
							</FormLabel>
							<FormControl className='flex-1'>
								<Input
									type='file'
									accept='image/*'
									placeholder='Choose cover image'
									className='input_upload dark:bg-dark-1 bg-light-1 border-none'
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
						<FormItem className='flex flex-col gap-1'>
							<FormLabel className='form__label'>Status</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}>
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
				<Button
					type='submit'
					className='bg-primary-light  hover:bg-primary-dark  dark:bg-primary-light text-dark-1 dark:hover:bg-primary-dark transition duration-300 ease-in-out w-full'
					disabled={isSubmitting}>
					Submit
				</Button>
			</form>
		</Form>
	);
};
export default CreateProject;
