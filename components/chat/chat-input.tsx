'use client'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { Paperclip, Send } from 'lucide-react'
import { useRouter } from 'next/navigation'
import qs from 'query-string'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import { FormTypeChatMessage, formSchemaChatMessage } from '@/lib/form-schemas'

interface Props {
	apiUrl: string
	query: {
		groupId: string
		[key: string]: string
	}
	type: 'grupal' | 'individual'
}

const defaultValues: FormTypeChatMessage = {
	content: '',
}

export const ChatInput = ({ apiUrl, query, type }: Props) => {
	const form = useForm<FormTypeChatMessage>({
		resolver: yupResolver(formSchemaChatMessage),
		defaultValues,
	})

	const router = useRouter()

	const { control, handleSubmit, reset, getValues, setValue } = form

	const onSumbit = async (data: FormTypeChatMessage) => {
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

	/* const handleEmoji = (emoji: string) => {
		const contentValue = getValues('content')
		setValue('content', `${contentValue}${emoji}`)
	} */

	return (
		<Form {...form}>
			<form
				onSubmit={handleSubmit(onSumbit)}
				autoComplete='off'
				className='flex px-7 py-3 gap-2 items-center justify-center'
			>
				<FormField
					control={control}
					name='file'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='flex items-center justify-center h-10 w-10 cursor-pointer'>
								<Paperclip className='text-muted-foreground hover:text-foreground w-5 h-5' />
							</FormLabel>
							<FormControl>
								<Input type='file' {...field} className='hidden' />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name='content'
					render={({ field }) => (
						<FormItem className='w-full flex-1 h-12'>
							<Input
								{...field}
								className=' rounded-xl resize-none h-full'
								placeholder='Type a message'
								disabled={isLoading}
							/>
						</FormItem>
					)}
				/>
				<Button size='icon' variant='ghost' type='submit'>
					<Send className='text-muted-foreground hover:text-foreground w-5 h-5' />
				</Button>
			</form>
		</Form>
	)
}
