import {expect, test} from 'vitest'
import {Integer, Node} from "neo4j-driver"
import {convertBookNeo4jNodeToDbNode} from "../../../../../src/db/node-types/books/convertBookNeo4jNodeToDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import type {BookNode} from "../../../../../src/db/node-types/books/types/BookNode"

test('the Neo4j node is correctly mapped to a More Cars node', async () => {
    const dbNode: Node = {
        identity: new Integer,
        labels: [],
        properties: {
            mc_id: 1,
            created_at: "2025-05-14T11:05:07.793Z",
            updated_at: "2025-05-14T11:05:07.793Z",
            title: "Living the Supercar Dream",
            author: "Tim Burton",
            publisher: "Blink Publishing",
            year_of_publication: 2016,
            isbn: "9783868528893",
            pages: 256,
            language: "en",
        },
        elementId: "",
        as: Object,
    }

    const mappedNode = convertBookNeo4jNodeToDbNode(dbNode)

    expect(mappedNode)
        .toStrictEqual({
            node_type: DbNodeType.Book,
            properties: {
                id: 1,
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
                title: "Living the Supercar Dream",
                author: "Tim Burton",
                publisher: "Blink Publishing",
                year_of_publication: 2016,
                isbn: "9783868528893",
                pages: 256,
                language: "en",
            },
        } satisfies BookNode)
})
