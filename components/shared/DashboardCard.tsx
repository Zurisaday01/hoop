import dynamicIconImports from 'lucide-react/dynamicIconImports';
import Icon from './Icon';

interface DashboardCardProps {
	amount: number | undefined;
	title: string;
	iconName: keyof typeof dynamicIconImports;
	iconColor: string;
	bgColor: string;
}

const DashboardCard = ({
	amount,
	title,
	iconName,
	iconColor,
	bgColor,
}: DashboardCardProps) => {
	return (
		<div className=' bg-light-1 dark:bg-dark-1 rounded-lg px-6 py-12 transition duration-200 hover:shadow-card'>
			<div className='flex flex-col gap-2 items-center justify-center'>
				<div className={`${bgColor} ${iconColor} rounded-full p-2`}>
					<Icon name={iconName} size={20} />
				</div>
				<div className='flex flex-col items-center justify-center'>
					<span className='font-josefin-sans text-[50px] leading-[50px]'>
						{amount}
					</span>
					<h3 className='font-nunito text-gray-1'>{title}</h3>
				</div>
			</div>
		</div>
	);
};
export default DashboardCard;
