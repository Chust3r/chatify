import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/prisma'

export const POST = async (req: Request) => {
	try {
		const profile = await currentProfile()

		if (!profile) {
			return Response.json({ message: 'Unauthorized' }, { status: 401 })
		}

		const data = await req.json()

		if (!data?.name) {
			return Response.json(
				{
					message: 'Group name is required',
				},
				{ status: 400 }
			)
		}

		// → Create a new group

		const group = await db.group.create({
			data: {
				name: data.name!,
				imageUrl: data.image.url!,
				profileId: profile.id,
				inviteCode: '',
				members: {
					create: [
						{
							profileId: profile.id,
							role: 'ADMIN',
						},
					],
				},
			},
		})

		// → Create a conversation

		const conversation = await db.conversation.create({
			data: {
				groupId: group.id,
				type: 'GRUPAL',
			},
		})

		return Response.json({
			group,
			conversation,
		})
	} catch (e) {
		console.log(['ERROR_GROUP'])
		return Response.json({ message: 'Internal Error' }, { status: 500 })
	}
}
