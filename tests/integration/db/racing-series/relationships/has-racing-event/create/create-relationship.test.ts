import {describe, expect, test} from 'vitest'
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"

describe('Creating a ›has-racing-event‹ relationship', () => {
    test('with valid data', async () => {
        const racingSeries = await seedNode(NodeTypeEnum.RACING_SERIES)
        const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)

        const createdRelationship = await createRelationship(
            racingSeries.id,
            racingEvent.id,
            RelationshipType.RacingSeriesHasRacingEvent,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.id', racingSeries.id)
        expect(createdRelationship)
            .toHaveProperty('end_node_id', racingEvent.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.RacingSeriesHasRacingEvent)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const racingSeries = await seedNode(NodeTypeEnum.RACING_SERIES)

        const createdRelationship = await createRelationship(
            racingSeries.id,
            -42,
            RelationshipType.RacingSeriesHasRacingEvent,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
