import { useSocket } from '@/providers/socket-provider'
import { useEffect } from 'react'
import { useQueryClient } from 'react-query'

interface Props {
	addKey: string
	updateKey: string
	queryKey: string
}

export const useChatSocket = ({ addKey, queryKey, updateKey }: Props) => {
	const { socket } = useSocket()

	const queryClient = useQueryClient()

	useEffect(() => {
		if (!socket) return

		socket.on(addKey, () => {
			
			queryClient.invalidateQueries({ queryKey: [queryKey] })

			return () => {
				socket.off(addKey)
			}
		})
	}, [queryClient, socket, addKey, queryKey])
}
