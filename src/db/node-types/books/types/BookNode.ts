import {DbNodeType} from "../../../types/DbNodeType"

export type BookNode = {
    node_type: DbNodeType.Book,
    properties: {
        id: number
        created_at: string
        updated_at: string
        title: string
        author: string | null
        publisher: string | null
        year_of_publication: number | null
        isbn: string | null
        pages: number | null
        language: string | null
    }
}
