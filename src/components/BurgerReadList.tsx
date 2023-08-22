import { useContext } from 'react'
import Button from './Button'
import LibraryContext from '../context/LibraryContext'
import { LibraryContextType } from '../types'

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
			<img
				src={`/images/${open ? 'book-open.svg' : 'books-close.svg'}`}
				alt='Libro abierto'
				title='Abre la lista de lectura'
			/>
		</Button>
	)
}

export default BurgerReadList
