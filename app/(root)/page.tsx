'use client';
import DashboardCardsList from '@/components/shared/DashboardCardsList';
import Spinner from '@/components/shared/Spinner';
import Stadistics from '@/components/shared/Stadistics';
import useProjects from '@/hooks/useProjects';
import { getProjects } from '@/lib/actions/project.actions';
import { auth, useAuth } from '@clerk/nextjs';

export default function Home() {
	const { userId } = useAuth();

	const { isLoading, data } = useProjects({ userId });

	// COUNTS
	const total = data?.projects?.length;
	const completed = data?.projects?.filter(
		project => project.status === 'Completed'
	).length;
	const inProgress = data?.projects?.filter(
		project => project.status === 'In progress'
	).length;
	const waiting = data?.projects?.filter(
		project => project.status === 'Waiting'
	).length;

	return (
		<div className='flex flex-col gap-8'>
			<h1 className='text-3xl font-josefin-sans'>Dashboard</h1>
			{isLoading ? (
				<Spinner />
			) : (
				<>
					<DashboardCardsList
						total={total}
						completed={completed}
						inProgress={inProgress}
						waiting={waiting}
					/>
					<Stadistics
						userId={userId}
						completed={completed}
						inProgress={inProgress}
						waiting={waiting}
					/>
				</>
			)}
		</div>
	);
}
