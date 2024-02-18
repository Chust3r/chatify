import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from '@/components/ui/hover-card'
import { Profile } from '@prisma/client'

import { format } from 'date-fns'

export const ProfileInfo = ({ email, imageUrl, name, createdAt }: Profile) => {
	return (
		<HoverCard>
			<HoverCardTrigger asChild>
				<div className='relative'>
					<Avatar>
						<AvatarImage src={imageUrl} />
						<AvatarFallback>{name[0]}</AvatarFallback>
					</Avatar>
					<span className='absolute w-2 h-2 bg-lime-400 rounded-full bottom-0 right-1' />
				</div>
			</HoverCardTrigger>
			<HoverCardContent className='w-80'>
				<div className='flex justify-between space-x-4'>
					<div className='space-y-1'>
						<h4 className='text-sm font-semibold'>{email}</h4>
						<p className='text-sm'>
							The React Framework – created and maintained by @vercel.
						</p>
						<div className='flex items-center pt-2'>
							<span className='text-xs text-muted-foreground'>
								Joined {format(createdAt, 'MMM, yyyy')}
							</span>
						</div>
					</div>
				</div>
			</HoverCardContent>
		</HoverCard>
	)
}
