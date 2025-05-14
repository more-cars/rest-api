import Ajv from "ajv"
import {getNodeById} from "../../../../../src/db/brands/getNodeById"
import {seedBrand} from "../../../../dbSeeding/seedBrand"
import {BrandNode} from "../../../../../src/types/brands/BrandNode"
import {BrandSchema} from "../../../../_schemas/BrandSchema"

describe('Brand', () => {
    test('Querying a brand that does not exist should return "false"', async () => {
        const expectedBrandNode = false
        const actualBrandNode = await getNodeById(-42)

        expect(actualBrandNode)
            .toBe(expectedBrandNode)
    })

    test('Querying an existing brand should return a db node with correct schema', async () => {
        // ARRANGE
        const createdNode: BrandNode = await seedBrand()

        // ACT
        const brandNode = await getNodeById(createdNode.id as number)

        // ASSERT
        const validate = new Ajv().compile(BrandSchema)
        const valid = validate(brandNode)
        if (!valid) {
            console.log(validate.errors)
        }

        expect(valid).toBe(true)
    })
})
