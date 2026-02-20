import {describe, expect, test} from 'vitest'
import {RaceTrack} from "../../../../../../../src/models/node-types/race-tracks/RaceTrack"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›has-layout‹ relationship', () => {
    test('RACE TRACK node does not exist', async () => {
        const raceTrack = await seedNode(ControllerNodeType.RACE_TRACK)

        await expect(RaceTrack.deleteHasLayoutRelationship(raceTrack.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('TRACK LAYOUT node does not exist', async () => {
        const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)

        await expect(RaceTrack.deleteHasLayoutRelationship(-42, trackLayout.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACE TRACK node and TRACK LAYOUT node do not exist', async () => {
        await expect(RaceTrack.deleteHasLayoutRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-layout‹ relationship', async () => {
        const raceTrack = await seedNode(ControllerNodeType.RACE_TRACK)
        const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)

        await expect(RaceTrack.deleteHasLayoutRelationship(raceTrack.id, trackLayout.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›has-layout‹ relationship', async () => {
        const seededRelationship = await seedRelationship(ControllerNodeType.RACE_TRACK, ControllerNodeType.TRACK_LAYOUT, RelationshipType.RaceTrackHasLayout)

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
