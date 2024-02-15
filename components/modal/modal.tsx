'use client'
import { CreateGroup } from './modal-create-group'

interface Props {
	type: 'create-group'
}

const modals = {
	'create-group': CreateGroup,
}

export const Modal = ({ type }: Props) => {
	return modals[type]()
}
