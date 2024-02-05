'use client'

import { useChatQuery } from '@/hooks/use-chat-query'
import { useChatSocket } from '@/hooks/use-chat-socket'
import { format } from 'date-fns'
import { Fragment } from 'react'

interface Props {
	name: string
	chatId: string
	apiUrl: string
	socketUrl: string
	socketQuery: Record<string, any>
	paramKey: string
	paramValue: string
	type: string
}

export const ChatMessages = ({
	apiUrl,
	chatId,
	name,
	paramKey,
	paramValue,
	socketQuery,
	socketUrl,
	type,
}: Props) => {
	// → TODO determinar si es mejor usar el ID de la conversacion o ID del grupo para emitir eventos

	const queryKey = `chat:94e7e46b-9b4d-41a6-9271-128c9bdfc7cc`
	const addKey = `chat:94e7e46b-9b4d-41a6-9271-128c9bdfc7cc:messages`

	const { data } = useChatQuery({
		apiUrl,
		queryKey,
		paramKey,
		paramValue,
	})

	useChatSocket({ queryKey, addKey, updateKey: '' })

	return (
		<div className='flex  gap-3 flex-col-reverse'>
			{data?.pages.map((group, index) => (
				<Fragment key={index}>
					{group.items.map((message: any) => (
						<div key={message.id} className='flex flex-col bg-slate-300'>
							<span className='text-xs'>{message.sender.email}</span>
							<span className='text-xs'>
								{format(message.createdAt, 'dd MMM yy')}
							</span>
							<p>{message.content}</p>
						</div>
					))}
				</Fragment>
			))}
		</div>
	)
}
