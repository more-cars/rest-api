import {expect, test} from 'vitest'
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {BrandRelationship} from "../../../../../../../src/models/brands/types/BrandRelationship"

test('Creating a "Car Model belongs to Brand" relationship when both nodes exist', async () => {
    const carModel = await seedCarModel()
    const brand = await seedBrand()

    // Using the same HAS_CAR_MODEL relationship here as in the Brand nodes.
    // Crating a second relationship for the opposite direction (BELONGS_TO_BRAND) would make no sense.
    const createdRelationship = await createRelationship(
        brand.id,
        carModel.id,
        DbRelationship.BrandHasCarModel,
    )

    expect(createdRelationship)
        .toHaveProperty('start_node_id', brand.id)
    expect(createdRelationship)
        .toHaveProperty('end_node_id', carModel.id)
    expect(createdRelationship)
        .toHaveProperty('relationship_id')
    expect(createdRelationship)
        .toHaveProperty('relationship_name', BrandRelationship.hasCarModel)
    expect(createdRelationship)
        .toHaveProperty('created_at')
    expect(createdRelationship)
        .toHaveProperty('updated_at')
})

test('Invalid nodes fail the relationship creation', async () => {
    const carModel = await seedCarModel()

    const createdRelationship = await createRelationship(
        -42,
        carModel.id,
        DbRelationship.BrandHasCarModel,
    )

    expect(createdRelationship)
        .toEqual(false)
})
