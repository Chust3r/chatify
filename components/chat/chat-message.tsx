import { cn } from '@/lib/utils'
import { MessageWithProfile } from '@/types/types'
import { Profile } from '@prisma/client'
import { format } from 'date-fns'
import { ProfileInfo } from '../profile-info'

interface Props {
	profile: Profile
	message: MessageWithProfile
}

export const ChatMessage = ({ message, profile }: Props) => {
	const isProfileSender = profile.id === message.sender.id

	return (
		<div className='w-full flex  mb-2 relative min-w-[500px]'>
			<div
				className={cn(
					'w-full flex gap-2 justify-start items-center px-5 ',
					isProfileSender && 'self-end flex-row-reverse'
				)}
			>
				<ProfileInfo {...message.sender} />
				<div className='w-fit max-w-[75%] rounded-xl bg-accent/70 p-3 relative overflow-hidden'>
					<div className='flex w-full h-full text-sm gap-1 pr-10 relative '>
						<p>{message.content}</p>
						<span className='h-fit  flex text-[9px] absolute -bottom-1 right-0 select-none'>
							{format(new Date(message.createdAt), 'p')}
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}
