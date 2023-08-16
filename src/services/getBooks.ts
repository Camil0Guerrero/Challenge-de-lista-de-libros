import { Books } from '../types'
import json from '../data/books.json'

export async function getBooks(): Promise<Books> {
	return json
}
