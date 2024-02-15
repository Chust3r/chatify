import { ChangeEvent, useState } from 'react'

export const useUploadFiles = () => {
	const [files, setFiles] = useState<File[]>([])

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		let fls: File[] = []

		if (!e.target.files) return fls

		for (const file of Array.from(e.target.files)) {
			files.push(file)
		}

		setFiles(fls)

		return files
	}

	return {
		handleChange,
	}
}
