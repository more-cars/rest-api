import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test.each([
    [false, "Tim Burton", "Blink Publishing", 2016, "9783868528893", 256, "en"],
    ["Living the Supercar Dream", false, "Blink Publishing", 2016, "9783868528893", 256, "en"],
    ["Living the Supercar Dream", "Tim Burton", false, 2016, "9783868528893", 256, "en"],
    ["Living the Supercar Dream", "Tim Burton", "Blink Publishing", false, "9783868528893", 256, "en"],
    ["Living the Supercar Dream", "Tim Burton", "Blink Publishing", 2016, false, 256, "en"],
    ["Living the Supercar Dream", "Tim Burton", "Blink Publishing", 2016, "9783868528893", false, "en"],
    ["Living the Supercar Dream", "Tim Burton", "Blink Publishing", 2016, "9783868528893", 256, false],
])('validating a request where the fields have invalid data types', async (
    title,
    author,
    publisher,
    year_of_publication,
    isbn,
    pages,
    language,
) => {
    const data = {
        title,
        author,
        publisher,
        year_of_publication,
        isbn,
        pages,
        language,
    }

    const result = validateInputData(data, NodeType.Book)

    expect(result)
        .toBeFalsy()
})
