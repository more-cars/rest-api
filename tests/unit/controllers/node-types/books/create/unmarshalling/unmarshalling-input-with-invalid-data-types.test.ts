import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where the data types are incorrect', async () => {
    const data: unknown = {
        title: true,
        author: true,
        publisher: true,
        year_of_publication: true,
        isbn: true,
        pages: true,
        language: true,
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
            title: true,
            author: true,
            publisher: true,
            year_of_publication: true,
            isbn: true,
            pages: true,
            language: true,
        })
})
