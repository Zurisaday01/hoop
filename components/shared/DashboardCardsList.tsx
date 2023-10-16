import DashboardCard from './DashboardCard';

const DashboardCardsList = ({
	total,
	completed,
	inProgress,
	waiting,
}: {
	total: number | undefined;
	completed: number | undefined;
	inProgress: number | undefined;
	waiting: number | undefined;
}) => {
	return (
		<div className='grid  grid-cols-2  md:grid-cols-4 gap-4'>
			<DashboardCard
				amount={total}
				title='Total'
				iconName='folder'
				iconColor='text-orange-dark'
				bgColor='bg-orange-light'
			/>
			<DashboardCard
				amount={completed}
				title='Completed'
				iconName='check'
				iconColor='text-yellow-dark'
				bgColor='bg-yellow-light'
			/>
			<DashboardCard
				amount={inProgress}
				title='In progress'
				iconName='clock-5'
				iconColor='text-purple-dark'
				bgColor='bg-purple-light'
			/>
			<DashboardCard
				amount={waiting}
				title='Waiting'
				iconName='pause'
				iconColor='text-blue-dark'
				bgColor='bg-blue-light'
			/>
		</div>
	);
};
export default DashboardCardsList;
