'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, ListTodo } from 'lucide-react';
import Todo from './Todo';
import Document from './Document';
import useTodo from '@/hooks/useTodo';
import MiniSpinner from './MiniSpinner';

interface SubTask {
	_id: string;
	content: string;
	done: boolean;
}

interface Task {
	_id: string;
	content: string;
	done: boolean;
	subtasks: SubTask[];
}

interface Project {
	_id: string;
	name: string;
	image: string;
	status: string;
	creatorId: string;
	documentId: string;
}

const ProjectOptions = ({ project }: { project: Project }) => {
	const { isLoading, todo } = useTodo(project._id);

	const totalTasks = todo?.tasks?.length;
	const doneTasks = todo?.tasks?.filter(task => task.done);

	return (
		<Tabs defaultValue='document' className='w-full'>
			<TabsList className='grid w-full md:w-[400px] grid-cols-2'>
				<TabsTrigger value='document'>
					<FileText />
				</TabsTrigger>
				<TabsTrigger value='todo' className='flex gap-1'>
					<ListTodo />
					{isLoading ? (
						<MiniSpinner />
					) : (
						<span className='font-nunito'>
							{doneTasks?.length}/{totalTasks}
						</span>
					)}
				</TabsTrigger>
			</TabsList>
			<TabsContent value='document'>
				<Card className='w-full'>
					<CardHeader>
						<CardTitle className='font-josefin-sans'>Google Docs</CardTitle>
					</CardHeader>
					<CardContent>
						<Document />
					</CardContent>
				</Card>
			</TabsContent>
			<TabsContent value='todo'>
				<Card>
					<CardHeader>
						<CardTitle className='font-josefin-sans'>To Do</CardTitle>
					</CardHeader>
					<CardContent>
						<Todo projectId={project._id} />
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	);
};
export default ProjectOptions;
