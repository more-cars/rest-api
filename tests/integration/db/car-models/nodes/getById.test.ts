import {getNodeById} from "../../../../../src/db/nodes/car-models/getNodeById"
import {CarModelNode} from "../../../../../src/types/car-models/CarModelNode"
import {seedCarModel} from "../../../../dbSeeding/car-models/nodes/seedCarModel"
import {CarModelSchema} from "../../../../_schemas/CarModelSchema"
import {validateJson} from "../../../../_helpers/validateJson"

test('Querying a brand that does not exist should return "false"', async () => {
    const expectedCarModelNode = false
    const actualCarModelNode = await getNodeById(-42)

    expect(actualCarModelNode)
        .toBe(expectedCarModelNode)
})

test('Querying an existing brand should return a db node with correct schema', async () => {
    const createdNode: CarModelNode = await seedCarModel()
    const carModelNode = await getNodeById(createdNode.id as number)

    expect(validateJson(carModelNode, CarModelSchema))
        .toBe(true)
})
