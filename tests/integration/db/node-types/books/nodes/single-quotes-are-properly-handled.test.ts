import {expect, test} from 'vitest'
import {createDbNode} from "../../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import type {BookNode} from "../../../../../../src/db/node-types/books/types/BookNode"

test('Single quotes in strings are correctly escaped and unescaped', async () => {
    const data = {
        title: "'Living the Supercar Dream''",
        author: "'Tim Burton''",
        publisher: "'Blink Publishing''",
        year_of_publication: 2016,
        isbn: "'9783868528893''",
        pages: 256,
        language: "'en''",
    }

    const createdNode = await createDbNode(DbNodeType.Book, data) as BookNode


    expect(createdNode.properties.title)
        .toEqual("'Living the Supercar Dream''")

    expect(createdNode.properties.author)
        .toEqual("'Tim Burton''")

    expect(createdNode.properties.publisher)
        .toEqual("'Blink Publishing''")

    expect(createdNode.properties.isbn)
        .toEqual("'9783868528893''")

    expect(createdNode.properties.language)
        .toEqual("'en''")
})
