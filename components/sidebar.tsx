import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/prisma'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { Indicator } from '@/components/indicator'

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
			profile: true,
		},
	})

	return (
		<div className='w-72 h-screen bg-slate-100'>
			<Indicator />
			<UserButton />
			<div className='flex flex-col gap-2 px-5 py-10'>
				{groups.map((group) => (
					<Link key={group.id} href={`/group/${group.id}`}>
						{group.name}
					</Link>
				))}
			</div>
		</div>
	)
}
