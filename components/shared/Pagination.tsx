'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

interface PaginationProps {
	total: number | undefined;
	pageNumber: number;
	isNext: boolean | undefined;
	optionNumbers: number[];
	firstItem: number;
	lastItem: number;
}

const Pagination = ({
	total,
	pageNumber,
	isNext,
	optionNumbers,
	firstItem,
	lastItem,
}: PaginationProps) => {
	const router = useRouter();

	const handleNavigation = (type: string) => {
		let nextPageNumber = pageNumber;

		if (type === 'prev') {
			// subtracts 1 from the pageNumber
			// this expression ensures that the result is never less than 1.
			nextPageNumber = Math.max(1, pageNumber - 1);
		}

		if (type === 'next') {
			nextPageNumber = pageNumber + 1;
		}

		if (nextPageNumber > 1) {
			router.push(`/projects?page=${nextPageNumber}`);
		} else {
			router.push(`/projects`);
		}
	};

	const handleButtonsNavigation = (number: number) => {
		if (number > 1) {
			router.push(`/projects?page=${number}`);
		} else {
			router.push(`/projects`);
		}
	};

	return (
		<div className='flex w-full flex-col '>
			<div className='flex w-full justify-between'>
				<Button
					onClick={() => handleNavigation('prev')}
					disabled={pageNumber === 1}
					className='bg-transparent text-dark-1 hover:bg-transparent dark:bg-transparent dark:text-light-1 dark:hover:bg-transparent'>
					<ChevronLeftIcon />
				</Button>
				{/* <p className='text-small-semibold text-dark-1'>{pageNumber}</p> */}
				<div className='flex'>
					{optionNumbers.map(number => (
						<Button
							className={`bg-transparent text-dark-1 hover:bg-transparent dark:bg-transparent dark:text-light-1 dark:hover:bg-transparent hover:font-bold font-nunito ${
								number === pageNumber && 'hover:text-primary-dark'
							}`}
							onClick={() => handleButtonsNavigation(number)}>
							{number}
						</Button>
					))}
				</div>
				<Button
					onClick={() => handleNavigation('next')}
					disabled={!isNext}
					className='bg-transparent text-dark-1 hover:bg-transparent dark:bg-transparent dark:text-light-1 dark:hover:bg-transparent'>
					<ChevronRightIcon />
				</Button>
			</div>
			<p className='font-nunito text-xs'>
				Showing {firstItem} to {lastItem} of {total}
			</p>
		</div>
	);
};
export default Pagination;
