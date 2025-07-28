import {expect, test} from 'vitest'
import {seedImage} from "../../../../../../_toolbox/dbSeeding/images/nodes/seedImage"
import {seedCarModel} from "../../../../../../_toolbox/dbSeeding/car-models/nodes/seedCarModel"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seedBrand} from "../../../../../../_toolbox/dbSeeding/brands/nodes/seedBrand"

test('Creating a "Image belongs to Node" relationship when both nodes exist', async () => {
    const image = await seedImage()
    const carModel = await seedCarModel()

    const createdRelationship = await createRelationship(
        carModel.id,
        image.id,
        DbRelationship.NodeHasImage,
    )

    expect(createdRelationship)
        .toHaveProperty('start_node_id', carModel.id)
    expect(createdRelationship)
        .toHaveProperty('end_node_id', image.id)
    expect(createdRelationship)
        .toHaveProperty('relationship_id')
    expect(createdRelationship)
        .toHaveProperty('relationship_name', DbRelationship.NodeHasImage)
    expect(createdRelationship)
        .toHaveProperty('created_at')
    expect(createdRelationship)
        .toHaveProperty('updated_at')
})

test('Invalid nodes fail the relationship creation', async () => {
    const image = await seedImage()
    const brand = await seedBrand()

    let createdRelationship = await createRelationship(
        -42,
        image.id,
        DbRelationship.NodeHasImage,
    )
    expect(createdRelationship)
        .toEqual(false)

    createdRelationship = await createRelationship(
        brand.id,
        -42,
        DbRelationship.NodeHasImage,
    )
    expect(createdRelationship)
        .toEqual(false)
})
