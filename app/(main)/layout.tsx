import { Sidebar } from '@/components/sidebar'

interface Props {
	children: React.ReactNode
}
const MainLayout = ({ children }: Props) => {
	return (
		<div className='flex h-screen w-full overflow-hidden bg-blue-200'>
			<Sidebar />
			<main className='flex-1'>{children}</main>
		</div>
	)
}

export default MainLayout
