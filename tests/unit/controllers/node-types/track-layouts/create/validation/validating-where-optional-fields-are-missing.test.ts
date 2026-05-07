import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test('validating a valid request where optional fields are missing', async () => {
    const data = {
        name: "GP Circuit",
        year_from: undefined,
        year_to: undefined,
        length: undefined,
        length_unit: undefined,
        direction: undefined,
        elevation_change: undefined,
        elevation_change_unit: undefined,
        surface: undefined,
    }

    const result = validateInputData(data, NodeType.TrackLayout)

    expect(result)
        .toBeTruthy()
})
