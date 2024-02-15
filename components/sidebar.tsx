import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/prisma'
import Link from 'next/link'
import { Modal } from './modal/modal'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { UserButton } from '@clerk/nextjs'

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
	})

	return (
		<div className='w-72 h-screen bg-whiteF2F2F2 flex flex-col px-5 py-3'>
			<div>
				<Modal type='create-group' />
			</div>
		</div>
	)
}
