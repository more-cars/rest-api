import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test.each([
    [true, 8, "2025-05-25", "2025-05-27"],
    ["GP Monaco 2025", false, "2025-05-25", "2025-05-27"],
    ["GP Monaco 2025", 8, false, "2025-05-27"],
    ["GP Monaco 2025", 8, "2025-05-25", false],
])('validating a request where the fields have invalid data types', async (
    name, round, date_from, date_to
) => {
    const data = {
        name,
        round,
        date_from,
        date_to,
    }

    const result = validateInputData(data, NodeType.RacingEvent)

    expect(result)
        .toBeFalsy()
})
