import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Creating a ›has-video‹ relationship', () => {
    test('with valid data', async () => {
        const modelCar = await seedNode(DbNodeType.ModelCar)
        const video = await seedNode(DbNodeType.Video)

        const createdRelationship = await createRelationship(
            modelCar.properties.id,
            video.properties.id,
            RelationshipType.ModelCarHasVideo,
        )

        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.ModelCarHasVideo)
        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', modelCar.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', video.properties.id)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const modelCar = await seedNode(DbNodeType.ModelCar)

        const createdRelationship = await createRelationship(
            modelCar.properties.id,
            -42,
            RelationshipType.ModelCarHasVideo,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
