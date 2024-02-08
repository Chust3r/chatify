import { ChatHeader } from '@/components/chat/chat-header'
import { ChatInput } from '@/components/chat/chat-input'
import { ChatMessages } from '@/components/chat/chat-messages'
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
		<main className='flex flex-col w-full h-screen'>
			<ChatHeader name={group.name} />

			<ChatMessages
				apiUrl='/api/messages'
				query={{
					groupId,
					conversationId: group.conversation.id,
				}}
				name='Global chat'
				type='conversation'
				profile={data}
				className='px-3 pb-2'
			/>

			<ChatInput
				apiUrl='/api/socket/messages'
				query={{
					groupId,
				}}
				type='grupal'
			/>
		</main>
	)
}

export default GroupId
