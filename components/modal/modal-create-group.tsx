import { useForm } from 'react-hook-form'
import * as y from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '../ui/sheet'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import axios from 'axios'
import { useUploadFiles } from '@/hooks/use-upload-files'
import { ChangeEvent, useState } from 'react'
import { convertFileToBase64 } from '@/lib/convert-file-to-base-64'

const formSchema = y.object().shape({
	name: y.string().required(),
	image: y.mixed().optional(),
})

type FormType = y.InferType<typeof formSchema>

const defaultValues: FormType = {
	name: '',
}

export const CreateGroup = () => {
	const form = useForm<FormType>({
		defaultValues,
		resolver: yupResolver(formSchema),
	})

	const [preview, setPreview] = useState<File>()

	const { reset, handleSubmit, setValue } = form

	const isLoading = form.formState.isLoading

	const onSumbit = async (data: FormType) => {
		await axios.post('/api/groups', data)
		reset()
	}

	const { handleChange } = useUploadFiles()

	const handleChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
		const data = handleChange(e)

		if (!data) return

		setValue('image', data[0])
		setPreview(data[0])

		const base64 = await convertFileToBase64(data[0])

		const res = await axios.post('/api/upload', { image: base64 })

		setValue('image', res.data)
	}

	return (
		<Sheet>
			<SheetTrigger>Create a group</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>New group</SheetTitle>
				</SheetHeader>
				<Form {...form}>
					<form
						autoComplete='off'
						className='flex flex-col gap-4'
						onSubmit={handleSubmit(onSumbit)}
					>
						<FormField
							name='image'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='w-full flex justify-center'>
										<div className='w-40 h-40 rounded-full bg-neutral-200 relative'>
											{preview && (
												// eslint-disable-next-line @next/next/no-img-element
												<img
													src={URL.createObjectURL(preview)}
													alt='image_group'
													className='w-full h-full object-cover rounded-full'
												/>
											)}
										</div>
									</FormLabel>
									<FormControl>
										<Input
											className='hidden'
											type='file'
											onChange={handleChangeImage}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							name='name'
							render={({ field }) => (
								<FormItem>
									<Input {...field} placeholder='Name' />
								</FormItem>
							)}
						/>
						<Button type='submit'>Create</Button>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	)
}

/* 

<FormField
							name='image'
							render={({ field }) => (
								<FormItem className='w-full flex justify-center items-center'>
									<FormLabel>
										<div className='w-40 h-40 rounded-full bg-neutral-200'></div>
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder='Name'
											type='file'
											className='hidden'
										/>
									</FormControl>
								</FormItem>
							)}
						/>

*/
