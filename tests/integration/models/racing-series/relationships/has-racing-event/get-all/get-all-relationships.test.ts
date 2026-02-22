import {describe, expect, test} from 'vitest'
import {RacingSeries} from "../../../../../../../src/models/node-types/racing-series/RacingSeries"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {DbNodeType} from "../../../../../../../src/db/types/DbNodeType"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›has-racing-event‹ relationships', () => {
    test('node and relationships exist', async () => {
        const racingSeries = await seedNode(DbNodeType.RacingSeries)
        await seedRelationshipForStartNode(racingSeries.properties.id, DbNodeType.RacingEvent, RelationshipType.RacingSeriesHasRacingEvent)
        await seedRelationshipForStartNode(racingSeries.properties.id, DbNodeType.RacingEvent, RelationshipType.RacingSeriesHasRacingEvent)

        const relationships = await RacingSeries.getAllHasRacingEventRelationships(racingSeries.properties.id)

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const racingSeries = await seedNode(DbNodeType.RacingSeries)

        const relationships = await RacingSeries.getAllHasRacingEventRelationships(racingSeries.properties.id)

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        await expect(RacingSeries.getAllHasRacingEventRelationships(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
