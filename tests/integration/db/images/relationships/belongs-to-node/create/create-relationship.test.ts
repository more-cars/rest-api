import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Creating a ›belongs-to-node‹ relationship', () => {
    test('with valid data', async () => {
        const image = await seedNode(DbNodeType.Image)
        const carModel = await seedNode(DbNodeType.CarModel)

        const createdRelationship = await createRelationship(
            image.properties.id,
            carModel.properties.id,
            RelationshipType.ImageBelongsToNode,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', image.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', carModel.properties.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.ImageBelongsToNode)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const image = await seedNode(DbNodeType.Image)

        const createdRelationship = await createRelationship(
            image.properties.id,
            -42,
            RelationshipType.CompanyHasImage,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
