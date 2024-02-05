import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/prisma'
import { redirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

interface Props {
	children: React.ReactNode
	params: {
		groupId: string
	}
}

const GroupLayout = async ({ children, params }: Props) => {
	const profile = await currentProfile()

	if (!profile) {
		return redirectToSignIn()
	}

	const group = await db.group.findUnique({
		where: {
			id: params.groupId,
			members: {
				some: {
					profileId: profile.id,
				},
			},
		},
		include: {
			members: {
				select: {
					profileId: true,
				},
			},
			conversation: {
				include: {
					messages: {
						include: {
							sender: {
								select: {
									email: true,
									imageUrl: true,
								},
							},
						},
					},
				},
			},
		},
	})

	if (!group) {
		return redirect('/')
	}

	return (
		<div className='w-full bg-red-50 h-full overflow-y-auto px-5 pt-3'>
			<div>{group.name}</div>
			<main>{children}</main>
			<div>Members {group.members.length}</div>
			<h2>Messages</h2>
		</div>
	)
}

export default GroupLayout
