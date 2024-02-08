import { cn } from '@/lib/utils'
import { MessageWithProfile } from '@/types/types'
import { Profile } from '@prisma/client'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

interface Props {
	profile: Profile
	message: MessageWithProfile
}

export const ChatMessage = ({ message, profile }: Props) => {
	return (
		<div>
			<div
				className={cn('flex gap-2 ', {
					'self-end flex-row-reverse': profile.id === message.sender.id,
				})}
			>
				<Avatar>
					<AvatarImage src={message.sender.imageUrl} />
					<AvatarFallback>{message.sender.name[0]}</AvatarFallback>
				</Avatar>
				<div className='flex flex-col bg-slate-200 text-foreground rounded-xl px-3 py-2 max-w-[31.25rem] w-fit'>
					<p className='text-sm'>{message.content}</p>
				</div>
			</div>
		</div>
	)
}
