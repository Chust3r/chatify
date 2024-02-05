import { NextApiResponseServerIo } from '@/types/types'
import { NextApiRequest } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponseServerIo) => {
	if (req.method !== 'DELETE' && req.method !== 'PATCH') {
		return res.status(405).json({ message: 'Method not allowed' })
	}

	try {
	} catch (e) {
		console.log('[MESSAGE_ID]', e)
	}
}

export { handler }
