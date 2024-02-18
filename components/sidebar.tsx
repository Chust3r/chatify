import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/prisma'
import { GroupActivity } from './group/group-activity'
import { ScrollArea } from './ui/scroll-area'
import { Input } from './ui/input'
import { ProfileSettings } from './profile-settings'
import { MoreVertical } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import { CreateGroup } from './modal/modal-create-group'

export const Sidebar = async () => {
	const profile = await currentProfile()

	if (!profile) {
		return
	}

	const groups = await db.group.findMany({
		where: {
			members: {
				some: { profileId: profile.id },
			},
		},
		include: {
			conversation: {
				include: {
					messages: {
						take: 1,
						orderBy: {
							createdAt: 'desc',
						},
					},
				},
			},
		},
		orderBy: {
			lastActivity: 'desc',
		},
	})

	if (!groups) {
		return
	}

	return (
		<div className='w-full h-screen bg-background flex flex-col pt-3'>
			<div className='px-3 y-2'>
				<Input placeholder='Search a chat' />
			</div>
			<ScrollArea className='flex flex-col w-full flex-1 h-full'>
				{groups.map((group) => (
					<GroupActivity group={group} key={group.id} />
				))}
			</ScrollArea>
			<div className='w-full flex justify-between p-3'>
				<ProfileSettings profile={profile} />
				<CreateGroup />
			</div>
		</div>
	)
}
