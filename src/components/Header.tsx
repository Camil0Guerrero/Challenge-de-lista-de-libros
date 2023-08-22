import { useContext } from 'react'
import LibraryContext from '../context/LibraryContext'
import { LibraryContextType } from '../types'
import './Header.css'

function Header() {
	const { books, filters, booksAvailable, gendersList, handleFilter, readingList } = useContext(
		LibraryContext
	) as LibraryContextType

	return (
		<>
			<h1>Prueba 1</h1>
			<aside>
				<label>
					Géneros:{' '}
					<select name='genre' id='gender' onChange={handleFilter}>
						<option value='Todos'>Todos</option>
						{[...gendersList].map(gender => (
							<option key={gender} value={gender}>
								{gender}
							</option>
						))}
					</select>
				</label>

				<div className='counters'>
					{booksAvailable === 0 ? (
						<p className='available'>Sin libros Disponibles 😴</p>
					) : (
						<p className='available'>
							Libros Disponibles: <span>{booksAvailable}</span>
						</p>
					)}
					{filters?.genre.length > 0 && (
						<p>
							Libros de {filters?.genre}: <span>{books.length}</span>
						</p>
					)}
					<p className='reading-list-counter'>
						En lista de lectura: <span>{readingList.length}</span>
					</p>
				</div>
			</aside>
		</>
	)
}

export default Header
