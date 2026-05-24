import {expect, test} from 'vitest'
import {BookNode} from "../../../../../../src/models/node-types/books/types/BookNode"
import {ModelNodeType} from "../../../../../../src/models/types/ModelNodeType"
import {convertBookModelNodeToControllerNode} from "../../../../../../src/controllers/node-types/books/convertBookModelNodeToControllerNode"
import {ControllerNodeType} from "../../../../../../src/controllers/types/ControllerNodeType"

test("converting a BOOK node", async () => {
    const node: BookNode = {
        node_type: ModelNodeType.Book,
        attributes: {
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
    }

    const convertedNode = convertBookModelNodeToControllerNode(node)

    expect(convertedNode)
        .toStrictEqual({
            node_type: ControllerNodeType.Book,
            fields: {
                id: 1,
                title: "Living the Supercar Dream",
                author: "Tim Burton",
                publisher: "Blink Publishing",
                year_of_publication: 2016,
                isbn: "9783868528893",
                pages: 256,
                language: "en",
                created_at: "2025-05-14T11:05:07.793Z",
                updated_at: "2025-05-14T11:05:07.793Z",
            },
        })
})
