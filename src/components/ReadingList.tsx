import { useState } from 'react'
import Button from '../atoms/Button'
import { Book, Library } from '../types'
import './ReadingList.css'

interface ReadingListProps {
	readingList: Library[]
	handleReadingList: (book: Book | string) => void
}

function ReadingList({ readingList, handleReadingList }: ReadingListProps) {
	const [over, setOver] = useState(false)

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()

		// De esta forma definimos el tipo de dato que vamos a recibir
		const urlImage = e.dataTransfer?.getData('text/plain')

		if (!urlImage) return

		const bookInReadingList = readingList.find(({ book: { cover } }) => cover === urlImage)
		if (bookInReadingList) return

		handleReadingList(urlImage)
		setOver(false)
	}

	return (
		<article
			className={`reading-list${over ? ' over' : ''}`}
			onDragEnter={() => setOver(true)}
			onDragLeave={() => setOver(false)}
			// Esta linea es esencial ya que por defecto no nos permite soltar elementos
			onDragOver={e => e.preventDefault()}
			onDrop={handleDrop}
		>
			<h3>{over ? 'Agregar Libro' : 'Lista de lectura'}</h3>
			{readingList.map(({ book }) => (
				<div key={book.ISBN}>
					<h5>{book.title}</h5>
					<img src={book.cover} alt={`Portada del libro ${book.title}`} />
					<Button label='Eliminar' mode='secondary' onClick={() => handleReadingList(book)} />
				</div>
			))}
		</article>
	)
}

export default ReadingList
