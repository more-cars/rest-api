import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test('validating a valid request where optional fields are missing', async () => {
    const data = {
        name: "Formula 1",
        short_name: undefined,
        founded: undefined,
        defunct: undefined,
        organized_by: undefined,
        vehicle_type: undefined,
        country_code: undefined,
    }

    const result = validateInputData(data, NodeType.RacingSeries)

    expect(result)
        .toBeTruthy()
})
