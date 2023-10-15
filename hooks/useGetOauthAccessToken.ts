'use client';

import { getOauthAccessToken } from '@/lib/actions/user.actions';
import { useQuery } from '@tanstack/react-query';

const useOautToken = () => {
	const {
		data: token,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['google-doc'],
		queryFn: () => getOauthAccessToken(),
	});

	return { isLoading, error, token };
};

export default useOautToken;
