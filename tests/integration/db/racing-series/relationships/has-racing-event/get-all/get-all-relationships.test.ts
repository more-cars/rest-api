import {describe, expect, test} from 'vitest'
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {getRelationshipCollection} from "../../../../../../../src/db/relationships/getRelationshipCollection"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"

describe('Requesting all ›has-racing-event‹ relationships', () => {
    test('node and relationships exist', async () => {
        const racingSeries = await seedNode(ControllerNodeType.RacingSeries)
        await seedRelationshipForStartNode(racingSeries.properties.id, ControllerNodeType.RacingEvent, RelationshipType.RacingSeriesHasRacingEvent)
        await seedRelationshipForStartNode(racingSeries.properties.id, ControllerNodeType.RacingEvent, RelationshipType.RacingSeriesHasRacingEvent)

        const relationships = await getRelationshipCollection(
            racingSeries.properties.id,
            RelationshipType.RacingSeriesHasRacingEvent,
            DbNodeType.RacingEvent,
        )

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const racingSeries = await seedNode(ControllerNodeType.RacingSeries)

        const relationships = await getRelationshipCollection(
            racingSeries.properties.id,
            RelationshipType.RacingSeriesHasRacingEvent,
            DbNodeType.RacingEvent,
        )

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        const relationships = await getRelationshipCollection(
            -42,
            RelationshipType.RacingSeriesHasRacingEvent,
            DbNodeType.RacingEvent,
        )

        expect(relationships.length)
            .toBe(0)
    })
})
