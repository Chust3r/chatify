interface Props {
	name: String
}

export const ChatHeader = ({ name }: Props) => {
	return <header className='w-full py-5'>{name}</header>
}
