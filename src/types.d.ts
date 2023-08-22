export type Books = {
	library: Library[]
}

export type Library = {
	book: Book
}

export type Book = {
	title: string
	pages: number
	genre: string
	cover: string
	synopsis: string
	year: number
	ISBN: string
	author: Author
	inReadList?: boolean
}

export type Author = {
	name: string
	otherBooks: string[]
}

export type Filters = {
	genre: string
	pages: number
}

export type LibraryContextType = {
	booksAvailable: number
	books: Library[]
	filters: Filters
	gendersList: Set<string>
	readingList: Library[]
	handleFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void
	handleReadingList: (book: Book | string) => void
}

export interface ProviderProps {
	children: React.ReactNode
}
