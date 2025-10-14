import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {seedCompany} from "../../../../../../_toolbox/dbSeeding/companies/nodes/seedCompany"
import {BrandRelationship} from "../../../../../../../src/models/brands/types/BrandRelationship"

describe('Creating a ›belongs-to-company‹ relationship', () => {
    test('with valid data', async () => {
        const brand = await seedBrand()
        const company = await seedCompany()

        const createdRelationship = await createRelationship(
            brand.id,
            company.id,
            DbRelationship.BrandBelongsToCompany,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node_id', brand.id)
        expect(createdRelationship)
            .toHaveProperty('end_node_id', company.id)
        expect(createdRelationship)
            .toHaveProperty('relationship_id')
        expect(createdRelationship)
            .toHaveProperty('relationship_name', BrandRelationship.belongsToCompany)
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
            DbRelationship.BrandBelongsToCompany,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
