import { redirect } from 'next/navigation'
import { db } from './prisma'

export const globalGroup = async (id: string) => {
	const group = await db.group.findFirst({
		where: {
			id: '2a657b68-5e1e-4c87-958a-e47408c9a537',
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
			id: '2a657b68-5e1e-4c87-958a-e47408c9a537',
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
