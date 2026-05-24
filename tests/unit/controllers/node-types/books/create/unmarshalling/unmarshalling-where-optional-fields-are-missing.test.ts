import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a valid request where optional fields are missing', async () => {
    const data: unknown = {
        title: "Living the Supercar Dream"
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
            title: "Living the Supercar Dream",
            author: undefined,
            publisher: undefined,
            year_of_publication: undefined,
            isbn: undefined,
            pages: undefined,
            language: undefined
        })
})
