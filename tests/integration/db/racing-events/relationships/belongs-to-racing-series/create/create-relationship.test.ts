import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Creating a ›belongs-to-racing-series‹ relationship', () => {
    test('with valid data', async () => {
        const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)
        const racingSeries = await seedNode(NodeTypeEnum.RACING_SERIES)

        const createdRelationship = await createRelationship(
            racingEvent.id,
            racingSeries.id,
            RelationshipType.RacingEventBelongsToRacingSeries,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.id', racingEvent.id)
        expect(createdRelationship)
            .toHaveProperty('end_node_id', racingSeries.id)
        expect(createdRelationship)
            .toHaveProperty('id')
        expect(createdRelationship)
            .toHaveProperty('type', RelationshipType.RacingEventBelongsToRacingSeries)
        expect(createdRelationship)
            .toHaveProperty('created_at')
        expect(createdRelationship)
            .toHaveProperty('updated_at')
    })

    test('with invalid data', async () => {
        const racingEvent = await seedNode(NodeTypeEnum.RACING_EVENT)

        const createdRelationship = await createRelationship(
            racingEvent.id,
            -42,
            RelationshipType.RacingEventBelongsToRacingSeries,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
