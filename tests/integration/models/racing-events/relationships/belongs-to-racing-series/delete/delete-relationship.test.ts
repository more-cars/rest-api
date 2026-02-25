import {describe, expect, test} from 'vitest'
import {RacingEvent} from "../../../../../../../src/models/node-types/racing-events/RacingEvent"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›belongs-to-racing-series‹ relationship', () => {
    test('RACING EVENT node does not exist', async () => {
        const racingEvent = await seedNode(DbNodeType.RacingEvent)

        await expect(RacingEvent.deleteBelongsToRacingSeriesRelationship(racingEvent.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACING SERIES node does not exist', async () => {
        const racingSeries = await seedNode(DbNodeType.RacingSeries)

        await expect(RacingEvent.deleteBelongsToRacingSeriesRelationship(-42, racingSeries.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACING EVENT node and RACING SERIES node do not exist', async () => {
        await expect(RacingEvent.deleteBelongsToRacingSeriesRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›belongs-to-racing-series‹ relationship', async () => {
        const racingEvent = await seedNode(DbNodeType.RacingEvent)
        const racingSeries = await seedNode(DbNodeType.RacingSeries)

        await expect(RacingEvent.deleteBelongsToRacingSeriesRelationship(racingEvent.properties.id, racingSeries.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›belongs-to-racing-series‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.RacingEvent, DbNodeType.RacingSeries, RelationshipType.RacingEventBelongsToRacingSeries)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.RacingEventBelongsToRacingSeries,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await RacingEvent.deleteBelongsToRacingSeriesRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.RacingEventBelongsToRacingSeries,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
