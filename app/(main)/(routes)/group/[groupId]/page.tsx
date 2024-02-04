import { ChatInput } from '@/components/chat-input'

const GroupId = async () => {
	return (
		<>
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
