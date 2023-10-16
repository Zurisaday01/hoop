import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	BarElement,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

import FilterMonthlyProjectCounts from '../forms/FilterMonthlyProjectCounts';
import { useState } from 'react';
import Spinner from './Spinner';

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(CategoryScale, BarElement);
ChartJS.register(LinearScale, BarElement);

const Stadistics = ({
	userId,
	completed,
	inProgress,
	waiting,
}: {
	userId: string | null | undefined;
	completed: number | undefined;
	inProgress: number | undefined;
	waiting: number | undefined;
}) => {
	const [filteredData, setFilteredDate] = useState({
		completed,
		inProgress,
		waiting,
	});
	const data = {
		labels: ['Completed', 'In progress', 'Waiting'],
		datasets: [
			{
				label: '# of Projects',
				data: [completed, inProgress, waiting],
				backgroundColor: ['#FFF8BA', '#E9D2FF', '#CAE5FF'],
				borderColor: ['#E1CC10', '#9932FC', '#369DFD'],
				borderWidth: 1,
			},
		],
	};

	const databar = {
		labels: ['Completed', 'In progress', 'Waiting'],
		// datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
		datasets: [
			{
				label: 'Projects count',
				data: [
					filteredData?.completed,
					filteredData?.inProgress,
					filteredData?.waiting,
				],
				backgroundColor: ['#FFF8BA', '#E9D2FF', '#CAE5FF'],
				borderColor: ['#E1CC10', '#9932FC', '#369DFD'],
				borderWidth: 1,
			},
		],
	};

	const options = {
		responsize: true,
		maintainAspectRatio: false,
	};

	return (
		<div className='flex flex-col md:flex-row gap-4 w-full h-full'>
			<div className='bg-light-1 dark:bg-dark-1 rounded-lg p-4 h-full w-full md:w-2/5'>
				<div className='h-[25rem] w-[100%]'>
					<Doughnut
						className='font-nunito !h-auto !w-auto'
						data={data}
						options={options}
					/>
				</div>
			</div>
			<div className='bg-light-1 dark:bg-dark-1 rounded-lg p-4 md:w-[60%] w-full h-full'>
				<h2 className='font-josefin-sans mb-4'>Monthly Project Counts</h2>
				<FilterMonthlyProjectCounts
					userId={userId}
					setFilteredDate={setFilteredDate}
				/>
				<div className='h-[20rem] w-[100%]'>
					{filteredData.completed === undefined ||
					filteredData.inProgress === undefined ||
					filteredData.waiting === undefined ? (
						<Spinner />
					) : (
						<Bar
							className='font-nunito !h-auto !w-auto'
							data={databar}
							options={options}
						/>
					)}
				</div>
			</div>
		</div>
	);
};
export default Stadistics;
