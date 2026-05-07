import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test('validating a valid request where optional fields are missing', async () => {
    const data = {
        name: "Lausitzring",
        opened: undefined,
        closed: undefined,
        type: undefined,
        location: undefined,
        geo_position: undefined,
        country_code: undefined,
    }

    const result = validateInputData(data, NodeType.RaceTrack)

    expect(result)
        .toBeTruthy()
})
