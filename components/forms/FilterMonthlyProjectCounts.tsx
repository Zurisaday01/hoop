'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';
import { useFilterMonthlyProjectCounts } from '@/hooks/useFilterMonthlyProjectCounts';

const FilterMonthlyProjectCounts = ({
	userId,
	setFilteredDate,
}: {
	userId: string | null | undefined;
	setFilteredDate: Dispatch<
		SetStateAction<{
			completed: number | undefined;
			inProgress: number | undefined;
			waiting: number | undefined;
		}>
	>;
}) => {
	const { isUpdating, filterMonthlyProjectCounts } =
		useFilterMonthlyProjectCounts();

	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth();

	const [selectedMonth, setSelectedMonth] = useState(currentMonth.toString());
	const [selectedYear, setSelectedYear] = useState(currentYear.toString());

	useEffect(() => {
		filterMonthlyProjectCounts(
			{
				userId: userId,
				month: selectedMonth,
				year: selectedYear,
			},
			{
				onSuccess: data => {
					const completed = data.filter(
						project => project.status === 'Completed'
					).length;
					const inProgress = data.filter(
						project => project.status === 'In progress'
					).length;
					const waiting = data.filter(
						project => project.status === 'Waiting'
					).length;

					const filtered = {
						completed,
						inProgress,
						waiting,
					};
					setFilteredDate(filtered);
				},
			}
		);
	}, [selectedMonth, selectedYear]);

	return (
		<div className='flex gap-4'>
			<Select
				defaultValue={selectedMonth}
				onValueChange={value => setSelectedMonth(value)}>
				<SelectTrigger className='w-[130px] dark:bg-dark-1 bg-light-1 border-none ring-offset-0 ring-0'>
					<SelectValue placeholder='Select a Month' />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectItem value='0'>January</SelectItem>
						<SelectItem value='1'>February</SelectItem>
						<SelectItem value='2'>March</SelectItem>
						<SelectItem value='3'>April</SelectItem>
						<SelectItem value='4'>May</SelectItem>
						<SelectItem value='5'>June</SelectItem>
						<SelectItem value='6'>July</SelectItem>
						<SelectItem value='7'>August</SelectItem>
						<SelectItem value='8'>September</SelectItem>
						<SelectItem value='9'>October</SelectItem>
						<SelectItem value='10'>November</SelectItem>
						<SelectItem value='11'>December</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>

			<Select
				defaultValue={selectedYear}
				onValueChange={value => setSelectedYear(value)}>
				<SelectTrigger className='w-[130px] dark:bg-dark-1 bg-light-1 border-none'>
					<SelectValue placeholder='Select a year' />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectItem value='2020'>2020</SelectItem>
						<SelectItem value='2021'>2021</SelectItem>
						<SelectItem value='2022'>2022</SelectItem>
						<SelectItem value='2023'>2023</SelectItem>
						<SelectItem value='2024'>2024</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
};
export default FilterMonthlyProjectCounts;
