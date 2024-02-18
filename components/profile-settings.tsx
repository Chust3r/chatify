'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { useClerk } from '@clerk/nextjs'
import { Profile } from '@prisma/client'

interface Props {
	profile: Profile
}

export const ProfileSettings = ({ profile }: Props) => {
	const { signOut } = useClerk()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar tabIndex={1}>
					<AvatarImage src={profile?.imageUrl!} />
					<AvatarFallback>{profile?.name[0]}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='ml-5'>
				<DropdownMenuLabel>Profile</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={() => signOut()}
					className='cursor-pointer'
				>
					Sign Out
				</DropdownMenuItem>
				<DropdownMenuItem>Billing</DropdownMenuItem>
				<DropdownMenuItem>Team</DropdownMenuItem>
				<DropdownMenuItem>Subscription</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
