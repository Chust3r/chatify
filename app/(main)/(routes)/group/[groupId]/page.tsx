import { ChatInput } from '@/components/chat-input'
import { ChatMessages } from '@/components/chat-messages'
import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/prisma'

interface Props {
	params: { groupId: string }
}

const GroupId = async ({ params }: Props) => {
	const { groupId } = params

	const group = await db.group.findFirst({
		where: {
			id: groupId,
		},
		include: {
			conversation: true,
		},
	})

	const data = await currentProfile()

	if (!data) {
		return
	}

	if (!group?.conversation?.id) return

	return (
		<>
			<ChatMessages
				apiUrl='/api/messages'
				query={{
					groupId,
					conversationId: group.conversation.id,
				}}
				name='Global chat'
				type='conversation'
				_data={data}
			/>
			<ChatInput
				apiUrl='/api/socket/messages'
				query={{
					groupId,
				}}
				type='grupal'
			/>
		</>
	)
}

export default GroupId
