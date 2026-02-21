import {describe, expect, test} from 'vitest'
import {TrackLayout} from "../../../../../../../src/models/node-types/track-layouts/TrackLayout"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›was-used-by-racing-event‹ relationship', () => {
    test('TRACK LAYOUT node does not exist', async () => {
        const trackLayout = await seedNode(ControllerNodeType.TrackLayout)

        await expect(TrackLayout.deleteWasUsedByRacingEventRelationship(trackLayout.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACING EVENT node does not exist', async () => {
        const racingEvent = await seedNode(ControllerNodeType.RacingEvent)

        await expect(TrackLayout.deleteWasUsedByRacingEventRelationship(-42, racingEvent.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('TRACK LAYOUT node and RACING EVENT node do not exist', async () => {
        await expect(TrackLayout.deleteWasUsedByRacingEventRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›was-used-by-racing-event‹ relationship', async () => {
        const trackLayout = await seedNode(ControllerNodeType.TrackLayout)
        const racingEvent = await seedNode(ControllerNodeType.RacingEvent)

        await expect(TrackLayout.deleteWasUsedByRacingEventRelationship(trackLayout.properties.id, racingEvent.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›was-used-by-racing-event‹ relationship', async () => {
        const seededRelationship = await seedRelationship(ControllerNodeType.TrackLayout, ControllerNodeType.RacingEvent, RelationshipType.TrackLayoutWasUsedByRacingEvent)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.TrackLayoutWasUsedByRacingEvent,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await TrackLayout.deleteWasUsedByRacingEventRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.TrackLayoutWasUsedByRacingEvent,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
