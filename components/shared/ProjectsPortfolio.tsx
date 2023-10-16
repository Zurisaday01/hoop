'use client';
import Pagination from '@/components/shared/Pagination';
import ProjectList from '@/components/shared/ProjectList';
import Searchbar from '@/components/shared/Searchbar';
import SortBy from '@/components/shared/SortBy';
import useProjects from '@/hooks/useProjects';

const PAGE_SIZE = 10;

const ProjectsPortfolio = ({
	searchParams,
	userId,
}: {
	searchParams: { [key: string]: string | undefined };
	userId: string | undefined;
}) => {
	const { isLoading, data } = useProjects({
		searchString: searchParams.q || '',
		pageNumber: searchParams?.page ? +searchParams.page : 1,
		pageSize: PAGE_SIZE,
		sortBy: searchParams?.sortBy || 'desc',
		userId: userId,
	});

	// Calculate the range of items currently being displayed
	const currentPageNumber = searchParams?.page ? +searchParams.page : 1;
	const firstItem = (currentPageNumber - 1) * PAGE_SIZE + 1;
	const lastItem = Math.min(
		firstItem + PAGE_SIZE - 1,
		data?.totalCount.length || 0
	);

	const totalPages = Math.ceil((data?.totalCount.length || 0) / PAGE_SIZE);
	// Create an array of page numbers up to the maximum required

	const possiblePageNumbers = Array.from(
		{ length: totalPages },
		(_, i) => i + 1
	);

	return (
		<div className='flex flex-col gap-6  h-full'>
			<div className='flex justify-between gap-2 max-sm:flex-col'>
				<h1 className='heading-primary'>Projects</h1>
				<div className='flex gap-5'>
					<SortBy />
				</div>
			</div>
			<Searchbar />
			<ProjectList isLoading={isLoading} projects={data?.projects} />

			{totalPages > 1 && (
				<Pagination
					total={data?.totalCount.length}
					pageNumber={searchParams?.page ? +searchParams.page : 1}
					isNext={data?.isNext}
					optionNumbers={possiblePageNumbers}
					firstItem={firstItem}
					lastItem={lastItem}
				/>
			)}
		</div>
	);
};
export default ProjectsPortfolio;
