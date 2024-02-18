import { ChatHeader } from '@/components/chat/chat-header'
import { ChatInput } from '@/components/chat/chat-input'
import { ChatMessages } from '@/components/chat/chat-messages'
import { currentProfile } from '@/lib/current-profile'
import { db } from '@/lib/prisma'
import qs from 'query-string'

interface Props {
	params: { groupId: string }
}

const GroupId = async ({ params }: Props) => {
	const { groupId } = params

	// → GROUP DATA

	const group = await db.group.findFirst({
		where: {
			id: groupId,
		},
		include: {
			conversation: true,
		},
	})

	// → PROFILE

	const profile = await currentProfile()

	if (!profile) {
		return
	}

	// → CONVERSATION

	if (!group?.conversation?.id) return

	// → MESSAGES

	const query = {
		groupId,
		conversationId: group.conversation.id,
	}

	return (
		<main className='flex flex-col w-full h-screen'>
			<ChatHeader name={group.name} imageUrl={group.imageUrl!} />

			<ChatMessages
				apiUrl='/api/messages'
				query={query}
				name='Global chat'
				type='conversation'
				profile={profile}
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
