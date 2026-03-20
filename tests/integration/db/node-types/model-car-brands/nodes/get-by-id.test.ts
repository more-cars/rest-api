import {expect, test} from 'vitest'
import {getNodeById} from "../../../../../../src/db/node-types/model-car-brands/getNodeById"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {ModelCarBrandSchema} from "../../../../../_toolbox/schemas/db/ModelCarBrandSchema"
import {validateJson} from "../../../../../_toolbox/validateJson"

test('Querying a MODEL CAR BRAND that does not exist should return "false"', async () => {
    const expectedModelCarBrandNode = false
    const actualModelCarBrandNode = await getNodeById(-42)

    expect(actualModelCarBrandNode)
        .toBe(expectedModelCarBrandNode)
})

test('Querying an existing MODEL CAR BRAND should return a db node with correct schema', async () => {
    const createdNode = await seedNode(DbNodeType.ModelCarBrand)
    const modelCarBrandNode = await getNodeById(createdNode.properties.id)

    expect(validateJson(modelCarBrandNode, ModelCarBrandSchema))
        .toBeTruthy()
})
