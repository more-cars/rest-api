import {expect, test} from 'vitest'
import {getNodeById} from "../../../../../src/db/nodes/car-models/getNodeById"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {CarModelSchema} from "../../../../_toolbox/schemas/CarModelSchema"
import {validateJson} from "../../../../_toolbox/validateJson"

test('Querying a brand that does not exist should return "false"', async () => {
    const expectedCarModelNode = false
    const actualCarModelNode = await getNodeById(-42)

    expect(actualCarModelNode)
        .toBe(expectedCarModelNode)
})

test('Querying an existing brand should return a db node with correct schema', async () => {
    const createdNode = await seedNode(NodeTypeEnum.CAR_MODEL)
    const carModelNode = await getNodeById(createdNode.id)

    expect(validateJson(carModelNode, CarModelSchema))
        .toBeTruthy()
})
