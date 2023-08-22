import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, test } from 'vitest'
import App from './App'
import { getBooks } from './utils/functions/getBooks'

describe('render the App component', async () => {
	const originalBooks = await getBooks()
	const originalGenres = new Set(originalBooks.library.map(({ book }) => book.genre))
	const originalBooksLength = originalBooks.library.length

	render(<App />)

	it.concurrent('should render the title', async () => {
		const title = await screen.findByRole('heading', { name: 'Prueba 1' })
		expect(title).toBeTruthy()
	})

	it.concurrent('should render the filters', async () => {
		const genres = await screen.findAllByRole('option')
		expect(genres).toHaveLength(originalGenres.size + 1)
	})

	it.concurrent('should render the books', () => {
		// Como no hay libros en la lista de lectura, deberían aparecer todos los libros disponibles
		const numberBooks = Number(screen.getByText(/Disponibles:/).children[0]?.textContent)
		expect(numberBooks).toBe(originalBooksLength)

		// Ademas, todos deberían de aparecer en pantalla
		const books = screen.getAllByRole('article')
		expect(books).toHaveLength(originalBooksLength)
	})

	// eslint-disable-next-line quotes
	it.concurrent("shouldn't render the reading list", () => {
		// No deberían haber libros en la lista de lectura ya que no tenemos disponible el LocalStorage
		const onReadingList = Number(screen.getByText(/lista de lectura:/i).children[0]?.textContent)
		expect(onReadingList).toBe(0)

		// El botón de la lista de lectura debería no estar disponible ya que no hay libros
		const $button = document.querySelector('.btn-menu')
		expect($button).toBeNull()
	})

	test('should add a book to the reading list', async () => {
		const buttonToAdd = await screen.findAllByRole('button', { name: 'Agregar' })
		fireEvent.click(buttonToAdd[0])
	})

	test('The book should be in the reading list', () => {
		const onReadingList2 = Number(screen.getByText(/lista de lectura:/i).children[0]?.textContent)
		expect(onReadingList2).toBe(1)
	})

	test('Button should be available', () => {
		const $button2 = document.querySelector('.btn-menu')
		expect($button2).not.toBeNull()
	})

	test('The book should be removed from the available books', () => {
		// Y ahora debería aparecer un libro menos en pantalla
		const numberBooks2 = Number(screen.getByText(/Disponibles/).children[0].textContent)
		expect(numberBooks2).toBe(originalBooksLength - 1)
	})
})
