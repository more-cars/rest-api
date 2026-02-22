import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"

describe('Requesting all ›has-racing-session‹ relationships', () => {
    test('node and relationships exist', async () => {
        const racingEvent = await seedNode(DbNodeType.RacingEvent)
        await seedRelationshipForStartNode(racingEvent.properties.id, DbNodeType.RacingSession, RelationshipType.RacingEventHasRacingSession)
        await seedRelationshipForStartNode(racingEvent.properties.id, DbNodeType.RacingSession, RelationshipType.RacingEventHasRacingSession)

        const relationships = await getRelationshipCollection(
            racingEvent.properties.id,
            RelationshipType.RacingEventHasRacingSession,
            DbNodeType.RacingSession,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const racingEvent = await seedNode(DbNodeType.RacingEvent)

        const relationships = await getRelationshipCollection(
            racingEvent.properties.id,
            RelationshipType.RacingEventHasRacingSession,
            DbNodeType.RacingSession,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.RacingEventHasRacingSession,
            DbNodeType.RacingSession,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
