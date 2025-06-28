import {seedImage} from "../../../../../../dbSeeding/images/nodes/seedImage"
import {seedCarModel} from "../../../../../../dbSeeding/car-models/nodes/seedCarModel"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seedBrand} from "../../../../../../dbSeeding/brands/nodes/seedBrand"

test('Creating a "Image belongs to Node" relationship when both nodes exist', async () => {
    const image = await seedImage()
    const carModel = await seedCarModel()

    const createdRelationship = await createRelationship(
        image.id,
        carModel.id,
        DbRelationship.ImageBelongsToNode,
    )

    expect(createdRelationship)
        .toHaveProperty('start_node_id', image.id)
    expect(createdRelationship)
        .toHaveProperty('end_node_id', carModel.id)
    expect(createdRelationship)
        .toHaveProperty('relationship_id')
    expect(createdRelationship)
        .toHaveProperty('relationship_name', DbRelationship.ImageBelongsToNode)
    expect(createdRelationship)
        .toHaveProperty('created_at')
    expect(createdRelationship)
        .toHaveProperty('updated_at')
})

test('Invalid nodes fail the relationship creation', async () => {
    const image = await seedImage()
    const brand = await seedBrand()

    let createdRelationship = await createRelationship(
        image.id,
        -42,
        DbRelationship.ImageBelongsToNode,
    )
    expect(createdRelationship)
        .toEqual(false)

    createdRelationship = await createRelationship(
        -42,
        brand.id,
        DbRelationship.ImageBelongsToNode,
    )
    expect(createdRelationship)
        .toEqual(false)
})
