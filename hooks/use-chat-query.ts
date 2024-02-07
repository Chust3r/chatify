import { useSocket } from '@/providers/socket-provider'
import qs from 'query-string'
import { useInfiniteQuery } from 'react-query'

interface Props {
	queryKey: string
	apiUrl: string
	query: {
		groupId: string
		[key: string]: string
	}
}

const useChatQuery = ({ apiUrl, query, queryKey }: Props) => {
	const { isConnected } = useSocket()

	// → FETCH MESSAGES

	const fetchMessages = async ({ pageParam = undefined }) => {
		const url = qs.stringifyUrl(
			{
				url: apiUrl,
				query: {
					cursor: pageParam,
					...query,
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
			refetchInterval: isConnected ? false : 1000,
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
