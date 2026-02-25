import {describe, expect, test} from 'vitest'
import {RacingSeries} from "../../../../../../../../src/models/node-types/racing-series/RacingSeries"
import {seedNode} from "../../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getSpecificRelationship} from "../../../../../../../../src/db/relationships/getSpecificRelationship"
import {RelationshipType} from "../../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../../src/models/types/NodeNotFoundError"
import {RelNotFoundError} from "../../../../../../../../src/models/types/RelNotFoundError"

describe('Deleting a ›has-racing-event‹ relationship', () => {
    test('RACING SERIES node does not exist', async () => {
        const racingSeries = await seedNode(DbNodeType.RacingSeries)

        await expect(RacingSeries.deleteHasRacingEventRelationship(racingSeries.properties.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACING EVENT node does not exist', async () => {
        const racingEvent = await seedNode(DbNodeType.RacingEvent)

        await expect(RacingSeries.deleteHasRacingEventRelationship(-42, racingEvent.properties.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACING SERIES node and RACING EVENT node do not exist', async () => {
        await expect(RacingSeries.deleteHasRacingEventRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-racing-event‹ relationship', async () => {
        const racingSeries = await seedNode(DbNodeType.RacingSeries)
        const racingEvent = await seedNode(DbNodeType.RacingEvent)

        await expect(RacingSeries.deleteHasRacingEventRelationship(racingSeries.properties.id, racingEvent.properties.id))
            .rejects
            .toThrow(RelNotFoundError)
    })

    test('both nodes exist and have a ›has-racing-event‹ relationship', async () => {
        const seededRelationship = await seedRelationship(DbNodeType.RacingSeries, DbNodeType.RacingEvent, RelationshipType.RacingSeriesHasRacingEvent)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.RacingSeriesHasRacingEvent,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await RacingSeries.deleteHasRacingEventRelationship(seededRelationship.start_node.properties.id, seededRelationship.end_node.properties.id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node.properties.id,
            seededRelationship.end_node.properties.id,
            RelationshipType.RacingSeriesHasRacingEvent,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
