import {describe, expect, test} from 'vitest'
import {RaceTrack} from "../../../../../../../src/models/race-tracks/RaceTrack"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

describe('Deleting a ›has-image‹ relationship', () => {
    test('RACE TRACK node does not exist', async () => {
        const raceTrack = await seedNode(NodeTypeEnum.RACE_TRACK)

        await expect(RaceTrack.deleteHasImageRelationship(raceTrack.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('IMAGE node does not exist', async () => {
        const image = await seedNode(NodeTypeEnum.RACE_TRACK)

        await expect(RaceTrack.deleteHasImageRelationship(-42, image.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('IMAGE node and IMAGE node do not exist', async () => {
        await expect(RaceTrack.deleteHasImageRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-image‹ relationship', async () => {
        const raceTrack = await seedNode(NodeTypeEnum.RACE_TRACK)
        const image = await seedNode(NodeTypeEnum.IMAGE)

        await expect(RaceTrack.deleteHasImageRelationship(raceTrack.id, image.id))
            .rejects
            .toThrow(RelationshipNotFoundError)
    })

    test('both nodes exist and have a ›has-image‹ relationship', async () => {
        const seededRelationship = await seedRelationship(NodeTypeEnum.RACE_TRACK, NodeTypeEnum.IMAGE, DbRelationship.RaceTrackHasImage)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            DbRelationship.RaceTrackHasImage,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await RaceTrack.deleteHasImageRelationship(seededRelationship.start_node_id, seededRelationship.end_node_id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            DbRelationship.RaceTrackHasImage,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
