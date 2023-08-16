/* eslint-disable indent */
import { BookActionTypes } from '../actions/Book'
import { getBooks } from '../services/getBooks'
import type { Book } from '../types'

export interface PropsBookReducer {
	state: Book[]
	action: {
		type: BookActionTypes
		payload: Book | string
	}
}

const initialState = getBooks()

export function bookReducer({ state, action }: PropsBookReducer) {
	switch (action.type) {
		case BookActionTypes.GET_BOOKS: {
			return initialState
		}

		case BookActionTypes.ADD_BOOK: {
			return [...state, action.payload]
		}

		case BookActionTypes.REMOVE_BOOK: {
			return state.filter(book => book.ISBN !== action.payload)
		}

		default: {
			return state
		}
	}
}
