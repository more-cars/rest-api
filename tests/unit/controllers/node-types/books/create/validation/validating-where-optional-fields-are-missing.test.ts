import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test('validating a valid request where optional fields are missing', async () => {
    const data = {
        title: "Living the Supercar Dream",
        author: undefined,
        publisher: undefined,
        year_of_publication: undefined,
        isbn: undefined,
        pages: undefined,
        language: undefined,
    }

    const result = validateInputData(data, NodeType.Book)

    expect(result)
        .toBeTruthy()
})
