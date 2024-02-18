import { redirect } from 'next/navigation'
import { db } from './prisma'

export const globalGroup = async (id: string) => {
	const group = await db.group.findFirst({
		where: {
			id: '1ee63a92-0abf-4f00-8fee-b8a8ddd14e0b',
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
			id: '1ee63a92-0abf-4f00-8fee-b8a8ddd14e0b',
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
