import {expect, test} from 'vitest'
import {getNodeById} from "../../../../../src/db/nodes/brands/getNodeById"
import {seedBrand} from "../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {BrandNode} from "../../../../../src/db/nodes/brands/types/BrandNode"
import {BrandSchema} from "../../../../_toolbox/schemas/BrandSchema"
import {validateJson} from "../../../../_toolbox/validateJson"

test('Querying a brand that does not exist should return "false"', async () => {
    const expectedBrandNode = false
    const actualBrandNode = await getNodeById(-42)

    expect(actualBrandNode)
        .toBe(expectedBrandNode)
})

test('Querying an existing brand should return a db node with correct schema', async () => {
    const createdNode: BrandNode = await seedBrand()
    const brandNode = await getNodeById(createdNode.id)

    expect(validateJson(brandNode, BrandSchema))
        .toBe(true)
})
