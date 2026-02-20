import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {deleteSpecificRelationship} from "../../../../../../../src/db/relationships/deleteSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Trying to delete a ›was-used-by-racing-event‹ relationship', () => {
    test('nodes exist and have a relationship', async () => {
        const seededRelationship = await seedRelationship(ControllerNodeType.TRACK_LAYOUT, ControllerNodeType.RACING_EVENT, RelationshipType.TrackLayoutWasUsedByRacingEvent)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.TrackLayoutWasUsedByRacingEvent,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await deleteSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.TrackLayoutWasUsedByRacingEvent,
        )

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.TrackLayoutWasUsedByRacingEvent,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })

    test('nodes exists, but not the relationship', async () => {
        const trackLayout = await seedNode(ControllerNodeType.TRACK_LAYOUT)
        const racingEvent = await seedNode(ControllerNodeType.RACING_EVENT)

        const relationship = await deleteSpecificRelationship(
            trackLayout.id,
            racingEvent.id,
            RelationshipType.TrackLayoutWasUsedByRacingEvent,
        )

        expect(relationship)
            .toBeFalsy()
    })

    test('neither the nodes, nor the relationship exist', async () => {
        const relationship = await deleteSpecificRelationship(
            -42,
            -43,
            RelationshipType.TrackLayoutWasUsedByRacingEvent,
        )

        expect(relationship)
            .toBeFalsy()
    })
})
