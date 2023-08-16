import { useEffect, useState } from 'react'
import './App.css'
import Books from './components/Books'
import { Book, Library } from './types'
import { getBooks } from './services/getBooks'
import ReadingList from './components/ReadingList'
import BurgerReadList from './components/BurgerReadList'
import Header from './components/Header'

function App() {
	const [library, setLibrary] = useState<Library[]>([])
	const [readingList, setReadingList] = useState<Library[]>([])
	const [open, setOpen] = useState(false)
	const genders: string[] = []

	useEffect(() => {
		getBooks().then(books => setLibrary(books.library))
	}, [])

	const handleReadingList = (book: Book | string) => {
		if (typeof book === 'string') {
			const newBook = library.find(({ book: { cover } }) => cover === book)
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

		setLibrary(prevState => {
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

	const handleMenu = () => {
		if (readingList.length === 0) return
		setOpen(!open)
	}

	const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const filter = e.target.value

		if (filter === '') {
			getBooks().then(books => setLibrary(books.library))
			return
		}

		setLibrary(prevState => {
			return prevState.filter(({ book }) => book.genre === filter)
		})
	}

	const getGenders = () => {
		library.forEach(({ book }) => {
			genders.push(book.genre)
		})

		return new Set(genders)
	}

	const gendersList = getGenders()

	return (
		<>
			<Header gendersList={gendersList} handleFilter={handleFilter} />
			<main>
				{open && readingList.length > 0 && (
					<ReadingList readingList={readingList} handleReadingList={handleReadingList} />
				)}
				<Books library={library} handleReadingList={handleReadingList} />

				<BurgerReadList handleMenu={handleMenu} open={open} />
			</main>
		</>
	)
}

export default App
