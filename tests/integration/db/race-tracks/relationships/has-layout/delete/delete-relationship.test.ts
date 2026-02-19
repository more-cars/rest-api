import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {deleteSpecificRelationship} from "../../../../../../../src/db/relationships/deleteSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Trying to delete a ›has-layout‹ relationship', () => {
    test('nodes exist and have a relationship', async () => {
        const seededRelationship = await seedRelationship(NodeTypeEnum.RACE_TRACK, NodeTypeEnum.TRACK_LAYOUT, RelationshipType.RaceTrackHasLayout)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.id,
            seededRelationship.end_node.id,
            RelationshipType.RaceTrackHasLayout,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await deleteSpecificRelationship(
            seededRelationship.start_node.id,
            seededRelationship.end_node.id,
            RelationshipType.RaceTrackHasLayout,
        )

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.id,
            seededRelationship.end_node.id,
            RelationshipType.RaceTrackHasLayout,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })

    test('nodes exists, but not the relationship', async () => {
        const raceTrack = await seedNode(NodeTypeEnum.RACE_TRACK)
        const trackLayout = await seedNode(NodeTypeEnum.TRACK_LAYOUT)

        const relationship = await deleteSpecificRelationship(
            raceTrack.id,
            trackLayout.id,
            RelationshipType.RaceTrackHasLayout,
        )

        expect(relationship)
            .toBeFalsy()
    })

    test('neither the nodes, nor the relationship exist', async () => {
        const relationship = await deleteSpecificRelationship(
            -42,
            -43,
            RelationshipType.RaceTrackHasLayout,
        )

        expect(relationship)
            .toBeFalsy()
    })
})
