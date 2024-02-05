import { useSocket } from '@/providers/socket-provider'
import qs from 'query-string'
import { useInfiniteQuery } from 'react-query'

interface Props {
	queryKey: string
	apiUrl: string
	paramKey: string
	paramValue: string
}

const useChatQuery = ({ apiUrl, paramKey, paramValue, queryKey }: Props) => {
	const { isConnected } = useSocket()

	// → FETCH MESSAGES

	const fetchMessages = async ({ pageParam = undefined }) => {
		const url = qs.stringifyUrl(
			{
				url: apiUrl,
				query: {
					cursor: pageParam,
					[paramKey]: paramValue,
				},
			},
			{ skipNull: true }
		)

		const res = await fetch(url)

		return res.json()
	}

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
		useInfiniteQuery({
			queryKey: [queryKey],
			queryFn: fetchMessages,
			getNextPageParam: (lastPage) => lastPage?.nextCursor,
			/* refetchInterval: isConnected ? false : 1000, */
		})

	return {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		status,
	}
}

export { useChatQuery }
