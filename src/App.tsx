import { useState } from 'react'
import './App.css'
import Books from './components/Books'
import ReadingList from './components/ReadingList'
import BurgerReadList from './components/BurgerReadList'
import Header from './components/Header'
import { LibraryProvider } from './context/LibraryContext'

function App() {
	const [open, setOpen] = useState(false)

	const handleMenu = () => {
		setOpen(!open)
	}

	return (
		<LibraryProvider>
			<Header />
			<main>
				{open && <ReadingList />}
				<Books />
				<BurgerReadList handleMenu={handleMenu} open={open} />
			</main>
		</LibraryProvider>
	)
}

export default App
