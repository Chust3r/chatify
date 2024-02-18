import { object, string, InferType } from 'yup'

export const formSchemaChatMessage = object({
	content: string().min(1),
	file: string().min(1).optional(),
})

export type FormTypeChatMessage = InferType<typeof formSchemaChatMessage>
