import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {seedImage} from "../../../../../../_toolbox/dbSeeding/images/nodes/seedImage"
import {BrandRelationship} from "../../../../../../../src/models/brands/types/BrandRelationship"

describe('Creating a ›has-prime-image‹ relationship', () => {
    test('with valid data', async () => {
        const brand = await seedBrand()
        const image = await seedImage()

        const createdRelationship = await createRelationship(
            brand.id,
            image.id,
            DbRelationship.BrandHasPrimeImage,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node_id', brand.id)
        expect(createdRelationship)
            .toHaveProperty('end_node_id', image.id)
        expect(createdRelationship)
            .toHaveProperty('relationship_id')
        expect(createdRelationship)
            .toHaveProperty('relationship_name', BrandRelationship.hasPrimeImage)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const brand = await seedBrand()

        const createdRelationship = await createRelationship(
            brand.id,
            -42,
            DbRelationship.BrandHasPrimeImage,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
