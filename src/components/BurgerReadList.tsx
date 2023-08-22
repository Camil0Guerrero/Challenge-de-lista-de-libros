import { useContext } from 'react'
import Button from './Button'
import LibraryContext from '../context/LibraryContext'
import { LibraryContextType } from '../types'
import { booksCloseIcon, bookOpenIcon } from './BookIcons'

interface BurgerReadListProps {
	open: boolean
	handleMenu: () => void
}

function BurgerReadList({ open, handleMenu }: BurgerReadListProps) {
	const { readingList } = useContext(LibraryContext) as LibraryContextType

	if (readingList.length === 0) return

	return (
		<Button
			className='btn-menu'
			onClick={() => {
				if (readingList.length === 0) return

				handleMenu()
			}}
		>
			{open ? bookOpenIcon() : booksCloseIcon()}
		</Button>
	)
}

export default BurgerReadList
