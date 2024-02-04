import { redirect } from 'next/navigation'
import { db } from './prisma'

export const globalGroup = async (id: string) => {
	const group = await db.group.findFirst({
		where: {
			id: '94e7e46b-9b4d-41a6-9271-128c9bdfc7cc',
			members: {
				some: {
					profileId: id,
				},
			},
		},
	})

	if (group) {
		return redirect(`/group/${group.id}`)
	}

	//→ TODO add a current user to global group

	await db.group.update({
		where: {
			id: '94e7e46b-9b4d-41a6-9271-128c9bdfc7cc',
		},
		data: {
			members: {
				create: [
					{
						profileId: id,
						role: 'GUEST',
					},
				],
			},
		},
	})
}
