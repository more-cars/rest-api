import type {BookInput} from "../types/BookInput"
import type {DbInputData} from "../../../../db/types/DbInputData"

export function convertInputData(data: BookInput): DbInputData {
    return {
        title: data.title,
        author: data.author,
        publisher: data.publisher,
        year_of_publication: data.year_of_publication,
        isbn: data.isbn,
        pages: data.pages,
        language: data.language,
    }
}
