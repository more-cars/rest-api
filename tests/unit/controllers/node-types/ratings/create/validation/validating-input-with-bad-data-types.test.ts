import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test.each([
    [false, 0, 100, "up"],
    [93, false, 100, "up"],
    [93, 0, false, "up"],
    [93, 0, 100, false],
])('validating a request where the fields have invalid data types', async (
    rating_value,
    scale_minimum,
    scale_maximum,
    scale_direction,
) => {
    const data = {
        rating_value,
        scale_minimum,
        scale_maximum,
        scale_direction,
    }

    const result = validateInputData(data, NodeType.Rating)

    expect(result)
        .toBeFalsy()
})
