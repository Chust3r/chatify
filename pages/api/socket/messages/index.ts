import { currentProfilePages } from '@/lib/current-profile-pages'
import { db } from '@/lib/prisma'
import { NextApiResponseServerIo } from '@/types/types'
import { NextApiRequest } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponseServerIo) => {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method Not Allowed' })
	}
	try {
		const profile = await currentProfilePages(req)

		const { content } = req.body
		const { groupId } = req.query

		if (!profile) {
			return res.status(401).json({ error: 'Unauthoraized' })
		}

		//→ TODO Validations

		const group = await db.group.findFirst({
			where: {
				id: groupId as string,
				members: {
					some: {
						profileId: profile.id,
					},
				},
			},
		})

		if (!group) {
			return res.status(404).json({ message: 'Group not found' })
		}

		const conversation = await db.conversation.findUnique({
			where: {
				groupId: groupId as string,
			},
		})

		if (!conversation) {
			return res.status(404).json({ message: 'Conversation missing' })
		}

		const message = await db.message.create({
			data: {
				content: content as string,
				conversationId: conversation.id,
				senderId: profile.id,
			},
			include: {
				sender: true,
			},
		})

		//→ Update last activity

		await db.group.update({
			where: {
				id: groupId as string,
			},
			data: {
				lastActivity: new Date(),
			},
		})

		const key = `chat:${groupId}:messages`

		res.socket.server.io.emit(key, message)

		return res.status(200).json({ key })
	} catch (e) {
		console.log('[MESSAGES_POST]', e)
		return res.status(500).json({ message: 'Internal Error' })
	}
}

export default handler
