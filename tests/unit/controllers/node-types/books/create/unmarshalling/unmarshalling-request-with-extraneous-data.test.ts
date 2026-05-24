import {expect, test} from 'vitest'
import {unmarshalInputData} from "../../../../../../../src/controllers/nodes/unmarshalInputData"

test('unmarshalling a request where extraneous fields are contained', async () => {
    const data: unknown = {
        title: "Living the Supercar Dream",
        author: "Tim Burton",
        publisher: "Blink Publishing",
        year_of_publication: 2016,
        isbn: "9783868528893",
        pages: 256,
        language: "en",
        my_property: "Hello",
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
            author: "Tim Burton",
            publisher: "Blink Publishing",
            year_of_publication: 2016,
            isbn: "9783868528893",
            pages: 256,
            language: "en",
        })
})
