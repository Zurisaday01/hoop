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

import MiniSpinner from '../shared/MiniSpinner';

//
import { usePathname } from 'next/navigation';
import { useCreateTask } from '@/hooks/useCreateTask';
import { useToast } from '../ui/use-toast';

const FormSchema = z.object({
	content: z.string().min(2, {
		message: 'Content must be at least 2 characters.',
	}),
	todoId: z.string(),
});

const CreateTask = ({ todoId }: { todoId: string }) => {
	const pathname = usePathname();
	const { toast } = useToast();
	const { isCreating, createTask } = useCreateTask();

	// Define form ui shadcn
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			content: '',
			todoId: todoId,
		},
	});

	// reset using useEffect when the value is loaded
	useEffect(() => {
		form.reset();
	}, [form.formState.isSubmitted]);

	// react hook form
	const onSubmit = async (values: z.infer<typeof FormSchema>) => {
		createTask(
			{ ...values, path: pathname },
			{
				onSuccess: () => {
					toast({
						title: 'Task successfully created',
						description: "Let's go!!",
					});
				},
				onError: err => {
					toast({
						title: 'Something went wrong!',
					});
				},
			}
		);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col md:flex-row gap-4'>
				<FormField
					control={form.control}
					name='todoId'
					render={({ field }) => (
						<FormItem className='hidden'>
							<FormControl>
								<Input placeholder='Project ' type='hidden' {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='content'
					render={({ field }) => (
						<FormItem className='flex flex-col gap-1 flex-1'>
							<FormControl>
								<Input
									placeholder='New task... '
									{...field}
									className='border border-slate-400'
									disabled={form.formState.isSubmitting || isCreating}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<div className='flex justify-end gap-3'>
					<Button
						type='submit'
						className='bg-primary-light  hover:bg-primary-dark  dark:bg-primary-light text-dark-1 dark:hover:bg-primary-dark transition duration-300 ease-in-out disabled:bg-gray-400'
						disabled={form.formState.isSubmitting || isCreating}>
						{form.formState.isSubmitting || isCreating ? (
							<MiniSpinner />
						) : (
							<span>Create</span>
						)}
					</Button>
					<Button
						type='reset'
						className='transition duration-300 ease-in-out'
						disabled={form.formState.isSubmitting || isCreating}
						onClick={() => form.reset()}>
						Cancel
					</Button>
				</div>
			</form>
		</Form>
	);
};
export default CreateTask;
