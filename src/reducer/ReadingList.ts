/* eslint-disable indent */
import { ReadingListActionTypes } from '../actions/ReadingList'
import { Book } from '../types'

export interface PropsReadingListReducer {
	state: Book[]
	action: {
		type: ReadingListActionTypes
		payload: Book | string
	}
}

export function ReadingList({ state, action }: PropsReadingListReducer) {
	switch (action.type) {
		case ReadingListActionTypes.GET_READING_LIST: {
			return state
		}

		case ReadingListActionTypes.ADD_BOOK_TO_READING_LIST: {
			return [...state, action.payload]
		}

		case ReadingListActionTypes.REMOVE_BOOK_FROM_READING_LIST: {
			return state.filter(book => book.ISBN !== action.payload)
		}
	}
}
