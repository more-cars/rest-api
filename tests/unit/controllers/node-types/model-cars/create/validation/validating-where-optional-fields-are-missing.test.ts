import {expect, test} from 'vitest'
import {validateInputData} from "../../../../../../../src/controllers/nodes/validateInputData"
import {NodeType} from "../../../../../../../src/specification/NodeType"

test('validating a valid request where optional fields are missing', async () => {
    const data = {
        name: "BMW 2002",
        product_code: undefined,
        release_year: undefined,
        scale: undefined,
        series: undefined,
    }

    const result = validateInputData(data, NodeType.ModelCar)

    expect(result)
        .toBeTruthy()
})
