import { Books } from '../../types'
import json from '../../books.json'

export async function getBooks(): Promise<Books> {
	return json
}
