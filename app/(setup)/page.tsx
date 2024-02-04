import { Indicator } from '@/components/indicator'
import { Messages } from '@/components/messages'
import { globalGroup } from '@/lib/add-global'
import { initialProfile } from '@/lib/initial-profile'

const SetuPage = async () => {
	const profile = await initialProfile()

	// → ADD GLOBAL CHAT

	await globalGroup(profile.id)

	return (
		<div>
			<Indicator />
			<Messages />
		</div>
	)
}

export default SetuPage
