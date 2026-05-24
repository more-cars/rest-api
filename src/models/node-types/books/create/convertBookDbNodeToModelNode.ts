import {BookNode as BookNodeInput} from "../../../../db/node-types/books/types/BookNode"
import {BookNode} from "../types/BookNode"
import {ModelNodeType} from "../../../types/ModelNodeType"

export function convertBookDbNodeToModelNode(data: BookNodeInput): BookNode {
    return {
        node_type: ModelNodeType.Book,
        attributes: {
            id: data.properties.id,
            title: data.properties.title,
            author: data.properties.author,
            publisher: data.properties.publisher,
            year_of_publication: data.properties.year_of_publication,
            isbn: data.properties.isbn,
            pages: data.properties.pages,
            language: data.properties.language,
            created_at: data.properties.created_at,
            updated_at: data.properties.updated_at,
        },
    } satisfies BookNode
}
