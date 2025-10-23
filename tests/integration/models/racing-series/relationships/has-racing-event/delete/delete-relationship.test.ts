import {describe, expect, test} from 'vitest'
import {RacingSeries} from "../../../../../../../src/models/racing-series/RacingSeries"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {getSpecificRelationship} from "../../../../../../../src/db/relationships/getSpecificRelationship"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"
import {RelationshipNotFoundError} from "../../../../../../../src/models/types/RelationshipNotFoundError"

describe('Deleting a ›has-racing-event‹ relationship', () => {
    test('RACING SERIES node does not exist', async () => {
        const racingSeries = await seedNode(NodeTypeEnum.RACING_SERIES)

        await expect(RacingSeries.deleteHasRacingEventRelationship(racingSeries.id, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACING EVENT node does not exist', async () => {
        const racingEvent = await seedNode(NodeTypeEnum.RACING_SERIES)

        await expect(RacingSeries.deleteHasRacingEventRelationship(-42, racingEvent.id))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('RACING EVENT node and RACING EVENT node do not exist', async () => {
        await expect(RacingSeries.deleteHasRacingEventRelationship(-42, -43))
            .rejects
            .toThrow(NodeNotFoundError)
    })

    test('both nodes exist, but have no ›has-racing-event‹ relationship', async () => {
        const racingSeries = await seedNode(NodeTypeEnum.RACING_SERIES)
        const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)

        await expect(RacingSeries.deleteHasRacingEventRelationship(racingSeries.id, racingEvent.id))
            .rejects
            .toThrow(RelationshipNotFoundError)
    })

    test('both nodes exist and have a ›has-racing-event‹ relationship', async () => {
        const seededRelationship = await seedRelationship(NodeTypeEnum.RACING_SERIES, NodeTypeEnum.RACING_EVENT, DbRelationship.RacingSeriesHasRacingEvent)

        const relationshipBefore = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            DbRelationship.RacingSeriesHasRacingEvent,
        )

        expect(relationshipBefore)
            .toBeTruthy()

        await RacingSeries.deleteHasRacingEventRelationship(seededRelationship.start_node_id, seededRelationship.end_node_id)

        const relationshipAfter = await getSpecificRelationship(
            seededRelationship.start_node_id,
            seededRelationship.end_node_id,
            DbRelationship.RacingSeriesHasRacingEvent,
        )

        expect(relationshipAfter)
            .toBeFalsy()
    })
})
