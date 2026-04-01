import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Creating a ›has-main-video‹ relationship', () => {
    test('with valid data', async () => {
        const motorShow = await seedNode(DbNodeType.MotorShow)
        const video = await seedNode(DbNodeType.Video)

        const createdRelationship = await createRelationship(
            motorShow.properties.id,
            video.properties.id,
            RelationshipType.MotorShowHasMainVideo,
        )

        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.MotorShowHasMainVideo)
        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', motorShow.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', video.properties.id)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const motorShow = await seedNode(DbNodeType.MotorShow)

        const createdRelationship = await createRelationship(
            motorShow.properties.id,
            -42,
            RelationshipType.MotorShowHasMainVideo,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
