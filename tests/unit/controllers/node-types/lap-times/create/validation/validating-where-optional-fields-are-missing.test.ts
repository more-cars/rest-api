import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test('validating a valid request where optional fields are missing', async () => {
    const data = {
        time: "PT1M33.294S",
        driver_name: "Klaus Ludwig",
        date: undefined,
    }

    const result = validateInputData(data, NodeType.LapTime)

    expect(result)
        .toBeTruthy()
})
