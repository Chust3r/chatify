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
			conversation: true,
			members: true,
		},
	})

	if (!group) {
		return redirect('/')
	}

	return <>{children}</>
}

export default GroupLayout
