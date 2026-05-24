import {describe, expect, test} from 'vitest'
import {BookInput} from "../../../../../../src/models/node-types/books/types/BookInput"
import {unmarshalInputData} from "../../../../../../src/controllers/nodes/unmarshalInputData"

describe('Sanitizing user input', () => {
    test('leading and trailing whitespaces', async () => {
        const data: BookInput = {
            title: "   Living the Supercar Dream  ",
            author: "   Tim Burton  ",
            publisher: "   Blink Publishing  ",
            year_of_publication: 2016,
            isbn: "   9783868528893  ",
            pages: 256,
            language: "   en  ",
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
})
