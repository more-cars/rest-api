import {Node} from "neo4j-driver"
import type {DbInputData} from "../../../src/db/types/DbInputData"

export function mapBook(oldNode: Node): DbInputData {
    return {
        title: oldNode.properties.name,
        author: oldNode.properties.author,
        publisher: oldNode.properties.publisher,
        year_of_publication: oldNode.properties.publication_year,
        isbn: oldNode.properties.isbn,
        pages: oldNode.properties.pages,
        language: oldNode.properties.language,
    }
}