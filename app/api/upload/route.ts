import cloudinary from 'cloudinary'

import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
	try {
		const data = await req.json()

		const uploadResponse = await cloudinary.v2.uploader.upload(data.image)

		return NextResponse.json({
			url: uploadResponse.secure_url,
		})
	} catch (e) {
		console.log(e)
		return NextResponse.json(
			{ message: 'Internal Server Error' },
			{ status: 500 }
		)
	}
}
