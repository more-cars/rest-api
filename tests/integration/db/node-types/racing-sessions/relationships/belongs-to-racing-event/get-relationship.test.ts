import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {seedRelationship} from "../../../../../../_toolbox/dbSeeding/seedRelationship"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Requesting a ›belongs-to-racing-event‹ relationship', () => {
    test('node and relationship exist', async () => {
        const relationship = await seedRelationship(DbNodeType.RacingSession, DbNodeType.RacingEvent, RelationshipType.RacingSessionBelongsToRacingEvent)

        const relationships = await getRelationshipCollection(
            relationship.start_node.properties.id,
            RelationshipType.RacingSessionBelongsToRacingEvent,
            DbNodeType.RacingEvent,
        )

        expect(relationships.length)
            .toBe(1)
    })

    test('node exists, but not the relationship', async () => {
        const racingSession = await seedNode(DbNodeType.RacingSession)

        const relationships = await getRelationshipCollection(
            racingSession.properties.id,
            RelationshipType.RacingSessionBelongsToRacingEvent,
            DbNodeType.RacingEvent,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationship exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.RacingSessionBelongsToRacingEvent,
            DbNodeType.RacingEvent,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
