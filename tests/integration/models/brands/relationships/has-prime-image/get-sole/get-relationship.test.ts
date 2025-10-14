import {describe, expect, test} from 'vitest'
import {Brand} from "../../../../../../../src/models/brands/Brand"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {validateJson} from "../../../../../../_toolbox/validateJson"
import {BrandHasPrimeImageSchema} from "../../../../../../_toolbox/schemas/BrandHasPrimeImageSchema"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

describe('Requesting a ›has-prime-image‹ relationship', () => {
    test('node and relationship exist', async () => {
        const expectedRelationship = await seedRelationship('brand', 'image', DbRelationship.BrandHasPrimeImage)
        const actualRelationship = await Brand.getHasPrimeImageRelationship(expectedRelationship.start_node_id)

        validateJson(actualRelationship, BrandHasPrimeImageSchema)

        expect(actualRelationship.brand_id)
            .toBe(expectedRelationship.start_node_id)

        expect(actualRelationship.image_id)
            .toBe(expectedRelationship.end_node_id)
    })

    test('node exists, but not the relationship', async () => {
        const brand = await seedBrand()

        await expect(Brand.getHasPrimeImageRelationship(brand.id))
            .rejects
            .toThrow(RelationshipNotFoundError)
    })

    test('neither node, nor relationship exist', async () => {
        await expect(Brand.getHasPrimeImageRelationship(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
