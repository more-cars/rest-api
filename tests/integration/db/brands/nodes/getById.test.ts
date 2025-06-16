import {getNodeById} from "../../../../../src/db/brands/getNodeById"
import {seedBrand} from "../../../../dbSeeding/brands/nodes/seedBrand"
import {BrandNode} from "../../../../../src/types/brands/BrandNode"
import {BrandSchema} from "../../../../_schemas/BrandSchema"
import {validateJson} from "../../../../_helpers/validateJson"

describe('Brand', () => {
    test('Querying a brand that does not exist should return "false"', async () => {
        const expectedBrandNode = false
        const actualBrandNode = await getNodeById(-42)

        expect(actualBrandNode)
            .toBe(expectedBrandNode)
    })

    test('Querying an existing brand should return a db node with correct schema', async () => {
        const createdNode: BrandNode = await seedBrand()
        const brandNode = await getNodeById(createdNode.id as number)

        expect(validateJson(brandNode, BrandSchema))
            .toBe(true)
    })
})
