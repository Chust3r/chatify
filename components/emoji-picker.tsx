'use client'

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { SmileIcon } from 'lucide-react'

interface EmojiPickerProps {
	onChange: (value: string) => void
}

export const EmojiPicker = ({ onChange }: EmojiPickerProps) => {
	return (
		<Popover>
			<PopoverTrigger >
				<SmileIcon className='w-5 h-5 transition text-muted-foreground hover:text-foreground' />
			</PopoverTrigger>
			<PopoverContent
				className='mb-16 bg-transparent border-none shadow-none drop-shadow-none'
				sideOffset={80}
				side='right'
			>
				<Picker
					emojiSize={18}
					theme='light'
					data={data}
					maxFrequentRows={1}
					previewPosition='none'
					onEmojiSelect={(emoji: any) => onChange(emoji.native)}
					locale='en'
				/>
			</PopoverContent>
		</Popover>
	)
}
