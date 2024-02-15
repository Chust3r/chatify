import { cn } from '@/lib/utils'
import { MessageWithProfile } from '@/types/types'
import { Profile } from '@prisma/client'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { format } from 'date-fns'

interface Props {
	profile: Profile
	message: MessageWithProfile
}

export const ChatMessage = ({ message, profile }: Props) => {
	const isProfileSender = profile.id === message.sender.id

	return (
		<div className='w-full flex justify-center  mb-2 relative min-w-[500px]'>
			<div className=' mr-4'>
				<Avatar className='w-8 h-8'>
					<AvatarImage src={profile.imageUrl!} />
				</Avatar>
			</div>
			<div className='w-[90%] flex items-start'>
				<div className='w-full'>
					<div className='w-fit max-w-[75%] rounded-xl bg-[#f2f2f2] p-3 relative overflow-hidden'>
						<div className='flex w-full h-full text-sm gap-1 pr-10 relative '>
							<p>{message.content}</p>
							<span className='h-fit  flex text-[9px] absolute -bottom-1 right-0 select-none'>
								{format(new Date(message.createdAt), 'p')}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
