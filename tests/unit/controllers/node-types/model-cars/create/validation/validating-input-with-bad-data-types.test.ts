import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test.each([
    [false, "DHX60", 2016, "1:64", "BMW"],
    ["BMW 2002", false, 2016, "1:64", "BMW"],
    ["BMW 2002", "DHX60", false, "1:64", "BMW"],
    ["BMW 2002", "DHX60", 2016, false, "BMW"],
    ["BMW 2002", "DHX60", 2016, "1:64", false],
])('validating a request where the fields have invalid data types', async (
    name,
    product_code,
    release_year,
    scale,
    series,
) => {
    const data = {
        name,
        product_code,
        release_year,
        scale,
        series,
    }

    const result = validateInputData(data, NodeType.ModelCar)

    expect(result)
        .toBeFalsy()
})
