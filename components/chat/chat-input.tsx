'use client'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import qs from 'query-string'
import { useForm } from 'react-hook-form'
import * as y from 'yup'
import { EmojiPicker } from '../emoji-picker'
import { Form, FormField, FormItem } from '../ui/form'
import { Input } from '../ui/input'

interface Props {
	apiUrl: string
	query: {
		groupId: string
		[key: string]: string
	}
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

	const router = useRouter()

	const { control, handleSubmit, reset } = form

	const onSumbit = async (data: FormType) => {
		try {
			const url = qs.stringifyUrl({
				url: apiUrl,
				query,
			})

			await axios.post(url, data)

			reset()
			router.refresh()
		} catch (e) {
			console.log(e)
		}
	}

	const isLoading = form.formState.isSubmitting

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onSumbit)} autoComplete='off'>
				<FormField
					control={control}
					name='content'
					render={({ field }) => (
						<FormItem className='relative'>
							<Input
								{...field}
								disabled={isLoading}
								className='pr-16 focus:ring-0'
							/>
							<div className='absolute top-0 right-8'>
								<EmojiPicker
									onChange={(emoji: string) =>
										field.onChange(`${field.value}${emoji}`)
									}
								/>
							</div>
						</FormItem>
					)}
				/>
			</form>
		</Form>
	)
}
