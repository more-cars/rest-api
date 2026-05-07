import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test('validating a valid request where optional fields are missing', async () => {
    const data = {
        name: "GP Monaco 2025",
        round: undefined,
        date_from: undefined,
        date_to: undefined,
    }

    const result = validateInputData(data, NodeType.RacingEvent)

    expect(result)
        .toBeTruthy()
})
