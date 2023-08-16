import Button from '../atoms/Button'

interface BurgerReadListProps {
	open: boolean
	handleMenu: () => void
}

function BurgerReadList({ open, handleMenu }: BurgerReadListProps) {
	return (
		<Button className='btn-menu' onClick={handleMenu}>
			<img
				src={`/images/${open ? 'logo-book-open.png' : 'logo-books.png'}`}
				alt='Libro abierto'
				title='Abre la lista de lectura'
			/>
		</Button>
	)
}

export default BurgerReadList
