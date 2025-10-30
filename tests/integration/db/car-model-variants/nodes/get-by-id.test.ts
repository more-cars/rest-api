import {expect, test} from 'vitest'
import {getNodeById} from "../../../../../src/db/nodes/car-model-variants/getNodeById"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {CarModelVariantNode} from "../../../../../src/db/nodes/car-model-variants/types/CarModelVariantNode"
import {CarModelVariantSchema} from "../../../../_toolbox/schemas/CarModelVariantSchema"
import {validateJson} from "../../../../_toolbox/validateJson"

test('Querying a CAR MODEL VARIANT that does not exist should return "false"', async () => {
    const expectedCarModelVariantNode = false
    const actualCarModelVariantNode = await getNodeById(-42)

    expect(actualCarModelVariantNode)
        .toBe(expectedCarModelVariantNode)
})

test('Querying an existing CAR MODEL VARIANT should return a db node with correct schema', async () => {
    const createdNode = await seedNode(NodeTypeEnum.CAR_MODEL_VARIANT) as CarModelVariantNode
    const carModelVariantNode = await getNodeById(createdNode.id)

    expect(validateJson(carModelVariantNode, CarModelVariantSchema))
        .toBeTruthy()
})
