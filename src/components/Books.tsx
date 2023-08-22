import { useContext } from 'react'
import LibraryContext from '../context/LibraryContext'
import { LibraryContextType } from '../types'
import BookCard from './BookCard'

function Books() {
	const { books, booksAvailable, handleReadingList } = useContext(
		LibraryContext
	) as LibraryContextType

	if (booksAvailable === 0) return

	return (
		<>
			<h2>Libros disponibles</h2>
			<section className='books'>
				{books.map(({ book }) => (
					<BookCard key={book.ISBN} book={book} handleReadingList={handleReadingList} />
				))}
			</section>
		</>
	)
}

export default Books
