import { createContext, useEffect, useState } from 'react'
import { Book, Library } from '../types'
import { getBooks } from '../services/getBooks'

const LibraryContext = createContext({})

interface Props {
	children: React.ReactNode
}

const LibraryProvider: React.FC<Props> = ({ children }) => {
	const [books, setBooks] = useState<Library[]>([])
	const [readingList, setReadingList] = useState<Library[]>([])

	useEffect(() => {
		getBooks().then(books => setBooks(books.library))
	}, [])

	const handleReadingList = (book: Book | string) => {
		if (typeof book === 'string') {
			const newBook = books.filter(({ book: { cover } }) => cover === book)
			if (!newBook) return

			setReadingList(prevState => prevState.concat(newBook))
			return
		}

		const bookInReadingList = readingList.find(({ book: { ISBN } }) => ISBN === book.ISBN)

		if (bookInReadingList) {
			setReadingList(
				readingList.filter(({ book: { ISBN } }) => {
					if (ISBN === book.ISBN) {
						book.inReadList = false
					}
					return ISBN !== book.ISBN
				})
			)
			return
		}

		setBooks(prevState => {
			return prevState.map(library => {
				if (library.book.ISBN === book.ISBN) {
					library.book.inReadList = true
				}
				return library
			})
		})

		book.inReadList = true
		setReadingList([...readingList, { book }])
	}

	const data = {
		books,
		readingList,
		handleReadingList,
	}

	return <LibraryContext.Provider value={data}>{children}</LibraryContext.Provider>
}

export { LibraryProvider }

export default LibraryContext
