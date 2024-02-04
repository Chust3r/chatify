interface Props {
	children: React.ReactNode
}

const AuthLayout = ({ children }: Props) => {
	return (
		<div className='w-full h-screen flex items-center justify-center'>
			{children}
		</div>
	)
}

export default AuthLayout
