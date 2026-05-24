import type {ModelNodeType} from "../../../types/ModelNodeType"

export type BookNode = {
    node_type: ModelNodeType.Book
    attributes: {
        id: number
        title: string
        author: string | null
        publisher: string | null
        year_of_publication: number | null
        isbn: string | null
        pages: number | null
        language: string | null

        created_at: string
        updated_at: string
    }
}
