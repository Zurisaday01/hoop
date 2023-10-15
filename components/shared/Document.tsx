import { Button } from '../ui/button';
import Image from 'next/image';
import Link from 'next/link';

const Document = ({ documentId }: { documentId: string }) => {
	return (
		<div>
			<Button>
				<Link
					className='flex gap-1 items-center'
					href={`https://docs.google.com/document/d/${documentId}`}
					target='_blank'>
					<Image
						alt='Google Docs Logo'
						width={20}
						height={10}
						src='/assets/google-docs-logo.png'
					/>
					<span>Access My Google Docs</span>
				</Link>
			</Button>
		</div>
	);
};
export default Document;
