'use client'

import { useChatQuery } from '@/hooks/use-chat-query'
import { useChatSocket } from '@/hooks/use-chat-socket'
import { format } from 'date-fns'
import { Fragment } from 'react'
import { Loader2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { cn } from '@/lib/utils'
import { Profile } from '@prisma/client'

interface Props {
	name: string
	apiUrl: string
	query: {
		groupId: string
		[key: string]: string
	}
	type: string
	_data: Profile
}

export const ChatMessages = ({ apiUrl, name, query, type, _data }: Props) => {
	// → TODO determinar si es mejor usar el ID de la conversacion o ID del grupo para emitir eventos

	const queryKey = `chat:${query.groupId}`
	const addKey = `chat:${query.groupId}:messages`

	const { data, status } = useChatQuery({
		apiUrl,
		queryKey,
		query,
	})

	useChatSocket({ queryKey, addKey, updateKey: '' })

	if (status === 'loading') {
		return (
			<div className='h-full w-full grid place-content-center'>
				<Loader2 className='animate-spin' />
			</div>
		)
	}

	return (
		<div className='flex  gap-3 flex-col-reverse w-full pb-5'>
			{data?.pages.map((group, index) => (
				<Fragment key={index}>
					{group.items.map((message: any) => (
						<div
							className={cn('flex gap-2 ', {
								'self-end flex-row-reverse':
									_data.id === message.sender.id,
							})}
							key={message.id}
						>
							<Avatar>
								<AvatarImage src={message.sender.imageUrl} />
								<AvatarFallback>
									{message.sender.name[0]}
								</AvatarFallback>
							</Avatar>
							<div
								key={message.id}
								className='flex flex-col bg-[#007AFF] text-white rounded-md px-3 py-2 max-w-[500px] w-fit'
							>
								{/* <span className='text-xs'>{message.sender.email}</span>
							<span className='text-xs'>
								{format(message.createdAt, 'dd MMM yy')}
							</span> */}

								<p className='text-sm'>{message.content}</p>
							</div>
						</div>
					))}
				</Fragment>
			))}
		</div>
	)
}
