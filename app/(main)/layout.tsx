import { Sidebar } from '@/components/sidebar'

interface Props {
	children: React.ReactNode
}
const MainLayout = ({ children }: Props) => {
	return (
		<div className='flex w-full h-screen overflow-hidden bg-white max-w-6xl mx-auto'>
			<Sidebar />
			<main className='flex-1'>{children}</main>
		</div>
	)
}

export default MainLayout
