import {expect, test} from 'vitest'
import {getNodeById} from "../../../../../src/db/nodes/car-models/getNodeById"
import {CarModelNode} from "../../../../../src/db/nodes/car-models/types/CarModelNode"
import {seedCarModel} from "../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {CarModelSchema} from "../../../../_toolbox/schemas/CarModelSchema"
import {validateJson} from "../../../../_toolbox/validateJson"

test('Querying a brand that does not exist should return "false"', async () => {
    const expectedCarModelNode = false
    const actualCarModelNode = await getNodeById(-42)

    expect(actualCarModelNode)
        .toBe(expectedCarModelNode)
})

test('Querying an existing brand should return a db node with correct schema', async () => {
    const createdNode: CarModelNode = await seedCarModel()
    const carModelNode = await getNodeById(createdNode.id)

    expect(validateJson(carModelNode, CarModelSchema))
        .toBeTruthy()
})
