import { UserButton } from '@clerk/nextjs'

export const Sidebar = () => {
	return (
		<div className='w-72 h-screen bg-slate-100'>
			<UserButton />
			SIDEBAR
		</div>
	)
}
