import Links from './Links';
import SignOutBtn from './SignOutBtn';

const LeftSidebar = () => {
	return (
		<section className='custom-scrollbar leftsidebar'>
			<div className='flex w-full flex-1 flex-col gap-6 px-6 pt-24'>
				<Links linkStyle='leftsidebar__link' place='LeftSidebar' />
			</div>
		</section>
	);
};
export default LeftSidebar;
