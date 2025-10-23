import {describe, expect, test} from 'vitest'
import {RacingSeries} from "../../../../../../../src/models/racing-series/RacingSeries"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {NodeTypeEnum} from "../../../../../../../src/controllers/nodes/types/NodeTypeEnum"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {DbRelationship} from "../../../../../../../src/db/types/DbRelationship"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›has-image‹ relationships', () => {
    test('node and relationships exist', async () => {
        const racingSeries = await seedNode(NodeTypeEnum.RACING_SERIES)
        await seedRelationshipForStartNode(racingSeries.id, NodeTypeEnum.IMAGE, DbRelationship.RacingSeriesHasImage)
        await seedRelationshipForStartNode(racingSeries.id, NodeTypeEnum.IMAGE, DbRelationship.RacingSeriesHasImage)

        const relationships = await RacingSeries.getAllHasImageRelationships(racingSeries.id)

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const racingSeries = await seedNode(NodeTypeEnum.RACING_SERIES)

        const relationships = await RacingSeries.getAllHasImageRelationships(racingSeries.id)

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        await expect(RacingSeries.getAllHasImageRelationships(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
