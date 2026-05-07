import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test('validating a request where mandatory fields are missing', async () => {
    const data = {
        name: undefined,
        round: 8,
        date_from: "2025-05-25",
        date_to: "2025-05-27",
    }

    const result = validateInputData(data, NodeType.RacingEvent)

    expect(result)
        .toBeFalsy()
})
