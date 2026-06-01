import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test('validating a valid request where optional fields are missing', async () => {
    const data = {
        name: "Grand Prix",
        start_date: undefined,
        start_time: undefined,
        duration: undefined,
        distance: undefined,
        distance_unit: undefined,
    }

    const result = validateInputData(data, NodeType.RacingSession)

    expect(result)
        .toBeTruthy()
})
