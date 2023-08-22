import { Library } from '../../types'

export function removeBooksFromReadingList(books: Library[], readingList: Library[]) {
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
