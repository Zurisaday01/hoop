import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import dynamic from 'next/dynamic';
import { memo } from 'react';

interface IconProps extends LucideProps {
	name: keyof typeof dynamicIconImports;
	size: number;
}

const _Icon = ({ name, size }: IconProps) => {
	const LucideIcon = dynamic(dynamicIconImports[name]);

	return <LucideIcon size={size} />;
};

// Fix for unnecesary re-renders
const Icon = memo(_Icon);

export default Icon;
