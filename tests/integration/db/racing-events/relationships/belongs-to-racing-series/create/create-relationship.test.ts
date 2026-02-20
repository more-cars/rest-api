import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Creating a ›belongs-to-racing-series‹ relationship', () => {
    test('with valid data', async () => {
        const racingEvent = await seedNode(ControllerNodeType.RACING_EVENT)
        const racingSeries = await seedNode(ControllerNodeType.RACING_SERIES)

        const createdRelationship = await createRelationship(
            racingEvent.properties.id,
            racingSeries.properties.id,
            RelationshipType.RacingEventBelongsToRacingSeries,
        )

        expect(createdRelationship)
            .toHaveProperty('start_node.properties.id', racingEvent.properties.id)
        expect(createdRelationship)
            .toHaveProperty('end_node.properties.id', racingSeries.properties.id)
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
        const racingEvent = await seedNode(ControllerNodeType.RACING_EVENT)

        const createdRelationship = await createRelationship(
            racingEvent.properties.id,
            -42,
            RelationshipType.RacingEventBelongsToRacingSeries,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
