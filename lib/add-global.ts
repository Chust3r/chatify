import { redirect } from 'next/navigation'
import { db } from './prisma'

export const globalGroup = async (id: string) => {
	const group = await db.group.findFirst({
		where: {
			id: 'e55f9930-b8ff-4e04-9bf4-eaa17a09fd1b',
			members: {
				some: {
					profileId: id,
				},
			},
		},
	})

	if (group) return

	//→ TODO add a current user to global group

	await db.group.update({
		where: {
			id: 'e55f9930-b8ff-4e04-9bf4-eaa17a09fd1b',
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
