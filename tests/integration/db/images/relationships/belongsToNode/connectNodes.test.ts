import {seedImage} from "../../../../../dbSeeding/seedImage"
import {seedCarModel} from "../../../../../dbSeeding/seedCarModel"
import {createRelationship} from "../../../../../../src/db/createRelationship"
import {DbRelationship} from "../../../../../../src/types/DbRelationship"
import {seedBrand} from "../../../../../dbSeeding/seedBrand"

describe('Image', () => {
    test('Creating a "Image belongs to Node" relationship when both nodes exist', async () => {
        const image = await seedImage()
        const carModel = await seedCarModel()

        const createdRelationship = await createRelationship(
            image.id as number,
            carModel.id as number,
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
    })

    test('Invalid nodes fail the relationship creation', async () => {
        const image = await seedImage()
        const brand = await seedBrand()

        let createdRelationship = await createRelationship(
            image.id as number,
            -42,
            DbRelationship.ImageBelongsToNode,
        )
        expect(createdRelationship)
            .toEqual(false)

        createdRelationship = await createRelationship(
            -42,
            brand.id as number,
            DbRelationship.ImageBelongsToNode,
        )
        expect(createdRelationship)
            .toEqual(false)
    })
})
