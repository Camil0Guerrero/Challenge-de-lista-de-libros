import { createContext, useEffect, useRef, useState } from 'react'
import { Book, Library } from '../types'
import { getBooks } from '../services/getBooks'

const LibraryContext = createContext({})

interface Props {
	children: React.ReactNode
}

function removeBooksFromReadingList(books: Library[], readingList: Library[]) {
	books.forEach(book => {
		const bookInReadingList = readingList.find(({ book: { ISBN } }) => ISBN === book.book.ISBN)

		if (bookInReadingList) {
			book.book.inReadList = true
		} else {
			book.book.inReadList = false
		}
	})

	return books
}

const initialReadingList = JSON.parse(localStorage.getItem('readingList')!)

const LibraryProvider: React.FC<Props> = ({ children }) => {
	const [books, setBooks] = useState<Library[]>([])
	const [readingList, setReadingList] = useState<Library[]>(initialReadingList || [])
	const [filters, setFilters] = useState({
		genre: '',
		pages: 0,
	})

	window.addEventListener('storage', () => {
		const readingList = JSON.parse(localStorage.getItem('readingList')!) ?? []
		setReadingList(readingList)

		const newBooks = removeBooksFromReadingList(books, readingList)
		setBooks(newBooks)
	})

	const originalBooks = useRef<Library[]>([])

	useEffect(() => {
		const getData = async () => {
			const books = await getBooks()
			originalBooks.current = books.library

			if (readingList.length === 0) {
				setBooks(books.library)
				return
			}

			// Si hay libros en la lista de lectura, agregamos la propiedad inReadList
			const newBooks = removeBooksFromReadingList(books.library, readingList)
			setBooks(newBooks)
		}

		getData()
	}, [])

	// Add reading list to localStorage
	useEffect(() => {
		localStorage.setItem('readingList', JSON.stringify(readingList))
	}, [readingList])

	// Add filters to books
	useEffect(() => {
		if (filters?.genre.length === 0) return

		const newBooks = originalBooks.current?.filter(
			({ book }) =>
				book.genre === filters.genre && book.pages >= filters.pages && !(book.inReadList === true)
		)

		setBooks(newBooks!)
	}, [filters])

	const booksAvailable = originalBooks.current?.length - readingList.length

	const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target

		if (name === 'genre') {
			if (value === '' || value === 'Todos') {
				setFilters(prevState => ({ ...prevState, genre: '' }))
				setBooks(originalBooks.current!)
				return
			}

			setFilters(prevState => ({ ...prevState, genre: value }))
		}

		if (name === 'pages') {
			setFilters(prevState => ({ ...prevState, pages: Number(value) }))
		}
	}

	const handleReadingList = (book: Book | string) => {
		let newBook: Library[] | undefined

		if (typeof book === 'string') {
			newBook = books.filter(({ book: { cover } }) => cover === book)
		} else {
			// Verificamos que el libro este dentro de los libros que tenemos
			newBook = originalBooks.current.filter(({ book: { ISBN } }) => ISBN === book.ISBN)
		}

		if (!newBook || newBook.length === 0) return

		const bookInReadingList = readingList.find(
			({ book: { ISBN } }) => ISBN === newBook![0].book.ISBN
		)

		if (!bookInReadingList) {
			// Si no esta en la lista de lectura lo agregamos
			newBook![0].book.inReadList = true
			setReadingList(prevState => prevState.concat(newBook!))
			return
		}

		// Si ya esta, lo eliminamos
		const newBooks = readingList.filter(({ book: { ISBN } }) => {
			if (ISBN !== newBook![0].book.ISBN) return book

			newBook![0].book.inReadList = false
			return false
		})

		setReadingList(newBooks)
	}

	const getGenders = () => {
		const genders = ['Todos']

		originalBooks.current?.forEach(({ book }) => {
			genders.push(book.genre)
		})

		return new Set(genders)
	}

	const gendersList = getGenders()

	const data = {
		booksAvailable,
		books,
		filters,
		gendersList,
		readingList,
		handleFilter,
		handleReadingList,
	}

	return <LibraryContext.Provider value={data}>{children}</LibraryContext.Provider>
}

export { LibraryProvider }

export default LibraryContext
