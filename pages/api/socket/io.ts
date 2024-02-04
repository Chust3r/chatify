import { Server as NetServer } from 'http'
import { NextApiRequest } from 'next'
import { Server as ServerIo } from 'socket.io'

import { NextApiResponseServerIo } from '@/types/types'

export const config = {
	bodyParser: true,
}

const handler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
	if (!res.socket.server.io) {
		const path = '/api/socket/io'
		const httpServer: NetServer = res.socket.server as any
		const io = new ServerIo(httpServer, {
			path,
			addTrailingSlash: true,
		})
		res.socket.server.io = io
	}

	res.end()
}
export default handler
