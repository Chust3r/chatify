import { useSocket } from '@/providers/socket-provider'
import { MessageWithProfile } from '@/types/types'
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

		socket.on(addKey, (message: MessageWithProfile) => {
			/* queryClient.setQueryData([queryKey], (oldData: any) => {
				if (!oldData || !oldData.pages || oldData.pages.length === 0) {
					return {
						pages: [
							{
								items: [message],
							},
						],
					}
				}

				const newData = [...oldData.pages]

				newData[0] = {
					...newData[0],
					items: [message, ...newData[0].items],
				}

				return {
					...oldData,
					pages: newData,
				}
			}) */

			queryClient.invalidateQueries([queryKey])
		})

		return () => {
			socket.off(addKey)
		}
	}, [queryClient, socket, addKey, queryKey])
}
