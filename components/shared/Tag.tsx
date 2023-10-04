interface TagProps {
	status: string;
	children: React.ReactNode;
}


const Tag = ({ status, children }: TagProps) => {
	const bgColors = {
		Completed: 'bg-[#FFF8BA]',
		'In progress': 'bg-[#E9D2FF]',
		Waiting: 'bg-[#CAE5FF]',
	};
	const textColors = {
		Completed: 'text-[#E1CC10]',
		'In progress': 'text-[#9932FC]',
		Waiting: 'text-[#369DFD]',
	};

	return (
		<span
			className={`py-1 px-5 uppercase  rounded-full text-[10px] ${
				bgColors[status as keyof typeof bgColors]
			} ${textColors[status as keyof typeof textColors]}`}>
			{children}
		</span>
	);
};

export default Tag;
