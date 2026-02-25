import {expect, test} from 'vitest'
import {getNodeById} from "../../../../../../src/db/node-types/brands/getNodeById"
import {seedNode} from "../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../src/db/types/DbNodeType"
import {BrandSchema} from "../../../../../_toolbox/schemas/db/BrandSchema"
import {validateJson} from "../../../../../_toolbox/validateJson"

test('Querying a BRAND that does not exist should return "false"', async () => {
    const expectedBrandNode = false
    const actualBrandNode = await getNodeById(-42)

    expect(actualBrandNode)
        .toBe(expectedBrandNode)
})

test('Querying an existing BRAND should return a db node with correct schema', async () => {
    const createdNode = await seedNode(DbNodeType.Brand)
    const brandNode = await getNodeById(createdNode.properties.id)

    expect(validateJson(brandNode, BrandSchema))
        .toBeTruthy()
})
