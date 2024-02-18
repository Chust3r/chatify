import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Conversation, Group, Message } from '@prisma/client'
import Link from 'next/link'
import { format } from 'date-fns'

interface Props {
	group: Group & {
		conversation:
			| null
			| (Conversation & {
					messages: Message[]
			  })
	}
}

export const GroupActivity = ({ group }: Props) => {
	return (
		<Link href={`/group/${group.id}`}>
			<div className='flex gap-4 p-3 text-foreground w-full'>
				<div className='relative'>
					<Avatar>
						<AvatarImage src={group.imageUrl!} />
						<AvatarFallback>{group.name[0]}</AvatarFallback>
					</Avatar>
					<span className='absolute w-2 h-2 bg-lime-400 rounded-full bottom-1 right-1' />
				</div>
				<div className='flex flex-col justify-center w-full'>
					<h2>{group.name}</h2>
					<span className='line-clamp-1 text-sm'>
						{group.conversation?.messages[0]?.content ?? 'Send a message'}
					</span>
				</div>
			</div>
		</Link>
	)
}
