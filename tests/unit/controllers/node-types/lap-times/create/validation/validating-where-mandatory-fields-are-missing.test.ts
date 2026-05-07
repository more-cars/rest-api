import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test('validating a request where mandatory fields are missing', async () => {
    const data = {
        time: undefined,
        driver_name: undefined,
        date: "1996-08-03",
    }

    const result = validateInputData(data, NodeType.LapTime)

    expect(result)
        .toBeFalsy()
})
