import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test('validating a complete and valid request', async () => {
    const data = {
        title: "Living the Supercar Dream",
        author: "Tim Burton",
        publisher: "Blink Publishing",
        year_of_publication: 2016,
        isbn: "9783868528893",
        pages: 256,
        language: "en",
    }

    const result = validateInputData(data, NodeType.Book)

    expect(result)
        .toBeTruthy()
})
