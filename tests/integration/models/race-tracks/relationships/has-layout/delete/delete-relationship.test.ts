import {describe, expect, test} from 'vitest'
import {RaceTrack} from "../../../../../../../src/models/node-types/race-tracks/RaceTrack"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›has-layout‹ relationship', () => {
    test('RACE TRACK node does not exist', async () => {
        const raceTrack = await seedNode(DbNodeType.RaceTrack)

        await expect(RaceTrack.deleteHasLayoutRelationship(raceTrack.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('TRACK LAYOUT node does not exist', async () => {
        const trackLayout = await seedNode(DbNodeType.TrackLayout)

        await expect(RaceTrack.deleteHasLayoutRelationship(-42, trackLayout.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACE TRACK node and TRACK LAYOUT node do not exist', async () => {
        await expect(RaceTrack.deleteHasLayoutRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-layout‹ relationship', async () => {
        const raceTrack = await seedNode(DbNodeType.RaceTrack)
        const trackLayout = await seedNode(DbNodeType.TrackLayout)

        await expect(RaceTrack.deleteHasLayoutRelationship(raceTrack.properties.id, trackLayout.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›has-layout‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.RaceTrack, DbNodeType.TrackLayout, RelationshipType.RaceTrackHasLayout)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.RaceTrackHasLayout,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await RaceTrack.deleteHasLayoutRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.RaceTrackHasLayout,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
