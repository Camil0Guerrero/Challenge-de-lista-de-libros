import { useContext, useState } from 'react'
import Button from './Button'
import { LibraryContextType } from '../types'
import './ReadingList.css'
import LibraryContext from '../context/LibraryContext'

function ReadingList() {
	const { readingList, handleReadingList } = useContext(LibraryContext) as LibraryContextType
	const [over, setOver] = useState(false)

	if (readingList.length === 0) return

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()

		// De esta forma definimos el tipo de dato que vamos a recibir
		const urlImage = e.dataTransfer?.getData('text/plain')
		if (!urlImage) return

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
			{readingList.map(({ book }) => {
				return (
					<div key={book.ISBN}>
						<h5>{book.title}</h5>
						<img src={book.cover} alt={`Portada del libro ${book.title}`} />
						<Button label='Eliminar' mode='secondary' onClick={() => handleReadingList(book)} />
					</div>
				)
			})}
		</article>
	)
}

export default ReadingList
