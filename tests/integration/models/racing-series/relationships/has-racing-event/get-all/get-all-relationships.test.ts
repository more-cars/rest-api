import {describe, expect, test} from 'vitest'
import {RacingSeries} from "../../../../../../../src/models/racing-series/RacingSeries"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›has-racing-event‹ relationships', () => {
    test('node and relationships exist', async () => {
        const racingSeries = await seedNode(NodeTypeEnum.RACING_SERIES)
        await seedRelationshipForStartNode(racingSeries.id, NodeTypeEnum.RACING_EVENT, DbRelationship.RacingSeriesHasRacingEvent)
        await seedRelationshipForStartNode(racingSeries.id, NodeTypeEnum.RACING_EVENT, DbRelationship.RacingSeriesHasRacingEvent)

        const relationships = await RacingSeries.getAllHasRacingEventRelationships(racingSeries.id)

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const racingSeries = await seedNode(NodeTypeEnum.RACING_SERIES)

        const relationships = await RacingSeries.getAllHasRacingEventRelationships(racingSeries.id)

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        await expect(RacingSeries.getAllHasRacingEventRelationships(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
