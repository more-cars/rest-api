import {seedBrand} from "../../../../../../dbSeeding/brands/nodes/seedBrand"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {BrandRelationship} from "../../../../../../../src/models/brands/types/BrandRelationship"
import {seedImage} from "../../../../../../dbSeeding/images/nodes/seedImage.ts"

test('Creating a "Brand has Image" relationship when both nodes exist', async () => {
    const brand = await seedBrand()
    const image = await seedImage()

    const createdRelationship = await createRelationship(
        brand.id,
        image.id,
        DbRelationship.NodeHasImage,
    )

    expect(createdRelationship)
        .toHaveProperty('start_node_id', brand.id)
    expect(createdRelationship)
        .toHaveProperty('end_node_id', image.id)
    expect(createdRelationship)
        .toHaveProperty('relationship_id')
    expect(createdRelationship)
        .toHaveProperty('relationship_name', BrandRelationship.hasImage)
    expect(createdRelationship)
        .toHaveProperty('created_at')
    expect(createdRelationship)
        .toHaveProperty('updated_at')
})

test('Invalid nodes fail the relationship creation', async () => {
    const brand = await seedBrand()

    const createdRelationship = await createRelationship(
        brand.id,
        -42,
        DbRelationship.NodeHasImage,
    )

    expect(createdRelationship)
        .toEqual(false)
})
