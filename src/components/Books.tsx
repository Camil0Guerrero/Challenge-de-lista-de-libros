import { Book, Library } from '../types'
import BookCard from './BookCard'

interface BooksProps {
	library: Library[]
	handleReadingList: (book: Book) => void
}

function Books({ library, handleReadingList }: BooksProps) {
	return (
		<>
			<h2>Libros disponibles</h2>
			<section className='books'>
				{library.map(({ book }) => (
					<BookCard key={book.ISBN} book={book} handleReadingList={handleReadingList} />
				))}
			</section>
		</>
	)
}

export default Books
