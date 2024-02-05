'use client'

import { useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

interface Props {
	children: React.ReactNode
}

export const QueryProvider = ({ children }: Props) => {
	const [client, setClient] = useState(new QueryClient())

	useEffect(() => {
		setClient(new QueryClient())
		console.log('[Query Client Provider]')
	}, [])

	return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
