import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '../ui/accordion';
import { Checkbox } from '../ui/checkbox';

import { Input } from '../ui/input';
import CreateSubtask from '../forms/CreateSubtask';
import DropdownMenuTask from './DropdownMenuTask';
import { useEffect, useState } from 'react';
import UpdateTask from '../forms/UpdateTask';
import CheckboxDone from './CheckboxDone';
import DropdownMenuSubtask from './DropdownMenuSubtask';
import UpdateSubtask from '../forms/UpdateSubtask';
import CheckboxDoneSubtask from './CheckboxDoneSubtask';

interface SubTask {
	_id: string;
	content: string;
	done: boolean;
}

interface TaskProps {
	todoId: string;
	task: {
		_id: string;
		content: string;
		done: boolean;
		subtasks: SubTask[];
	};
}
const Task = ({ task, todoId }: TaskProps) => {
	const { content, done, subtasks } = task;
	const [isEdit, setIsEdit] = useState(false);
	const [isEditSubtask, setIsEditSubtask] = useState('');
	const [isTaskDone, setIsTaskDone] = useState(false);

	// Function to check if all subtasks are done for this task
	const areAllSubtasksDone = () => {
		return subtasks.every(subtask => subtask.done === true);
	};

	useEffect(() => {
		// If there are subtasks, check if all subtasks are done
		if (subtasks.length > 0) {
			setIsTaskDone(areAllSubtasksDone());
		}
	}, [subtasks, isTaskDone]);

	return (
		<div className='flex'>
			<Accordion
				type='single'
				collapsible
				className='w-full p-3  flex justify-between items-center'>
				<AccordionItem value='item-1' className='w-full'>
					<AccordionTrigger disabled={isEdit}>
						<div className='flex justify-between w-full'>
							<div className='flex gap-3 w-full items-center'>
								<CheckboxDone
									isTaskDone={isTaskDone}
									todoId={todoId}
									taskId={task._id}
									done={done}
									qtySubtasks={subtasks.length}
								/>
								{isEdit ? (
									<UpdateTask
										todoId={todoId}
										taskId={task._id}
										content={content}
									/>
								) : (
									<h3
										className={`font-josefin-sans text-base text-start ${
											done && 'line-through'
										}`}>
										{content}
									</h3>
								)}
							</div>
						</div>
					</AccordionTrigger>

					<AccordionContent>
						{subtasks.length === 0 ? (
							<span>No subtasks</span>
						) : (
							subtasks.map(subtask => (
								<div
									key={subtask._id}
									className='font-nunito text-sm p-4 ml-3 border-b border-slate-300 flex justify-between w-full'>
									<div className='flex gap-3 items-center w-full'>
										<CheckboxDoneSubtask
											id={`subtask-${subtask._id}`}
											todoId={todoId}
											taskId={task._id}
											subtaskId={subtask._id}
											done={subtask.done}
										/>
										{isEditSubtask === subtask._id ? (
											<UpdateSubtask
												todoId={todoId}
												taskId={task._id}
												subtaskId={subtask._id}
												content={subtask.content}
											/>
										) : (
											<label
												htmlFor={`subtask-${subtask._id}`}
												className={`text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 leading-5  ${
													subtask.done && 'line-through'
												}`}>
												{subtask.content}
											</label>
										)}
									</div>
									<DropdownMenuSubtask
										todoId={todoId}
										taskId={task._id}
										subtaskId={subtask._id}
										isEdit={isEditSubtask === subtask._id}
										setIsEdit={setIsEditSubtask}
									/>
								</div>
							))
						)}
					</AccordionContent>
				</AccordionItem>
			</Accordion>
			<div className='mt-[25px] flex gap-3 '>
				<div className='mt-[5px]'>
					<DropdownMenuTask
						todoId={todoId}
						taskId={task._id}
						setIsEdit={setIsEdit}
						isEdit={isEdit}
					/>
				</div>
				<CreateSubtask
					todoId={todoId}
					taskId={task._id}
					content={content}
					numSubtasks={subtasks.length}
				/>
			</div>
		</div>
	);
};
export default Task;
