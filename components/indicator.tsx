'use client'

import { useSocket } from '@/providers/socket-provider'

export const Indicator = () => {
	const { isConnected } = useSocket()

	if (!isConnected) {
		return <div>No connectado</div>
	}

	return <div>Connectado</div>
}
