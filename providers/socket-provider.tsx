'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { io as ClientIo } from 'socket.io-client'

type SocketContextType = { socket: any | null; isConnected: boolean }

const SocketContext = createContext<SocketContextType>({
	socket: null,
	isConnected: false,
})

export const useSocket = () => {
	return useContext(SocketContext)
}

interface Props {
	children: React.ReactNode
}

export const SocketProvider = ({ children }: Props) => {
	const [socket, setSocket] = useState(null)
	const [isConnected, setIsConnected] = useState(false)

	useEffect(() => {
		const socketInstance = new (ClientIo as any)('/', {
			path: '/api/socket/io',
			addTrailingSlash: true,
		})

		socketInstance.on('connect', () => {
			setIsConnected(true)
		})

		socketInstance.on('disconnect', () => {
			setIsConnected(false)
		})

		setSocket(socketInstance)

		return () => {
			socketInstance.disconnect()
		}
	}, [])

	return (
		<SocketContext.Provider
			value={{
				socket,
				isConnected,
			}}
		>
			{children}
		</SocketContext.Provider>
	)
}
