import dynamicIconImports from 'lucide-react/dynamicIconImports';

interface Link {
	iconName: keyof typeof dynamicIconImports;
	route: string;
	label: string;
}

export const sidebarLinks: Link[] = [
	{
		iconName: 'layout-grid',
		route: '/',
		label: 'Home',
	},
	{
		iconName: 'search',
		route: '/search',
		label: 'Search',
	},
	{
		iconName: 'file-plus-2',
		route: '/create-project',
		label: 'Create Project',
	},
];

// export const profileTabs = [
// 	{ value: 'threads', label: 'Threads', icon: '/assets/reply.svg' },
// 	{ value: 'replies', label: 'Replies', icon: '/assets/members.svg' },
// 	{ value: 'tagged', label: 'Tagged', icon: '/assets/tag.svg' },
// ];

// export const communityTabs = [
// 	{ value: 'threads', label: 'Threads', icon: '/assets/reply.svg' },
// 	{ value: 'members', label: 'Members', icon: '/assets/members.svg' },
// 	{ value: 'requests', label: 'Requests', icon: '/assets/request.svg' },
// ];
