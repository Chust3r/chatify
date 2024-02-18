import { Sidebar } from '@/components/sidebar'
interface Props {
	children: React.ReactNode
}
const MainLayout = ({ children }: Props) => {
	return (
		<section className='flex w-full h-screen overflow-hidden bg-background 2xl:container mx-auto divide-x-[1px] min-w-fit overflow-y-hidden'>
			<div className='w-80'>
				<Sidebar />
			</div>
			<div className='flex-1 w-full'>{children}</div>
		</section>
	)
}

export default MainLayout
