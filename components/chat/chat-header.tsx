import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

interface Props {
	name: string
	imageUrl?: string
}

export const ChatHeader = ({ name, imageUrl }: Props) => {
	return (
		<header className='w-full py-3 px-3'>
			<div className='flex items-center gap-2'>
				<Avatar className='w-12 h-12'>
					<AvatarImage src={imageUrl!} role='img' />
					<AvatarFallback>{name[0]}</AvatarFallback>
				</Avatar>
				<h2 className='font-semibold'>{name}</h2>
			</div>
		</header>
	)
}
