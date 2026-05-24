import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where mandatory fields are missing', async () => {
    const data: unknown = {
        author: "Tim Burton",
        publisher: "Blink Publishing",
        year_of_publication: 2016,
        isbn: "9783868528893",
        pages: 256,
        language: "en"
    }

    const result = unmarshalInputData(data, [
        'title',
        'author',
        'publisher',
        'year_of_publication',
        'isbn',
        'pages',
        'language',
    ])

    expect(result)
        .toStrictEqual({
            title: undefined,
            author: "Tim Burton",
            publisher: "Blink Publishing",
            year_of_publication: 2016,
            isbn: "9783868528893",
            pages: 256,
            language: "en"
        })
})
