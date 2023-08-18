import { useContext, useState } from 'react'
import './App.css'
import Books from './components/Books'
import ReadingList from './components/ReadingList'
import BurgerReadList from './components/BurgerReadList'
import Header from './components/Header'
import LibraryContext from './context/LibraryContext'
import { LibraryContextType } from './types'

function App() {
	const { booksAvailable, readingList } = useContext(LibraryContext) as LibraryContextType
	const [open, setOpen] = useState(false)

	const handleMenu = () => {
		if (readingList.length === 0) return
		setOpen(!open)
	}

	return (
		<>
			<Header />
			<main>
				{open && readingList.length > 0 && <ReadingList />}
				{booksAvailable > 0 && <Books />}

				<BurgerReadList handleMenu={handleMenu} open={open} />
			</main>
		</>
	)
}

export default App
