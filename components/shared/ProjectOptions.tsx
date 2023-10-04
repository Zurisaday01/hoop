'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, ListTodo } from 'lucide-react';
import TextEditor from './TextEditor';

const ProjectOptions = ({ projectId }: { projectId: string }) => {
	return (
		<Tabs defaultValue='document' className='w-full'>
			<TabsList className='grid w-full md:w-[400px] grid-cols-2'>
				<TabsTrigger value='document'>
					<FileText />
				</TabsTrigger>
				<TabsTrigger value='todo' className='flex gap-1'>
					<ListTodo />
					<span className='font-nunito'>0/8</span>
				</TabsTrigger>
			</TabsList>
			<TabsContent value='document'>
				<Card className='w-full'>
					<CardHeader>
						<CardTitle className='font-josefin-sans'>Document</CardTitle>
					</CardHeader>
					<CardContent className=''>
						<TextEditor projectId={projectId} />
					</CardContent>
				</Card>
			</TabsContent>
			<TabsContent value='todo'>
				<Card>
					<CardHeader>
						<CardTitle className='font-josefin-sans'>To Do</CardTitle>
					</CardHeader>
					<CardContent className=''>Content</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	);
};
export default ProjectOptions;
