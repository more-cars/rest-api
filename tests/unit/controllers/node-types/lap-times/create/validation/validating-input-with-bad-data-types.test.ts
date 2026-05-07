import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test.each([
    [true, "Klaus Ludwig", "WBA"],
    ["PT1M33.294S", true, "WBA"],
    ["PT1M33.294S", "Klaus Ludwig", false],
])('validating a request where the fields have invalid data types', async (
    time, driver_name, date
) => {
    const data = {
        time,
        driver_name,
        date,
    }

    const result = validateInputData(data, NodeType.LapTime)

    expect(result)
        .toBeFalsy()
})
