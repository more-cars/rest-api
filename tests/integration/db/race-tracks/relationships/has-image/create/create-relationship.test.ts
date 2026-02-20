import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"

describe('Creating a ›has-image‹ relationship', () => {
    test('with valid data', async () => {
        const raceTrack = await seedNode(ControllerNodeType.RACE_TRACK)
        const image = await seedNode(ControllerNodeType.IMAGE)

        const createdRelationship = await createRelationship(
            raceTrack.id,
            image.id,
            RelationshipType.RaceTrackHasImage,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.id', raceTrack.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.id', image.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.RaceTrackHasImage)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const raceTrack = await seedNode(ControllerNodeType.RACE_TRACK)

        const createdRelationship = await createRelationship(
            raceTrack.id,
            -42,
            RelationshipType.RaceTrackHasImage,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
