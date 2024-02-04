import { currentProfilePages } from '@/lib/current-profile-pages'
import { NextApiResponseServerIo } from '@/types/types'
import { NextApiRequest } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponseServerIo) => {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method Not Allowed' })
	}
	try {
		const profile = await currentProfilePages(req)

		if (!profile) {
			return res.status(401).json({ error: 'Unauthoraized' })
		}

		const key = `chat:${profile.id}:messages`

		res.socket.server.io.emit(key, 'Hola')

		return res.status(200).json({ key })
	} catch (e) {
		console.log('[MESSAGES_POST]', e)
		return res.status(500).json({ message: 'Internal Error' })
	}
}

export default handler
