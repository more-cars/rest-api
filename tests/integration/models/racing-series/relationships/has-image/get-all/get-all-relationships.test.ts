import {describe, expect, test} from 'vitest'
import {RacingSeries} from "../../../../../../../src/models/node-types/racing-series/RacingSeries"
import {seedNode} from "../../../../../../_toolbox/dbSeeding/seedNode"
import {ControllerNodeType} from "../../../../../../../src/controllers/nodes/types/ControllerNodeType"
import {seedRelationshipForStartNode} from "../../../../../../_toolbox/dbSeeding/seedRelationshipForStartNode"
import {RelationshipType} from "../../../../../../../src/db/types/RelationshipType"
import {NodeNotFoundError} from "../../../../../../../src/models/types/NodeNotFoundError"

describe('Requesting all ›has-image‹ relationships', () => {
    test('node and relationships exist', async () => {
        const racingSeries = await seedNode(ControllerNodeType.RACING_SERIES)
        await seedRelationshipForStartNode(racingSeries.properties.id, ControllerNodeType.IMAGE, RelationshipType.RacingSeriesHasImage)
        await seedRelationshipForStartNode(racingSeries.properties.id, ControllerNodeType.IMAGE, RelationshipType.RacingSeriesHasImage)

        const relationships = await RacingSeries.getAllHasImageRelationships(racingSeries.properties.id)

        expect(relationships.length)
            .toBe(2)
    })

    test('node exists, but no relationships', async () => {
        const racingSeries = await seedNode(ControllerNodeType.RACING_SERIES)

        const relationships = await RacingSeries.getAllHasImageRelationships(racingSeries.properties.id)

        expect(relationships.length)
            .toBe(0)
    })

    test('neither node, nor relationships exist', async () => {
        await expect(RacingSeries.getAllHasImageRelationships(-42))
            .rejects
            .toThrow(NodeNotFoundError)
    })
})
