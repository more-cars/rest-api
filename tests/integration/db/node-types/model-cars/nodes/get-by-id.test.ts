import {expect, test} from 'vitest'
import {getNodeById} from "../../../../../../src/db/node-types/model-cars/getNodeById"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {ModelCarSchema} from "../../../../../_toolbox/schemas/db/ModelCarSchema"
import {validateJson} from "../../../../../_toolbox/validateJson"

test('Querying a MODEL CAR that does not exist should return "false"', async () => {
    const expectedModelCarNode = false
    const actualModelCarNode = await getNodeById(-42)

    expect(actualModelCarNode)
        .toBe(expectedModelCarNode)
})

test('Querying an existing MODEL CAR should return a db node with correct schema', async () => {
    const createdNode = await seedNode(DbNodeType.ModelCar)
    const modelCarNode = await getNodeById(createdNode.properties.id)

    expect(validateJson(modelCarNode, ModelCarSchema))
        .toBeTruthy()
})
