import Button from '../atoms/Button'
import { Book } from '../types'
import './BookCard.css'

interface Props {
	book: Book
	handleReadingList: (book: Book) => void
}

function BookCard({ book, handleReadingList }: Props) {
	if (book.inReadList) return

	return (
		<article>
			<h3>{book.title}</h3>
			<img src={book.cover} alt={book.title} draggable='true' />
			<div className='information'>
				<span>{book.author.name}</span>
				<span className='year'>{book.year}</span>
			</div>
			<Button
				label={book.inReadList ? 'Eliminar' : 'Agregar'}
				mode={book.inReadList ? 'secondary' : 'primary'}
				onClick={() => handleReadingList(book)}
			/>
		</article>
	)
}

export default BookCard
