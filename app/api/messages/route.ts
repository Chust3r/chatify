import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/prisma'
import { Message } from '@prisma/client'
import { NextResponse } from 'next/server'

const MESSAGES_BATCH = 10

export const GET = async (req: Request) => {
	try {
		const profile = await currentProfile()

		const { searchParams } = new URL(req.url)

		const cursor = searchParams.get('cursor')
		const conversationId = searchParams.get('conversationId')

		if (!profile) {
			return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
		}

		if (!conversationId) {
			return NextResponse.json(
				{ message: 'Conversation ID missing' },
				{ status: 400 }
			)
		}

		let messages: Message[] = []

		if (cursor) {
			messages = await db.message.findMany({
				take: MESSAGES_BATCH,
				skip: 1,
				cursor: {
					id: cursor,
				},
				where: {
					conversationId,
				},
				include: {
					sender: true,
				},
				orderBy: {
					createdAt: 'desc',
				},
			})
		} else {
			messages = await db.message.findMany({
				take: MESSAGES_BATCH,
				where: {
					conversationId,
				},
				include: {
					sender: true,
				},
				orderBy: {
					createdAt: 'desc',
				},
			})
		}

		let nextCursor = null

		if (messages.length === MESSAGES_BATCH) {
			nextCursor = messages[MESSAGES_BATCH - 1].id
		}

		return NextResponse.json({ items: messages, nextCursor })
	} catch (e) {
		console.log(['MESSAGES_ERROR'])
		return NextResponse.json({ message: 'Internal error' }, { status: 500 })
	}
}
