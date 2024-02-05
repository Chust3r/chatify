import { ChatInput } from '@/components/chat-input'
import { ChatMessages } from '@/components/chat-messages'

interface Props {
	params: { slug: string }
}

const GroupId = async ({ params }: Props) => {
	return (
		<>
			<ChatMessages
				apiUrl='/api/messages'
				socketUrl='/api/socket/messages'
				socketQuery={{
					groupId: params.slug,
				}}
				paramKey='conversationId'
				paramValue='c7670f25-60ba-4a45-b2c1-536b93b32f12'
				name='Global chat'
				type='_conversation'
				chatId='xd'
			/>
			<ChatInput
				apiUrl='/api/socket/messages'
				query={{
					groupId: '94e7e46b-9b4d-41a6-9271-128c9bdfc7cc',
				}}
				type='grupal'
			/>
		</>
	)
}

export default GroupId
