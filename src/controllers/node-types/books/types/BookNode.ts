import {ControllerNodeType} from "../../../types/ControllerNodeType"

export type BookNode = {
    node_type: ControllerNodeType.Book
    fields: {
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
