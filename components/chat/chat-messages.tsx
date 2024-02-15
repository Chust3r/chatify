'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { useChatQuery } from '@/hooks/use-chat-query'
import { useChatSocket } from '@/hooks/use-chat-socket'
import { cn } from '@/lib/utils'
import { MessageWithProfile } from '@/types/types'
import { Profile } from '@prisma/client'
import { Loader2 } from 'lucide-react'
import { Fragment } from 'react'
import { ChatMessage } from './chat-message'

interface Props {
	name: string
	apiUrl: string
	query: {
		groupId: string
		[key: string]: string
	}
	type: string
	profile: Profile
	className?: string
}

export const ChatMessages = ({
	apiUrl,
	name,
	query,
	type,
	profile,
	className,
}: Props) => {
	//→ socket io keys

	const queryKey = `chat:${query.groupId}`
	const addKey = `chat:${query.groupId}:messages`

	const { data, status } = useChatQuery({
		apiUrl,
		queryKey,
		query,
	})

	useChatSocket({ queryKey, addKey, updateKey: '' })

	if (status === 'loading' || !data) {
		return (
			<div className='grid w-full h-full place-content-center'>
				<Loader2 className='animate-spin' />
			</div>
		)
	}

	return (
		<ScrollArea className='flex-1'>
			<div className={cn(' w-full gap-3 h-full', className)}>
				{data?.pages.map((group, index) => (
					<Fragment key={index}>
						{group?.items.map((message: MessageWithProfile) => (
							<ChatMessage
								message={message}
								profile={profile}
								key={message.id}
							/>
						))}
					</Fragment>
				))}
			</div>
		</ScrollArea>
	)
}
