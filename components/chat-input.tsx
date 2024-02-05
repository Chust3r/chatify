'use client'
import { useSocket } from '@/providers/socket-provider'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import qs from 'query-string'
import { useForm } from 'react-hook-form'
import * as y from 'yup'
import { Form, FormField, FormItem } from './ui/form'
import { Input } from './ui/input'

interface Props {
	apiUrl: string
	query: Record<string, any>

	type: 'grupal' | 'individual'
}

const formSchema = y.object({
	content: y.string().min(1),
})

type FormType = y.InferType<typeof formSchema>

const defaultValues: FormType = {
	content: '',
}

export const ChatInput = ({ apiUrl, query, type }: Props) => {
	const form = useForm<FormType>({
		resolver: yupResolver(formSchema),
		defaultValues,
	})

	const { control, handleSubmit, reset } = form

	const onSumbit = async (data: FormType) => {
		try {
			const url = qs.stringifyUrl({
				url: apiUrl,
				query,
			})

			await axios.post(url, data)

			reset()
		} catch (e) {
			console.log(e)
		}
	}

	const isLoading = form.formState.isSubmitting

	const { socket } = useSocket()

	socket?.on(
		'chat:94e7e46b-9b4d-41a6-9271-128c9bdfc7cc:messages',
		(data: any) => console.log(data)
	)

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onSumbit)} autoComplete='off'>
				<FormField
					control={control}
					name='content'
					render={({ field }) => (
						<FormItem>
							<Input {...field} disabled={isLoading} />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	)
}
