import {expect, test} from 'vitest'
import {getNodeById} from "../../../../../src/db/nodes/brands/getNodeById"
import {seedNode} from "../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../src/controllers/nodes/types/ControllerNodeType"
import {BrandSchema} from "../../../../_toolbox/schemas/BrandSchema"
import {validateJson} from "../../../../_toolbox/validateJson"

test('Querying a BRAND that does not exist should return "false"', async () => {
    const expectedBrandNode = false
    const actualBrandNode = await getNodeById(-42)

    expect(actualBrandNode)
        .toBe(expectedBrandNode)
})

test('Querying an existing BRAND should return a db node with correct schema', async () => {
    const createdNode = await seedNode(ControllerNodeType.BRAND)
    const brandNode = await getNodeById(createdNode.properties.id)

    expect(validateJson(brandNode, BrandSchema))
        .toBeTruthy()
})
