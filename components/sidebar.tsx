import { Indicator } from '@/components/indicator'
import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/prisma'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { Avatar, AvatarFallback } from './ui/avatar'

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
		<div className='w-72 h-screen bg-slate-100'>
			<Indicator />
			<UserButton />
			<div className='flex flex-col gap-2 px-5 py-10'>
				{groups.map((group) => (
					<Link key={group.id} href={`/group/${group.id}`}>
						<div className='flex gap-2 items-center'>
							<Avatar>
								<AvatarFallback className='bg-blue-500 text-white'>
									G
								</AvatarFallback>
							</Avatar>
							<span>{group.name}</span>
						</div>
					</Link>
				))}
			</div>
		</div>
	)
}
