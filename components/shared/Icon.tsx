import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import dynamic from 'next/dynamic';

interface IconProps extends LucideProps {
	name: keyof typeof dynamicIconImports;
	size: number;
}

const Icon = ({ name, size }: IconProps) => {
	const LucideIcon = dynamic(dynamicIconImports[name]);

	return <LucideIcon size={size} />;
};

export default Icon;
