import {expect, test} from 'vitest'
import {getNodeById} from "../../../../../src/db/nodes/car-models/getNodeById"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"
import {CarModelSchema} from "../../../../_toolbox/schemas/CarModelSchema"
import {validateJson} from "../../../../_toolbox/validateJson"

test('Querying a CAR MODEL that does not exist should return "false"', async () => {
    const expectedCarModelNode = false
    const actualCarModelNode = await getNodeById(-42)

    expect(actualCarModelNode)
        .toBe(expectedCarModelNode)
})

test('Querying an existing CAR MODEL should return a db node with correct schema', async () => {
    const createdNode = await seedNode(ControllerNodeType.CarModel)
    const carModelNode = await getNodeById(createdNode.properties.id)

    expect(validateJson(carModelNode, CarModelSchema))
        .toBeTruthy()
})
