import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Creating a ›has-video‹ relationship', () => {
    test('with valid data', async () => {
        const raceTrack = await seedNode(DbNodeType.RaceTrack)
        const video = await seedNode(DbNodeType.Video)

        const createdRelationship = await createRelationship(
            raceTrack.properties.id,
            video.properties.id,
            RelationshipType.RaceTrackHasVideo,
        )

        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.RaceTrackHasVideo)
        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', raceTrack.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', video.properties.id)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const raceTrack = await seedNode(DbNodeType.RaceTrack)

        const createdRelationship = await createRelationship(
            raceTrack.properties.id,
            -42,
            RelationshipType.RaceTrackHasVideo,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
