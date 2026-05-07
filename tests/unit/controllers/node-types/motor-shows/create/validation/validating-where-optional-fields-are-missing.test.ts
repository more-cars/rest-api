import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test('validating a valid request where optional fields are missing', async () => {
    const data = {
        name: "2017 IAA Frankfurt",
        date_from: undefined,
        date_until: undefined,
        location: undefined,
        target_audience: undefined,
        focus: undefined,
        country_code: undefined,
    }

    const result = validateInputData(data, NodeType.MotorShow)

    expect(result)
        .toBeTruthy()
})
