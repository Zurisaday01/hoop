'use client';
// REACT HOOK FORM

import { useForm } from 'react-hook-form';

// UI SHADCN COMPONENTS
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog';

// VALIDATION FORM
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useEffect } from 'react';

import { useToast } from '../ui/use-toast';

import { PlusIcon } from 'lucide-react';
import { useCreateSubtask } from '@/hooks/useCreateSubtask';
import MiniSpinner from '../shared/MiniSpinner';

const FormSchema = z.object({
	content: z.string().min(5, {
		message: 'Content must have at least 5 characters.',
	}),
	todoId: z.string(),
	taskId: z.string(),
});

const CreateSubtask = ({
	todoId,
	taskId,
	content,
	numSubtasks,
}: {
	todoId: string;
	taskId: string;
	content: string;
	numSubtasks: number;
}) => {
	const { toast } = useToast();
	const { isCreating, createSubtask } = useCreateSubtask();

	// Define form ui shadcn
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			content: '',
			todoId: todoId,
			taskId: taskId,
		},
	});

	// reset using useEffect when the value is loaded
	useEffect(() => {
		form.reset();
	}, [form.formState.isSubmitted]);

	// react hook form
	const onSubmit = async (values: z.infer<typeof FormSchema>) => {
		createSubtask(values, {
			onSuccess: () => {
				toast({
					title: 'Subtask successfully created',
				});
			},
			onError: err => {
				toast({
					title: 'Something went wrong!',
				});
			},
		});
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='p-[7px] h-7 w-7 rounded-full bg-primary-light  hover:bg-primary-dark  dark:bg-primary-light text-dark-1 dark:hover:bg-primary-dark transition duration-300 ease-in-out disabled:bg-gray-400'>
					<PlusIcon className='w-full' />
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[415px] bg-light-2'>
				<DialogHeader>
					<DialogTitle>
						<h2 className='font-josefin-sans text-2xl'>Create subtask</h2>
					</DialogTitle>
					<DialogDescription>
						You can break down the steps of the task{' '}
						<span className='text-dark-1 dark:text-light-1'>"{content}"</span>
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='flex flex-col items-end  gap-4'>
						<FormField
							control={form.control}
							name='todoId'
							render={({ field }) => (
								<FormItem className='hidden'>
									<FormControl>
										<Input type='hidden' {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='taskId'
							render={({ field }) => (
								<FormItem className='hidden'>
									<FormControl>
										<Input type='hidden' {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='content'
							render={({ field }) => (
								<FormItem className='flex flex-col gap-1 w-full'>
									<FormControl>
										<Input
											placeholder='New subtask... '
											{...field}
											className='border-none'
											disabled={form.formState.isSubmitting || isCreating}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<DialogFooter>
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
						</DialogFooter>
					</form>
				</Form>
				<p className='text-xs'>Subtasks: {numSubtasks}</p>
			</DialogContent>
		</Dialog>
	);
};
export default CreateSubtask;
