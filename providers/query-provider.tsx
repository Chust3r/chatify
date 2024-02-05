'use client'

import { useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

interface Props {
	children: React.ReactNode
}

export const QueryProvider = ({ children }: Props) => {
	const [client] = useState(new QueryClient())

	return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
