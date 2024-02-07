import { globalGroup } from '@/lib/add-global'
import { initialProfile } from '@/lib/initial-profile'
import { Sidebar } from '@/components/sidebar'

const SetuPage = async () => {
	const profile = await initialProfile()

	// → ADD GLOBAL CHAT

	await globalGroup(profile.id)

	return (
		<div>
			<Sidebar />
		</div>
	)
}

export default SetuPage
