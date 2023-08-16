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
