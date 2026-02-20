import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {deleteSpecificRelationship} from "../../../../../../../src/db/relationships/deleteSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Trying to delete a ›belongs-to-race-track‹ relationship', () => {
    test('nodes exist and have a relationship', async () => {
        const seededRelationship = await seedRelationship(ControllerNodeType.TRACK_LAYOUT, ControllerNodeType.RACE_TRACK, RelationshipType.TrackLayoutBelongsToRaceTrack)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.id,
            seededRelationship.end_node.id,
            RelationshipType.TrackLayoutBelongsToRaceTrack,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await deleteSpecificRelationship(
            seededRelationship.start_node.id,
            seededRelationship.end_node.id,
            RelationshipType.TrackLayoutBelongsToRaceTrack,
        )

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.id,
            seededRelationship.end_node.id,
            RelationshipType.TrackLayoutBelongsToRaceTrack,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })

    test('nodes exists, but not the relationship', async () => {
        const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)
        const raceTrack = await seedNode(ControllerNodeType.RACE_TRACK)

        const relationship = await deleteSpecificRelationship(
            trackLayout.id,
            raceTrack.id,
            RelationshipType.TrackLayoutBelongsToRaceTrack,
        )

        expect(relationship)
            .toBeFalsy()
    })

    test('neither the nodes, nor the relationship exist', async () => {
        const relationship = await deleteSpecificRelationship(
            -42,
            -43,
            RelationshipType.TrackLayoutBelongsToRaceTrack,
        )

        expect(relationship)
            .toBeFalsy()
    })
})
