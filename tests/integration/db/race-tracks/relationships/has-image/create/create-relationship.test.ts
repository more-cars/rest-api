import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {RaceTrackRelationship} from "../../../../../../../src/models/race-tracks/types/RaceTrackRelationship"

describe('Creating a ›has-image‹ relationship', () => {
    test('with valid data', async () => {
        const raceTrack = await seedNode(NodeTypeEnum.RACE_TRACK)
        const image = await seedNode(NodeTypeEnum.IMAGE)

        const createdRelationship = await createRelationship(
            raceTrack.id,
            image.id,
            DbRelationship.RaceTrackHasImage,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node_id', raceTrack.id)
        expect(createdRelationship)
            .toHaveProperty('end_node_id', image.id)
        expect(createdRelationship)
            .toHaveProperty('relationship_id')
        expect(createdRelationship)
            .toHaveProperty('relationship_name', RaceTrackRelationship.hasImage)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const raceTrack = await seedNode(NodeTypeEnum.RACE_TRACK)

        const createdRelationship = await createRelationship(
            raceTrack.id,
            -42,
            DbRelationship.RaceTrackHasImage,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
