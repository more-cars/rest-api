import type {BookNode as ModelBookNode} from "../../../models/node-types/books/types/BookNode"
import type {BookNode} from "./types/BookNode"
import {ControllerNodeType} from "../../types/ControllerNodeType"

export function convertBookModelNodeToControllerNode(modelNode: ModelBookNode): BookNode {
    return {
        node_type: ControllerNodeType.Book,
        fields: {
            id: modelNode.attributes.id,
            title: modelNode.attributes.title,
            author: modelNode.attributes.author ?? null,
            publisher: modelNode.attributes.publisher ?? null,
            year_of_publication: modelNode.attributes.year_of_publication ?? null,
            isbn: modelNode.attributes.isbn ?? null,
            pages: modelNode.attributes.pages ?? null,
            language: modelNode.attributes.language ?? null,
            created_at: modelNode.attributes.created_at,
            updated_at: modelNode.attributes.updated_at,
        },
    } satisfies BookNode
}
