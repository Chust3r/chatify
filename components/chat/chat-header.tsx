import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

interface Props {
	name: string
	imageUrl?: string
}

export const ChatHeader = ({ name, imageUrl }: Props) => {
	return (
		<header className='w-full py-3 px-3'>
			<div className='flex items-center gap-2'>
				<div className='relative'>
					<Avatar>
						<AvatarImage src={imageUrl!} />
						<AvatarFallback>{name[0]}</AvatarFallback>
					</Avatar>
					<span className='absolute w-2 h-2 bg-lime-400 rounded-full bottom-0 right-1' />
				</div>
				<h2 className='font-semibold'>{name}</h2>
			</div>
		</header>
	)
}
