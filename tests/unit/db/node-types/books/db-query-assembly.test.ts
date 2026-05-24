import {expect, test} from 'vitest'
import type {QueryInputData} from "../../../../../src/db/types/QueryInputData"
import {createNodeQuery} from "../../../../../src/db/nodes/createDbNode"
import {DbNodeType} from "../../../../../src/db/types/DbNodeType"
import {appInstanceId} from "../../../../../src/db/getNamespacedNodeTypeLabel"

test('database query for creating a BOOK node', async () => {
    const data: QueryInputData = {
        title: "Living the Supercar Dream",
        author: "Tim Burton",
        publisher: "Blink Publishing",
        year_of_publication: 2016,
        isbn: "9783868528893",
        pages: 256,
        language: "en"
    }

    const query = createNodeQuery(DbNodeType.Book, data)

    expect(query)
        .toEqual(
            "CREATE (n:Book_A_" + appInstanceId + " {\n" +
            "  title: 'Living the Supercar Dream',\n" +
            "  author: 'Tim Burton',\n" +
            "  publisher: 'Blink Publishing',\n" +
            "  year_of_publication: 2016,\n" +
            "  isbn: '9783868528893',\n" +
            "  pages: 256,\n" +
            "  language: 'en'\n" +
            "})\n" +
            "RETURN n\n" +
            "  LIMIT 1")
})
