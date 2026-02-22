import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {createRelationship} from "../../../../../../../src/db/relationships/createRelationship"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Creating a ›belongs-to-racing-series‹ relationship', () => {
    test('with valid data', async () => {
        const racingEvent = await seedNode(DbNodeType.RacingEvent)
        const racingSeries = await seedNode(DbNodeType.RacingSeries)

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
        const racingEvent = await seedNode(DbNodeType.RacingEvent)

        const createdRelationship = await createRelationship(
            racingEvent.properties.id,
            -42,
            RelationshipType.RacingEventBelongsToRacingSeries,
        )

        expect(createdRelationship)
            .toEqual(false)
    })
})
