import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test('validating a request where mandatory fields are missing', async () => {
    const data = {
        title: undefined,
        author: "Tim Burton",
        publisher: "Blink Publishing",
        year_of_publication: 2016,
        isbn: "9783868528893",
        pages: 256,
        language: "en",
    }

    const result = validateInputData(data, NodeType.Book)

    expect(result)
        .toBeFalsy()
})
