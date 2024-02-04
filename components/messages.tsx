'use client'
import axios from 'axios'
import { FormEvent } from 'react'

export const Messages = () => {
	const onSumbmit = async (e: FormEvent) => {
		e.preventDefault()

		const res = await axios.post('http://localhost:3000/api/socket/messages')

		console.log(res)
	}

	return (
		<form onSubmit={onSumbmit}>
			<h2>This is a form</h2>
			<button type='submit'>SEnd</button>
		</form>
	)
}
